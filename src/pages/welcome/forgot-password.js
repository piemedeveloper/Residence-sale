import React, { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { Spin, notification } from "antd";
import { postDataAuth } from "../../hooks/useFetch";
import ReCAPTCHA from "react-google-recaptcha";
import { robot_keys } from "../../utils/utils";
import { AuthContext } from "../../context/auth-context";

function ForgotPassword() {
  document.title = "Forgot Password | Pieme";
  const navigate = useNavigate();
  const [disable, setDisable] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const recaptcha = React.useRef();
  const { isAuthenticated } = useContext(AuthContext);

  const login = async (e) => {
    e.preventDefault();
    if (email.length === 0)
      notification.error({
        message: "Forgot your password",
        description: "Please enter your Emaill Address",
      });
    else {
      const captchaValue = recaptcha.current.getValue();
      if (!captchaValue) await recaptcha.current.executeAsync();

      setDisable(true);
      postDataAuth({
        service: "forgot_password",
        data: { email },
      }).then((data) => {
        setDisable(false);
        if (data.success === 0)
          notification.error({
            message: "Forgot your password",
            description: data.message,
          });
        else {
          notification.success({
            message: "Forgot your password",
            description: data.message,
          });
          navigate("/login");
        }
      });
    }
  };

  return (
    <div>
      {isAuthenticated && <Navigate to="/dashboard" />}
      <div className="bg-white">
        <div className="container py-12 mx-auto text-center heading-color">
          <h1 className="text-4xl font-semibold md:text-5xl">
            Forgot your password
          </h1>
          <p className="mt-3 text-lg menu-color">
            Please provide your Email Address to receive a password reset link
          </p>
        </div>
      </div>
      <div className="gray-bg">
        <div className="container py-12 mx-auto">
          <div className="max-w-xl mx-auto">
            <form onSubmit={login}>
              <div className="detail-form">
                <div>
                  <p>Email Address</p>
                  <div>
                    <input
                      placeholder="Enter email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-3">
                <ReCAPTCHA
                  ref={recaptcha}
                  sitekey={robot_keys.SITE_KEY}
                  size="invisible"
                />
              </div>

              <div className="flex justify-center mt-3">
                <button
                  type="submit"
                  disabled={disable}
                  className="flex items-center gap-3 shadow-md invest-now"
                >
                  {disable && <Spin />}
                  <p>Request reset link</p>
                </button>
              </div>
            </form>

            <div className="mt-10 text-base">
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

export default ForgotPassword;
