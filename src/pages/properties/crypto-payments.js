import usdt from "../../assets/images/usdt-1.png";
import bnb from "../../assets/images/bnb-1.png";
import pieme from "../../assets/images/pieme.png";
import islamic from "../../assets/images/islamic-mark.png";
import "../../assets/css/crypto.css";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { LoginOutlined } from "@ant-design/icons";
import { Card, Row, Button, Flex } from "antd";
import { useState, useEffect } from "react";
import { useAccount, useContractRead, useSendTransaction } from "wagmi";
import postData from "../../hooks/useFetch";

import { ethers, utils } from "ethers";
import { usdtAddress, usdtABI } from "./abi";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { fetchBalance, sendTransaction } from "@wagmi/core";
import { Tabs } from "antd";

const gridStyle = {
  width: "25%",
  textAlign: "center",
};

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

function CryptoPayments({ to_pay, invest, unit }) {
  const { open } = useWeb3Modal();

  const connect = () => {
    open();
  };

  const { address, isConnecting, isConnected, isDisconnected } = useAccount();
  const [usdtBalanceData, setUsdtBalanceData] = useState(0);
  const [success, setSuccess] = useState(false);
  const [bnbbalance, setBNBbalance] = useState(0);
  const [bnbbalanceValue, setBNBbalanceValue] = useState(0);

  //======================USDT BALANCE ===========================
  const usdtBalance = useContractRead({
    address: usdtAddress,
    abi: usdtABI,
    functionName: "balanceOf",
    args: [address],
  });

  //=============================MAKE PAYMENTS======================
  let amountToPay = (parseFloat(invest) * 0.03 + parseFloat(invest)).toString();
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

  const [usdtBNBValue, setUsdtBNBValue] = useState(0);
  const [bnbUSDTValue, setBNBusdtValue] = useState(0);
  const [tkey, setTKey] = useState(0);

  const getBNBbalance = async () => {
    const balance = await fetchBalance({
      address: address,
    });

    setBNBbalance(balance.formatted);

    let bnb1 = 411.48;
    let usdt1 = 0.00242970144214537222;
    setUsdtBNBValue(parseFloat(balance.formatted) * bnb1);
    setBNBusdtValue(parseFloat(amountToPay) * usdt1);

    setBNBbalanceValue(toUnit(balance.value));

  };

  const sendBNB = () => {
    sendTransaction({
      to: "0xda246f575d802a545FCF0af6238f2e52c08e9242",
      value: utils.parseEther(bnbUSDTValue.toString()),
    })
      .then((data) => {

        postData({
          service: "crypto_pay",
          data: {
            transaction_hash: data.hash.toString(),
            address: address.toString(),
            amount: parseFloat(amountToPay),
            unit_id: unit.id,
            currency: 234,
            signature: "ertygf56789.png",
          },
        })
          .then((data) => {
            console.log(data);
            setSuccess(true);
            window.location.reload(true);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getBNBbalance();
  }, []);

  //=============================MAKE PAYMENTS======================

  useEffect(() => {
    if (usdtBalance.data !== undefined && isConnected) {
      setUsdtBalanceData(toUnit(usdtBalance.data));
    }

    console.log("data********************", data);

    if (data !== undefined) {
      console.log(data.hash);

      postData({
        service: "crypto_pay",
        data: {
          transaction_hash: data.hash.toString(),
          address: address.toString(),
          amount: parseFloat(amountToPay),
          unit_id: unit.id,
          currency: 234,
          signature: "ertygf56789.png",
        },
      })
        .then((data) => {
          console.log(data);
          setSuccess(true);
          window.location.reload(true);
        })
        .catch((err) => console.log(err));
    }
  }, [isConnected, usdtBalance, data]);

  const onChange = (key) => {
    console.log(key);
    setTKey(key);
  };
  const items = [
    {
      key: "1",
      label: "USDT Payments",
      children: (
        <>
          {isConnected ? (
            <>
              <p className="address">
                Address : <span className="addr">{address}</span>
              </p>
              <p className="address">
                {" "}
                USDT Balance : <span className="addr">{usdtBalanceData}</span>
              </p>

              <div className="text-base">
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
                  <span className="error">Insufficient Funds..........</span>
                ) : (
                  ""
                )}
              </div>
              <Flex gap="small" wrap="wrap" justify={"start"} align={"center"}>
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
                  onClick={() => connect()}
                  className="connectBtn"
                >
                  Disconnect
                </Button>
              </Flex>
            </>
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
    {
      key: "2",
      label: "BNB Payments",
      children: (
        <>
          {isConnected ? (
            <>
              <p className="address">
                Address : <span className="addr">{address}</span>
              </p>
              <p className="address">
                {" "}
                BNB Balance : <span className="addr">{bnbbalance}</span>
              </p>

              <p className="address">
                {" "}
                USD Value : <span className="addr">{usdtBNBValue}</span>
              </p>

              <div className="text-base">
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
             <tr>

             <td>Amount to pay in BNB:</td>
                      <td><p className="bnbV"> {bnbUSDTValue}</p></td>
             </tr>
                
                
                  </tbody>
                </table>

                { bnbUSDTValue > bnbbalance ? (
                  <span className="error">Insufficient Funds..........</span>
                ) : (
                  ""
                )}
              </div>
              <Flex gap="small" wrap="wrap" justify={"start"} align={"center"}>
                <Button
                  type="primary"
                  icon={<LoginOutlined />}
                  disabled={bnbUSDTValue > bnbbalance}
                  onClick={() => sendBNB()}
                  className="connectBtn"
                >
                  Make Payment
                </Button>
                <Button
                  danger
                  icon={<LoginOutlined />}
                  onClick={() => connect()}
                  className="connectBtn"
                >
                  Disconnect
                </Button>
              </Flex>
            </>
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
    {
      key: "3",
      label: "Pieme Payments",
      children: "Payments Coming Soon!",
    },
    {
      key: "4",
      label: "Islamic Coin Payments",
      children: "Payments Coming Soon!",
    },
  ];

  return (
    <>
      <Card title="Accepted Tokens">
        <Card.Grid style={gridStyle} className="tokenCard">
          <Row justify="center">
            <img src={usdt} alt="usdt" />
            <p>USDT</p>
          </Row>
        </Card.Grid>

        <Card.Grid style={gridStyle} className="tokenCard">
          {" "}
          <Row justify="center">
            <img src={bnb} alt="bnb" />
          </Row>
          <p>BnB</p>
        </Card.Grid>
        <Card.Grid style={gridStyle} className="tokenCard">
          <Row justify="center">
            <img src={pieme} alt="pieme" style={{ width: "73%" }} />
            <p>Pieme</p>
          </Row>
        </Card.Grid>
        <Card.Grid style={gridStyle} className="tokenCard">
          <Row justify="center">
            <img src={islamic} alt="islamic" style={{ width: "73%" }} />
            <p>Islamic</p>
          </Row>
        </Card.Grid>
      </Card>

      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </>
  );
}

export default CryptoPayments;
