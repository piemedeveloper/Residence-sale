import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import PasswordStrengthBar from "react-password-strength-bar";

import { Checkbox, Alert, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { postDataAuth } from "../../hooks/useFetch";
import useToken, { getToken } from "../../utils/useToken";

import ReCAPTCHA from "react-google-recaptcha";
import { robot_keys } from "../../utils/utils";

function Register() {
  const recaptcha = React.useRef();
  document.title = "Signup | Pieme";
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useToken();
  const [error, setError] = useState("");
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email_id: "",
    username: "",
    password: "",
    phone_no: "",
    strength: 0,
    agree: false,
  });

  React.useEffect(() => {
    if (getToken().length > 0) {
      navigate("/dashboard");
      window.location.reload(false);
    }
    // eslint-disable-next-line
  }, []);

  const register = (e) => {
    e.preventDefault();
    const captchaValue = recaptcha.current.getValue();

    if (data.first_name.length === 0) setError("Please enter your first name");
    else if (data.last_name.length === 0)
      setError("Please enter your last name");
    else if (data.email_id.length === 0)
      setError("Please enter your Email address");
    else if (data.username.length === 0) setError("Please enter your Username");
    else if (data.phone_no.length === 0)
      setError("Please enter your Phone number");
    else if (!isValidPhoneNumber(data.phone_no))
      setError("Please enter a valid Phone number");
    else if (data.password.length === 0) setError("Please enter a password");
    else if (data.strength < 2) setError("Password is still weak");
    else if (!data.agree) setError("Please accept the agreement to continue");
    else if (!captchaValue) alert("Please verify the reCAPTCHA!");
    else {
      setDisable(true);
      setError("");
      postDataAuth({
        service: "signup",
        data: data,
      }).then((data) => {
        setDisable(false);
        if (data.success === 0) setError(data.message);
        else {
          setToken(data.token);
          window.location.reload(false);
        }
      });
    }
  };

  return (
    <div>
      <div className="bg-white">
        <div className="container py-12 mx-auto text-center heading-color">
          <h1 className="text-5xl font-semibold">Register</h1>
          <p className="mt-3 text-lg menu-color">
            Sign up now to get access to exclusive crowdfunded hotel room
            opportunities
          </p>
        </div>
      </div>
      <div className="gray-bg">
        <div className="container py-12 mx-auto">
          <div className="max-w-2xl mx-auto detail-form">
            <h2 className="mb-2 text-3xl font-semibold text-center heading-color">
              Your details
            </h2>
            <form onSubmit={register}>
              {error.length > 0 && (
                <Alert showIcon={true} message={error} type="error" />
              )}
              <table>
                <tbody>
                  <tr>
                    <td>
                      <p>Full Name</p>
                    </td>
                    <td>
                      <div className="grid gap-5 md:grid-cols-2">
                        <input
                          type="text"
                          placeholder="Enter your first name"
                          className="text-base"
                          value={data.first_name}
                          onChange={(e) => {
                            data.first_name = e.target.value;
                            setData({ ...data });
                          }}
                        />
                        <input
                          type="text"
                          placeholder="Enter your last name"
                          className="text-base"
                          value={data.last_name}
                          onChange={(e) => {
                            data.last_name = e.target.value;
                            setData({ ...data });
                          }}
                        />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <p>Username</p>
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Enter username"
                        className="text-base"
                        value={data.username}
                        onChange={(e) => {
                          data.username = e.target.value;
                          setData({ ...data });
                        }}
                      />
                    </td>
                  </tr>

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
                      <p>Phone number</p>
                    </td>
                    <td>
                      <PhoneInput
                        placeholder="Enter phone number"
                        defaultCountry="UG"
                        value={data.phone}
                        onChange={(e) => {
                          data.phone_no = e;
                          setData({ ...data });
                        }}
                      />
                    </td>
                  </tr>

                  <tr className="mt-3 border-t">
                    <td>
                      <p>Password</p>
                    </td>
                    <td>
                      <div>
                        <Input.Password
                          placeholder="Enter password"
                          className="p-2.5 text-base"
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
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      Your password must be at least eight characters long and
                      contain at least one capital letter and one number.
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-4">
                <Checkbox
                  onChange={(e) => {
                    data.agree = e.target.checked;
                    setData({ ...data });
                  }}
                >
                  <p className="text-base">
                    Please click here to accept our{" "}
                    <Link to={"/terms-and-conditions"}>
                      <span className="main-color">terms & conditions</span>
                    </Link>
                  </p>
                </Checkbox>
              </div>

              <div className="flex justify-center mt-3">
                <ReCAPTCHA ref={recaptcha} sitekey={robot_keys.SITE_KEY} />
              </div>

              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  disabled={disable}
                  className="text-base text-center shadow-md register-btn"
                >
                  Create my profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
