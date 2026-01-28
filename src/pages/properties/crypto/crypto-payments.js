import usdt from "../../../assets/images/usdt-1.png";
import pieme from "../../../assets/images/pieme.png";
import "../../../assets/css/crypto.css";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { LoginOutlined } from "@ant-design/icons";
import { Button, Flex, Alert } from "antd";
import { useState, useEffect } from "react";

import {
    useAccount,
    useBalance,
    useReadContract,
    useWriteContract,
    useChainId,
    useWaitForTransactionReceipt,
    useDisconnect,
} from "wagmi";

import postData from "../../../hooks/useFetch";
import { ethers } from "ethers";
import { usdtAddress, usdtABI } from "./abi";
import { Tabs } from "antd";
import { ceil } from "lodash";

function toUnit(value) {
    return ethers.formatEther(value);
}

function toEther(value) {
    return ethers.parseEther(String(value));
}

function CryptoPayments({ to_pay, invest, unit, pdfDoc, commitment }) {
    const { open } = useWeb3Modal();
    const chainId = useChainId();
    const { address, isConnecting, isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    const [usdtBalanceData, setUsdtBalanceData] = useState("0");
    const [success, setSuccess] = useState(false);
    const [txStatus, setTxStatus] = useState("idle"); // idle | pending | confirming | success | error
    const [statusMessage, setStatusMessage] = useState("");

    // USDT balance
    const { data: usdtBalance } = useReadContract({
        address: usdtAddress,
        abi: usdtABI,
        functionName: "balanceOf",
        args: address ? [address] : undefined,
        query: { enabled: !!address && isConnected },
    });

    // Native token balance (BNB / ETH etc.)
    const { data: nativeBalance } = useBalance({ address });

    // Write contract (for both USDT transfer and native send)
    const {
        writeContract,
        data: txHash,
        isPending: isLoadingTx,
        error: writeError,
    } = useWriteContract();

    // Wait for confirmation
    const {
        data: receipt,
        isLoading: isConfirming,
        isSuccess: isConfirmed,
        error: receiptError,
    } = useWaitForTransactionReceipt({
        hash: txHash,
        confirmations: 1, // change to 2-3 in production if desired
    });

    const amountToPay = ceil(parseFloat(invest) * 0.03 + parseFloat(invest)).toString();

    const makeUsdtPayment = () => {
        setTxStatus("pending");
        setStatusMessage("Waiting for wallet approval...");
        writeContract({
            address: usdtAddress,
            abi: usdtABI,
            functionName: "transfer",
            args: ["0xda246f575d802a545FCF0af6238f2e52c08e9242", toEther(amountToPay)],
        });
    };

    // Main transaction status handler
    useEffect(() => {
        if (isLoadingTx) {
            setTxStatus("pending");
            setStatusMessage("Transaction sent — waiting for confirmation...");
        }

        if (isConfirming) {
            setTxStatus("confirming");
            setStatusMessage("Confirming on blockchain...");
        }

        if (isConfirmed && receipt) {
            if (receipt.status === "success") {
                setTxStatus("success");
                setStatusMessage("Payment confirmed successfully!");

                // Only call backend after confirmed success
                postData({
                    service: "crypto_pay",
                    data: {
                        transaction_hash: txHash,
                        address: address?.toString(),
                        amount: parseFloat(invest),
                        unit_id: unit.id,
                        currency: 234,
                        signature: pdfDoc,
                        is_commitment: commitment?.is_commitment,
                        commit_id: commitment?.commit_id,
                    },
                })
                    .then(() => {
                        setSuccess(true);
                        // Show success for a few seconds before reload
                        setTimeout(() => window.location.reload(), 3000);
                    })
                    .catch((err) => {
                        console.error("Backend error:", err);
                        setTxStatus("error");
                        setStatusMessage("Payment confirmed but backend failed");
                    });
            } else {
                setTxStatus("error");
                setStatusMessage("Transaction reverted or failed");
            }
        }

        if (receiptError || writeError) {
            setTxStatus("error");
            setStatusMessage(
                (receiptError || writeError)?.shortMessage ||
                (receiptError || writeError)?.message ||
                "Transaction failed"
            );
        }

        if (usdtBalance && isConnected) {
            setUsdtBalanceData(toUnit(usdtBalance));
        }
    }, [
        isLoadingTx,
        isConfirming,
        isConfirmed,
        receipt,
        txHash,
        writeError,
        receiptError,
        usdtBalance,
        isConnected,
        address,
        invest,
        unit,
        pdfDoc,
        commitment,
    ]);

    const connect = () => open({ view: "Networks" });

    const items = [
        {
            key: "1",
            label: (
                <div className="flex flex-col gap-3 px-4 py-3 text-center">
                    <img src={usdt} alt="usdt" style={{ height: "60px" }} className="object-contain mx-auto" />
                    <p>USDT</p>
                </div>
            ),
            children: (
                <>
                    {isConnected ? (
                        chainId === 56 ? (
                            <>
                                <Alert
                                    message={
                                        <>
                                            <p className="address">
                                                Address: <span className="addr">{address}</span>
                                            </p>
                                            <p className="address">
                                                USDT Balance: <span className="addr">{usdtBalanceData}</span>
                                            </p>
                                        </>
                                    }
                                    type="success"
                                />

                                <div className="mt-4 text-base">
                                    <table>
                                        <tbody>
                                            {to_pay.map((p, i) => (
                                                <tr key={i}>
                                                    <td className="py-1 pe-4">
                                                        <p>{p.label}</p>
                                                    </td>
                                                    <td>
                                                        <p>{p.value}</p>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {txStatus !== "idle" && (
                                    <Alert
                                        className="mt-4"
                                        message={statusMessage}
                                        type={
                                            txStatus === "success"
                                                ? "success"
                                                : txStatus === "error"
                                                    ? "error"
                                                    : "info"
                                        }
                                        showIcon
                                    />
                                )}

                                <Flex gap="small" wrap="wrap" justify="start" align="center" className="mt-4">
                                    <Button
                                        type="primary"
                                        icon={<LoginOutlined />}
                                        disabled={isLoadingTx || isConfirming || success}
                                        loading={isLoadingTx || isConfirming}
                                        onClick={makeUsdtPayment}
                                        className="connectBtn"
                                    >
                                        {isLoadingTx
                                            ? "Approving..."
                                            : isConfirming
                                                ? "Confirming..."
                                                : "Make Payment"}
                                    </Button>

                                    <Button
                                        danger
                                        icon={<LoginOutlined />}
                                        onClick={() => disconnect()}
                                        className="connectBtn"
                                        disabled={isLoadingTx || isConfirming}
                                    >
                                        Disconnect
                                    </Button>
                                </Flex>
                            </>
                        ) : (
                            <Alert message="Please Connect to Binance Smart Chain Network" type="info" showIcon />
                        )
                    ) : (
                        <Flex gap="small" wrap="wrap" justify="center" align="center">
                            <Button
                                type="primary"
                                icon={<LoginOutlined />}
                                loading={isConnecting}
                                onClick={connect}
                                className="connectBtn"
                            >
                                {isConnecting ? "Connecting...." : "Connect Wallet"}
                            </Button>
                        </Flex>
                    )}
                </>
            ),
        },
        {
            key: "4",
            label: (
                <div className="flex flex-col gap-3 px-4 py-3 text-center">
                    <img src={pieme} alt="Pieme" style={{ height: "60px" }} className="object-contain mx-auto" />
                    <p>Pieme</p>
                </div>
            ),
            children: <Alert message="Pieme Payments coming soon!" type="info" showIcon />,
        },
    ];

    return (
        <div className="crypto-page">
            <p className="pb-4 text-lg font-semibold text-center">Accepted Tokens</p>
            <Tabs type="card" defaultActiveKey="1" centered items={items} />
        </div>
    );
}

export default CryptoPayments;