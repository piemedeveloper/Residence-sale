import usdt from "../../../assets/images/usdt-1.png";
import pieme from "../../../assets/images/pieme.png";
import "../../../assets/css/crypto.css";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { LoginOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import { useState, useEffect } from "react";
import { useAccount, useBalance, useReadContract, useWriteContract, useChainId } from "wagmi";
import postData from "../../../hooks/useFetch";
import { Alert } from "antd";
import { disconnect } from "@wagmi/core"; // If needed elsewhere
import { ethers } from "ethers"; // Only import ethers (no utils)
import { usdtAddress, usdtABI } from "./abi";
import { Tabs } from "antd";
import { ceil } from "lodash";

function toUnit(value) {
    return ethers.formatEther(value); // Direct on ethers
}

function toEther(value) {
    return ethers.parseEther(String(value));
}

function CryptoPayments({ to_pay, invest, unit, pdfDoc, commitment }) {
    const { open } = useWeb3Modal();
    const chainId = useChainId(); // Replaces useNetwork().chain
    const { address, isConnecting, isConnected } = useAccount();

    const [usdtBalanceData, setUsdtBalanceData] = useState(0);
    const [success, setSuccess] = useState(false);
    const [networkTokenBalance, setNetworkTokenBalance] = useState(0);
    const [tokenValueInUsd, setTokenUsdValue] = useState(0);
    const [tokenPayValue, setTokenPayValue] = useState(0);

    // USDT Balance (wagmi v2)
    const { data: usdtBalance } = useReadContract({
        address: usdtAddress,
        abi: usdtABI,
        functionName: "balanceOf",
        args: address ? [address] : undefined, // Avoid calling if no address
        query: { enabled: !!address },
    });

    // Native token balance (e.g., BNB/ETH)
    const { data: nativeBalance } = useBalance({
        address,
    });

    // Write contract (USDT transfer) - wagmi v2 simplified
    const { writeContract, data: txData, isPending: isLoadingTx, error: writeError } = useWriteContract();

    let amountToPay = ceil(parseFloat(invest) * 0.03 + parseFloat(invest)).toString();

    const makeUsdtPayment = () => {
        writeContract({
            address: usdtAddress,
            abi: usdtABI,
            functionName: "transfer",
            args: [
                "0xda246f575d802a545FCF0af6238f2e52c08e9242",
                ethers.parseEther(amountToPay),
            ],
        });
    };

    // Get network token balance & calculate values
    const getNetworkTokenBalance = () => {
        if (nativeBalance) {
            setNetworkTokenBalance(parseFloat(nativeBalance.formatted).toFixed(4));

            // Adjust these values based on actual chain/prices
            const currentValue = chainId === 56 ? 411.48 : 0.06539; // Example for BSC vs others
            const usdValue = chainId === 56 ? 0.00242970144214537222 : 15.22588022;

            setTokenUsdValue((parseFloat(nativeBalance.formatted) * currentValue).toFixed(4));
            setTokenPayValue((parseFloat(amountToPay) * usdValue).toFixed(4));
        }
    };

    // Send native token (BNB/ETH/etc.)
    const sendNetworkToken = () => {
        writeContract({
            to: chainId === 56
                ? "0xda246f575d802a545FCF0af6238f2e52c08e9242"
                : "0x54cd536a37b406835b5765392b07d58bbdb483d9",
            value: ethers.parseEther(tokenPayValue.toString()),
        });
    };

    useEffect(() => {
        if (usdtBalance && isConnected) {
            setUsdtBalanceData(toUnit(usdtBalance));
        }

        if (txData) {
            postData({
                service: "crypto_pay",
                data: {
                    transaction_hash: txData.toString(),
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
                    window.location.reload();
                })
                .catch(console.error);
        }
    }, [usdtBalance, isConnected, txData, address]);

    useEffect(() => {
        getNetworkTokenBalance();
    }, [nativeBalance, chainId]);

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
                        chainId === 56 ? ( // BSC chainId
                            <>
                                <Alert
                                    message={
                                        <>
                                            <p className="address">Address: <span className="addr">{address}</span></p>
                                            <p className="address">USDT Balance: <span className="addr">{usdtBalanceData}</span></p>
                                        </>
                                    }
                                    type="success"
                                />
                                <div className="mt-4 text-base">
                                    <table><tbody>{to_pay.map((p, i) => (
                                        <tr key={i}><td className="py-1 pe-4"><p>{p.label}</p></td><td><p>{p.value}</p></td></tr>
                                    ))}</tbody></table>
                                    {writeError && <Alert message="Insufficient Funds..." type="error" className="mt-3" showIcon />}
                                </div>
                                <Flex gap="small" wrap="wrap" justify="start" align="center">
                                    <Button type="primary" icon={<LoginOutlined />} disabled={isLoadingTx} onClick={makeUsdtPayment} className="connectBtn">
                                        Make Payment
                                    </Button>
                                    <Button danger icon={<LoginOutlined />} onClick={() => disconnect()} className="connectBtn">
                                        Disconnect
                                    </Button>
                                </Flex>
                            </>
                        ) : (
                            <Alert message="Please Connect to Binance Smart Chain Network" type="info" showIcon />
                        )
                    ) : (
                        <Flex gap="small" wrap="wrap" justify="center" align="center">
                            <Button type="primary" icon={<LoginOutlined />} loading={isConnecting} onClick={connect} className="connectBtn">
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