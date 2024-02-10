import React from "react";
import { Link } from "react-router-dom";

import { Alert, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

function Login() {
  const [error, setError] = React.useState("");
  const [data, setData] = React.useState({
    email_id: "",
    password: "",
  });

  const login = (e) => {
    e.preventDefault();
    if (data.email_id.length === 0)
      setError("Please enter your Emaill Address");
    else if (data.password.length === 0) setError("Please enter your password");
    else {
      setError("");
    }
  };
  return (
    <div>
      <div className="bg-white">
        <div className="container py-12 mx-auto text-center heading-color">
          <h1 className="text-5xl font-semibold">Sign in</h1>
          <p className="mt-3 text-lg menu-color">
            Login to your account by entering your details below
          </p>
        </div>
      </div>
      <div className="gray-bg">
        <div className="container py-12 mx-auto">
          <div className="max-w-xl mx-auto detail-form">
            <form onSubmit={login}>
              {error.length > 0 && (
                <Alert showIcon={true} message={error} type="error" />
              )}
              <table>
                <tbody>
                  <tr>
                    <td>
                      <p>Email Address</p>
                    </td>
                    <td>
                      <input
                        type="email"
                        placeholder="Enter email address"
                        className="text-base"
                        value={data.email_id}
                        onChange={(e) => {
                          data.email_id = e.target.value;
                          setData({ ...data });
                        }}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <p>Password</p>
                    </td>
                    <td>
                      <Input.Password
                        placeholder="Enter password"
                        className="p-2.5 text-[0.895rem]"
                        iconRender={(visible) =>
                          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                        value={data.password}
                        onChange={(e) => {
                          data.password = e.target.value;
                          setData({ ...data });
                        }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="text-base text-center shadow-md register-btn"
                >
                  Sign in
                </button>
              </div>
            </form>

            <div className="mt-10 text-lg">
              <Link>
                <p className="main-color">Forgot your password?</p>
              </Link>
              <Link to="/signup">
                <p className="mt-3 main-color ">
                  Don't have an account? Click here to sign up.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
