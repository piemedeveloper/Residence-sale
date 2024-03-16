import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { Input, notification, Spin } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { postDataAuth } from "../../hooks/useFetch";
import { getToken } from "../../utils/useToken";
import ReCAPTCHA from "react-google-recaptcha";
import { robot_keys } from "../../utils/utils";
import PasswordStrengthBar from "react-password-strength-bar";

function ResetPassword() {
  document.title = "Reset Password | Pieme";
  const navigate = useNavigate();
  let location = useLocation();
  const [disable, setDisable] = React.useState(false);
  const [pid, setPid] = React.useState("");
  const [data, setData] = React.useState({
    password: "",
    re_password: "",
    strength: 0,
  });

  React.useEffect(() => {
    if (getToken().length > 0) {
      navigate("/dashboard");
      window.location.reload(false);
    }

    let id = location.pathname.substring(1);

    id = id.length > 1 ? id.split("/")[id.split("/").length - 1] : "";
    if (pid !== id) {
      setPid(id);
    }
    // eslint-disable-next-line
  }, []);

  const recaptcha = React.useRef();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (data.password.length === 0)
      notification.error({
        message: "Reset Password",
        description: "Please enter a password",
      });
    else if (data.strength < 2)
      notification.warning({
        message: "Reset Password",
        description: "Password is still weak",
      });
    else if (data.password !== data.re_password)
      notification.warning({
        message: "Reset Password",
        description: "Password is not similar",
      });
    else {
      const captchaValue = recaptcha.current.getValue();
      if (!captchaValue) await recaptcha.current.executeAsync();

      setDisable(true);
      postDataAuth({
        service: "set_new_password",
        data: {
          token: pid,
          password: data.password,
        },
      }).then((data) => {
        setDisable(false);
        if (data.success === 1) {
          notification.success({
            message: "Reset Password",
            description: data.message,
          });

          navigate("/login");
        } else
          notification.error({
            message: "Reset Password",
            description: data.message,
          });
      });
    }
  };

  return (
    <div>
      <div className="bg-white">
        <div className="container py-12 mx-auto text-center heading-color">
          <h1 className="text-4xl font-semibold md:text-5xl">Reset Password</h1>
        </div>
      </div>
      <div className="gray-bg">
        <div className="container py-12 mx-auto">
          <div className="max-w-xl mx-auto detail-form">
            <form onSubmit={onSubmit}>
              <table>
                <tbody>
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

                      <PasswordStrengthBar
                        password={data.password}
                        onChangeScore={(score) => {
                          data.strength = score;
                          setData({ ...data });
                        }}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <p>Retype Password</p>
                    </td>
                    <td>
                      <Input.Password
                        placeholder="Retype password"
                        className="p-2.5 text-[0.895rem]"
                        iconRender={(visible) =>
                          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                        value={data.re_password}
                        onChange={(e) => {
                          data.re_password = e.target.value;
                          setData({ ...data });
                        }}
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
                  className="text-base text-center shadow-md register-btn"
                >
                  {disable && <Spin />}
                  <p>Set Password</p>
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

export default ResetPassword;
