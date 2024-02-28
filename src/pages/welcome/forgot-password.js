import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { Spin, notification } from "antd";
import { postDataAuth } from "../../hooks/useFetch";
import { getToken } from "../../utils/useToken";
import ReCAPTCHA from "react-google-recaptcha";
import { robot_keys } from "../../utils/utils";

function ForgotPassword() {
  document.title = "Forgot Password | Pieme";
  const navigate = useNavigate();
  const [disable, setDisable] = React.useState(false);
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    if (getToken().length > 0) {
      navigate("/dashboard");
      window.location.reload(false);
    }
    // eslint-disable-next-line
  }, []);

  const recaptcha = React.useRef();

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
          <div className="max-w-xl mx-auto detail-form">
            <form onSubmit={login}>
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>

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
                  className="flex items-center gap-3 text-base text-center shadow-md register-btn"
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
