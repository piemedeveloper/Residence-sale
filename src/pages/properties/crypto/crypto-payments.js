import usdt from "../../../assets/images/usdt-1.png";
// import bnb from "../../../assets/images/bnb-1.png";
import pieme from "../../../assets/images/pieme.png";
// import islamic from "../../../assets/images/islamic-mark.png";
// import Haqq from "./haqq";
import "../../../assets/css/crypto.css";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { LoginOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import { useState, useEffect } from "react";
import { useAccount, useContractRead } from "wagmi";
import postData from "../../../hooks/useFetch";
import { Alert } from "antd";
import { disconnect } from "@wagmi/core";

import { ethers, utils } from "ethers";
import { usdtAddress, usdtABI } from "./abi";
import { useContractWrite, usePrepareContractWrite, useNetwork } from "wagmi";
import { fetchBalance, sendTransaction } from "@wagmi/core";
import { Tabs } from "antd";
import { ceil } from "lodash";


function toUnit(value) {
  const unitValue = ethers.utils.formatEther(value);
  return unitValue;
}

function toEther(value) {
  return ethers.utils.parseEther(String(value));
}

function toHumanizeNumber(value) {
  if (Math.abs(value) < 1.0) {
    let e = parseInt(value.toString().split("e-")[1]);
    if (e) {
      value *= Math.pow(10, e - 1);
      value = "0." + new Array(e).join("0") + value.toString().substring(2);
    }
  } else {
    let e = parseInt(value.toString().split("+")[1]);
    if (e > 20) {
      e -= 20;
      value /= Math.pow(10, e);
      value += new Array(e + 1).join("0");
    }
  }
  return value;
}

function toEtherString(value) {
  return toEther(toHumanizeNumber(value)).toString();
}

function CryptoPayments({ to_pay, invest, unit, pdfDoc, commitment }) {
  const { open, close } = useWeb3Modal();
  const { chain } = useNetwork();

  const connect = () => {
    open({ view: "Networks" });
  };

  const { address, isConnecting, isConnected, isDisconnected } = useAccount();
  const [usdtBalanceData, setUsdtBalanceData] = useState(0);
  const [success, setSuccess] = useState(false);
  const [networkTokenBalance, setNetworkTokenBalance] = useState(0);

  //======================USDT BALANCE ===========================
  const usdtBalance = useContractRead({
    address: usdtAddress,
    abi: usdtABI,
    functionName: "balanceOf",
    args: [address],
  });

  //=============================MAKE PAYMENTS======================
  let amountToPay = ceil(
    parseFloat(invest) * 0.03 + parseFloat(invest)
  ).toString();

  const { config, error } = usePrepareContractWrite({
    address: usdtAddress,
    abi: usdtABI,
    functionName: "transfer",
    args: [
      "0xda246f575d802a545FCF0af6238f2e52c08e9242",
      // utils.parseEther("0.1"),
      utils.parseEther(amountToPay),
      // convert to wei
    ],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  //=============================BNB PAYMENTS======================

  const [tokenValueInUsd, setTokenUsdValue] = useState(0);
  const [tokenPayValue, setTokenPayValue] = useState(0);

  const getNetworkTokenBalance = async () => {
    fetchBalance({
      address: address,
    })
      .then((balance) => {
        setNetworkTokenBalance(parseFloat(balance.formatted).toFixed(4));

        let currentValue = chain.network === "bsc" ? 411.48 : 0.06539;
        let usdValue =
          chain.network === "bsc" ? 0.00242970144214537222 : 15.22588022;

        setTokenUsdValue(
          (parseFloat(balance.formatted) * currentValue).toFixed(4)
        );
        setTokenPayValue((parseFloat(amountToPay) * usdValue).toFixed(4));
      })
      .catch((err) => {
        console.log();
      });
  };

  const sendNetworkToken = () => {
    sendTransaction({
      to:
        chain.network === "bsc"
          ? "0xda246f575d802a545FCF0af6238f2e52c08e9242"
          : "0x54cd536a37b406835b5765392b07d58bbdb483d9",
      value: utils.parseEther(tokenPayValue.toString()),
    })
      .then((data) => {
        postData({
          service: "crypto_pay",
          data: {
            transaction_hash: data.hash.toString(),
            address: address.toString(),
            amount: parseFloat(invest),
            // amount: parseFloat(amountToPay),
            unit_id: unit.id,
            currency: 234,
            signature: pdfDoc,
            "is_commitment": commitment
          },
        })
          .then((data) => {
            setSuccess(true);
            window.location.reload(true);
          })
          .catch((err) => console.log());
      })
      .catch((err) => console.log());
  };

  useEffect(() => {
    getNetworkTokenBalance();
  }, []);

  useEffect(() => {
    getNetworkTokenBalance();
  }, [chain]);

  //=============================ISLM PAYMENTS======================

  //=============================MAKE PAYMENTS======================

  useEffect(() => {
    if (usdtBalance.data !== undefined && isConnected) {
      setUsdtBalanceData(toUnit(usdtBalance.data));
    }

    if (data !== undefined) {
      postData({
        service: "crypto_pay",
        data: {
          transaction_hash: data.hash.toString(),
          address: address.toString(),
          amount: parseFloat(invest),
          // amount: parseFloat(amountToPay),
          unit_id: unit.id,
          currency: 234,
          signature: pdfDoc,
        },
      })
        .then((data) => {
          setSuccess(true);
          window.location.reload(true);
        })
        .catch((err) => console.log());
    }
  }, [isConnected, usdtBalance, data]);

  const onChange = (key) => { };
  const items = [
    {
      key: "1",
      label: (
        <div className="flex flex-col gap-3 px-4 py-3 text-center">
          <img
            src={usdt}
            alt="usdt"
            style={{ height: "60px" }}
            className="object-contain mx-auto"
          />
          <p>USDT</p>
        </div>
      ),
      children: (
        <>
          {isConnected ? (
            chain.network === "bsc" ? (
              <>
                <Alert
                  message={
                    <>
                      <p className="address">
                        Address : <span className="addr">{address}</span>
                      </p>
                      <p className="address">
                        {" "}
                        USDT Balance :{" "}
                        <span className="addr">{usdtBalanceData}</span>
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

                  {error && !success ? (
                    <Alert
                      message="Insufficient Funds..."
                      type="error"
                      className="mt-3"
                      showIcon
                    />
                  ) : (
                    ""
                  )}
                </div>
                <Flex
                  gap="small"
                  wrap="wrap"
                  justify={"start"}
                  align={"center"}
                >
                  <Button
                    type="primary"
                    icon={<LoginOutlined />}
                    disabled={!write}
                    onClick={() => write?.()}
                    className="connectBtn"
                  >
                    Make Payment
                  </Button>
                  <Button
                    danger
                    icon={<LoginOutlined />}
                    onClick={() => disconnect()}
                    className="connectBtn"
                  >
                    Disconnect
                  </Button>
                </Flex>
              </>
            ) : (
              <Alert
                className="py"
                message="Please Connect to Binance Smart Chain Network"
                type="info"
                showIcon
              />
            )
          ) : (
            <Flex gap="small" wrap="wrap" justify={"center"} align={"center"}>
              <Button
                type="primary"
                icon={<LoginOutlined />}
                loading={isConnecting ? true : false}
                onClick={() => connect()}
                className="connectBtn"
              >
                {isConnecting ? "Connecting...." : "Connect Wallet"}
              </Button>
            </Flex>
          )}
        </>
      ),
    },
    // {
    //   key: "2",
    //   label: (
    //     <div className="flex flex-col gap-3 px-4 py-3 text-center">
    //       <img
    //         src={bnb}
    //         alt="bnb"
    //         style={{ height: "60px" }}
    //         className="mx-auto"
    //       />
    //       <p>BNB</p>
    //     </div>
    //   ),
    //   children: (
    //     <>
    //       {isConnected ? (
    //         chain.network === "bsc" ? (
    //           <>
    //             <Alert
    //               className="py"
    //               message={
    //                 <>
    //                   <p className="address">
    //                     Address : <span className="addr">{address}</span>
    //                   </p>
    //                   <p className="address">
    //                     {" "}
    //                     BNB Balance :{" "}
    //                     <span className="addr">{networkTokenBalance}</span>
    //                   </p>

    //                   <p className="address">
    //                     {" "}
    //                     USD Value :{" "}
    //                     <span className="addr">{tokenValueInUsd}</span>
    //                   </p>
    //                 </>
    //               }
    //               type="info"
    //             />

    //             <div className="mt-4 text-base">
    //               <table>
    //                 <tbody>
    //                   {to_pay.map((p, i) => (
    //                     <tr key={i}>
    //                       <td className="py-1 pe-4">
    //                         <p>{p.label}</p>
    //                       </td>
    //                       <td>
    //                         <p>{p.value}</p>
    //                       </td>
    //                     </tr>
    //                   ))}
    //                   <Alert
    //                     className="mt-3"
    //                     message={
    //                       <tr>
    //                         <td>Amount to pay in BNB:</td>
    //                         <td>
    //                           <p className="bnbV"> {tokenPayValue}</p>
    //                         </td>
    //                       </tr>
    //                     }
    //                     type="success"
    //                     showIcon
    //                   />
    //                 </tbody>
    //               </table>

    //               {tokenPayValue > networkTokenBalance ? (
    //                 <Alert
    //                   message="Insufficient Funds..."
    //                   type="error"
    //                   showIcon
    //                   className="mt-3"
    //                 />
    //               ) : (
    //                 ""
    //               )}
    //             </div>
    //             <Flex
    //               gap="small"
    //               wrap="wrap"
    //               justify={"start"}
    //               align={"center"}
    //             >
    //               <Button
    //                 type="primary"
    //                 icon={<LoginOutlined />}
    //                 disabled={tokenPayValue > networkTokenBalance}
    //                 onClick={() => sendNetworkToken()}
    //                 className="connectBtn"
    //               >
    //                 Make Payment
    //               </Button>
    //               <Button
    //                 danger
    //                 icon={<LoginOutlined />}
    //                 onClick={() => disconnect()}
    //                 className="connectBtn"
    //               >
    //                 Disconnect
    //               </Button>
    //             </Flex>
    //           </>
    //         ) : (
    //           <Alert
    //             className="py"
    //             message="Please Connect to Binance Smart Chain Network"
    //             type="info"
    //             showIcon
    //           />
    //         )
    //       ) : (
    //         <Flex gap="small" wrap="wrap" justify={"center"} align={"center"}>
    //           <Button
    //             type="primary"
    //             icon={<LoginOutlined />}
    //             loading={isConnecting ? true : false}
    //             onClick={() => connect()}
    //             className="connectBtn"
    //           >
    //             {isConnecting ? "Connecting...." : "Connect Wallet"}
    //           </Button>
    //         </Flex>
    //       )}
    //     </>
    //   ),
    // },
    // {
    //   key: "3",
    //   label: (
    //     <div className="flex flex-col gap-3 px-4 py-3 text-center">
    //       <img
    //         src={islamic}
    //         alt="islamic"
    //         style={{ height: "60px" }}
    //         className="mx-auto"
    //       />
    //       <p>Islamic Coin</p>
    //     </div>
    //   ),
    //   children: (
    //     <Haqq
    //       chain={chain}
    //       address={address}
    //       networkTokenBalance={networkTokenBalance}
    //       tokenValueInUsd={tokenValueInUsd}
    //       to_pay={to_pay}
    //       tokenPayValue={tokenPayValue}
    //       isConnecting={isConnecting}
    //       connect={connect}
    //       sendNetworkToken={sendNetworkToken}
    //       isConnected={isConnected}
    //     />
    //   ),
    // },
    {
      key: "4",
      label: (
        <div className="flex flex-col gap-3 px-4 py-3 text-center">
          <img
            src={pieme}
            alt="Pieme"
            style={{ height: "60px" }}
            className="object-contain mx-auto"
          />
          <p>Pieme</p>
        </div>
      ),
      children: (
        <>
          {" "}
          <Alert
            className="py"
            message="Pieme Payments coming soon!"
            type="info"
            showIcon
          />
        </>
      ),
    },
  ];

  return (
    <div className="crypto-page">
      <p className="pb-4 text-lg font-semibold text-center">Accepted Tokens</p>
      <Tabs
        type="card"
        defaultActiveKey="1"
        centered
        items={items}
        onChange={onChange}
      />
    </div>
  );
}

export default CryptoPayments;
