import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { Alert, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { postDataAuth } from "../../hooks/useFetch";
import useToken, { getToken } from "../../utils/useToken";

function Login() {
  document.title = "Login | Pieme";
  const navigate = useNavigate();
  const { setToken } = useToken();
  const [error, setError] = React.useState("");
  const [disable, setDisable] = React.useState(false);
  const [data, setData] = React.useState({
    email_id: "",
    password: "",
  });

  React.useEffect(() => {
    if (getToken().length > 0) {
      navigate("/dashboard");
      window.location.reload(false);
    }
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (error.length > 0) setDisable(false);
  }, [error]);

  const login = (e) => {
    setDisable(true);
    e.preventDefault();
    if (data.email_id.length === 0)
      setError("Please enter your Emaill Address");
    else if (data.password.length === 0) setError("Please enter your password");
    else {
      setError("");
      postDataAuth({
        service: "login",
        data: data,
      }).then((data) => {
        setDisable(false);
        if (data.success === 0) setError(data.message);
        else {
          setToken(data.token);
          navigate("/dashboard");
          window.location.reload(false);
        }
      });
    }
  };
  return (
    <div>
      <div className="bg-white">
        <div className="container py-12 mx-auto text-center heading-color">
          <h1 className="text-4xl font-semibold md:text-5xl">Sign in</h1>
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
                  disabled={disable}
                  className="text-base text-center shadow-md register-btn"
                >
                  Sign in
                </button>
              </div>
            </form>

            <div className="mt-10 text-base">
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
