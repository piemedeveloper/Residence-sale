import { LoginOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import { Alert } from "antd";
import { disconnect } from "@wagmi/core";

function Haqq({
  address,
  networkTokenBalance,
  tokenValueInUsd,
  to_pay,
  tokenPayValue,
  isConnecting,
  connect,
  sendNetworkToken,
  isConnected,
  chain,
}) {
  return (
    <>
      {isConnected ? (
        chain.network === "haqq-mainnet" ? (
          <>
            <Alert
              message={
                <div className="address-section">
                  <p className="address">
                    Address : <span className="addr">{address}</span>
                  </p>
                  <p className="address">
                    {" "}
                    ISLM Balance :{" "}
                    <span className="addr">{networkTokenBalance}</span>
                  </p>

                  <p className="address">
                    {" "}
                    USD Value : <span className="addr">{tokenValueInUsd}</span>
                  </p>
                </div>
              }
              type="info"
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

                  <Alert
                    className="mt-3 py"
                    message={
                      <>
                        <tr>
                          <td>Amount to pay in ISLM:</td>
                          <td>
                            <p className="bnbV"> {tokenPayValue}</p>
                          </td>
                        </tr>
                      </>
                    }
                    type="success"
                    showIcon
                  />
                </tbody>
              </table>

              {tokenPayValue > networkTokenBalance ? (
                <Alert
                  className="mt-3 py"
                  message="Insufficient Funds.........."
                  type="error"
                  showIcon
                />
              ) : (
                ""
              )}
            </div>
            <Flex gap="small" wrap="wrap" justify={"start"} align={"center"}>
              <Button
                type="primary"
                icon={<LoginOutlined />}
                disabled={tokenPayValue > networkTokenBalance}
                onClick={() => sendNetworkToken()}
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
          <>
            <Alert
              className="py"
              message="Please Switch to the Haqq Network"
              type="info"
              showIcon
            />
            <Button
              danger
              icon={<LoginOutlined />}
              onClick={() => disconnect()}
              className="connectBtn"
            >
              Disconnect
            </Button>
          </>
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
  );
}

export default Haqq;
