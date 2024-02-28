import usdt from "../../assets/images/usdt-1.png";
import bnb from "../../assets/images/bnb-1.png";
import pieme from "../../assets/images/pieme.png";
import islamic from "../../assets/images/islamic-mark.png";
import "../../assets/css/crypto.css";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { LoginOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import { useState, useEffect } from "react";
import { useAccount, useContractRead, useSendTransaction } from "wagmi";
import { useNavigate } from "react-router-dom";
import postData from "../../hooks/useFetch";

import { ethers, utils } from "ethers";
import { usdtAddress, usdtABI } from "./abi";
import { readContract } from "@wagmi/core";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { unitless } from "antd/es/theme/useToken";
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
  const { open, close } = useWeb3Modal();
  const { sendTransaction } = useSendTransaction();

  const navigate = useNavigate();

  const connect = () => {
    // alert(isConnected);
    if (isConnected) close();
    else open();
  };

  const { address, isConnecting, isConnected, isDisconnected } = useAccount();
  const [usdtBalanceData, setUsdtBalanceData] = useState(0);
  const [success, setSuccess] = useState(false);

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

  // console.log(write, data, isLoading, isSuccess, error, amountToPay);

  //=============================MAKE PAYMENTS======================

  useEffect(() => {
    if (usdtBalance.data !== undefined && isConnected) {
      setUsdtBalanceData(toUnit(usdtBalance.data));
    }

    // console.log("data********************", data);

    if (data !== undefined) {
      // console.log(data.hash);

      postData({
        service: "crypto_pay",
        data: {
          transaction_hash: data.hash.toString(),
          address: address.toString(),
          amount: parseFloat(invest),
          unit_id: unit.id,
          currency: 234,
          signature: "ertygf56789.png",
        },
      })
        .then((data) => {
          setSuccess(true);
          navigate("/dashboard/investments");
        })
        .catch((err) => console.log(err));
    }
  }, [isConnected, usdtBalance, data]);

  const currencies = [
    { icon: usdt, label: "USDT BEP20", soon: false },
    { icon: bnb, label: "BNB", soon: true },
    { icon: pieme, label: "PIE", soon: true },
    { icon: islamic, label: "ISLM", soon: true },
  ];
  return (
    <>
      <div className="grid grid-cols-2 gap-4 mb-3 md:grid-cols-4">
        {currencies.map((c, i) => (
          <div key={i} className={`p-3 border ${!c.soon && "shadow-lg"}`}>
            <div className={`flex flex-col justify-center text-center`}>
              <img src={c.icon} alt="usdt" className="p-5" />
              <p className="font-medium">{c.label}</p>
              {c.soon && <p>Coming soon</p>}
            </div>
          </div>
        ))}
      </div>

      {isConnected ? (
        <>
          <p className="address">
            Address : <span className="addr">{address}</span>
          </p>
          <p className="address">
            {" "}
            USDT Balance : <span className="addr">{usdtBalanceData}</span>
          </p>

          <div className="items-center text-base md:flex">
            <div className="w-full">
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
            <p className="w-full text-red-500">
              Only send USDT BEP20 to avoid loss of funds
            </p>
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
            {/* <Button
              danger
              icon={<LoginOutlined />}
              onClick={() => close()}
              className="connectBtn"
            >
              Disconnect
            </Button> */}
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
  );
}

export default CryptoPayments;
