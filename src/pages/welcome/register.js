import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import PasswordStrengthBar from "react-password-strength-bar";

import { Checkbox, Spin, Input, notification } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { postDataAuth } from "../../hooks/useFetch";

import ReCAPTCHA from "react-google-recaptcha";
import { robot_keys } from "../../utils/utils";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as y from "yup";
import useToken from "../../hooks/user-token";

const schema = y
  .object({
    first_name: y.string().label("First name").required(),
    last_name: y.string().label("Last name").required(),
    email_id: y.string().email().label("Email address").required(),
    username: y
      .string()
      .label("Username")
      .matches("^[a-zA-Z0-9_.-]*$", "Please enter a valid username")
      .required(),
    referral: y
      .string()
      .matches("^[a-zA-Z0-9_.-]*$", "Please enter a valid referral code")
      .label("Referral")
      .optional(),
  })
  .required();

function Register() {
  const recaptcha = React.useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  document.title = "Signup | Pieme";
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useToken();
  const [data, setData] = useState({
    phone_no: "",
    strength: 0,
    agree: false,
  });

  const onSubmit = async (sub) => {
    if (data.phone_no.length === 0)
      notification.error({
        message: "Register",
        description: "Please enter your Phone number",
      });
    else if (!isValidPhoneNumber(data.phone_no))
      notification.error({
        message: "Register",
        description: "Please enter a valid Phone number",
      });
    else if (data.password.length === 0)
      notification.error({
        message: "Register",
        description: "Please enter a password",
      });
    else if (data.strength < 2)
      notification.error({
        message: "Register",
        description: "Password is still weak",
      });
    else if (!data.agree)
      notification.error({
        message: "Register",
        description: "Please accept the agreement to continue",
      });
    else {
      const captchaValue = recaptcha.current.getValue();
      if (!captchaValue) await recaptcha.current.executeAsync();
      setDisable(true);
      postDataAuth({
        service: "signup",
        data: { ...sub, ...data },
      }).then((resp) => {
        setDisable(false);
        if (resp.success === 0)
          notification.error({
            message: "Sign up",
            description: resp.message,
          });
        else {
          navigate("/dashboard");
          setToken(resp.token);
          window.location.reload(false);
        }
      });
    }
  };

  return (
    <div>
      <div className="bg-white">
        <div className="container py-16 mx-auto text-center heading-color">
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
            <h2 className="mb-10 text-3xl font-semibold text-center heading-color">
              Your details
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="detail-form">
                <div>
                  <p>Full Name</p>
                  <div className="flex gap-4">
                    <div className="w-full">
                      <input
                        placeholder="Enter your first name"
                        {...register("first_name")}
                        className="text-sm"
                      />
                      <p>{errors.first_name?.message}</p>
                    </div>
                    <div className="w-full">
                      <input
                        placeholder="Enter your last name"
                        {...register("last_name")}
                        className="text-sm"
                      />
                      <p>{errors.last_name?.message}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p>Username</p>
                  <div>
                    <input
                      placeholder="Enter username"
                      {...register("username")}
                      className="text-sm"
                    />
                    <p>{errors.username?.message}</p>
                  </div>
                </div>
                <div>
                  <p>Email Address</p>
                  <div>
                    <input
                      placeholder="Enter email address"
                      {...register("email_id")}
                      className="text-sm"
                    />
                    <p>{errors.email_id?.message}</p>
                  </div>
                </div>
                <div>
                  <p>Phone number</p>
                  <div>
                    <PhoneInput
                      placeholder="Enter phone number"
                      defaultCountry="UG"
                      value={data.phone}
                      required
                      onChange={(e) => {
                        data.phone_no = e;
                        setData({ ...data });
                      }}
                    />
                  </div>
                </div>
                <div className="pt-4 mt-3 border-t">
                  <p>Password</p>
                  <div>
                    <Input.Password
                      placeholder="Enter password"
                      className="p-2.5 text-sm"
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                      value={data.password}
                      autoComplete="true"
                      required
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
                </div>
                <p>
                  Your password must be at least eight characters long and
                  contain at least one capital letter and one number.
                </p>

                <div className="pt-3 mt-4 border-t">
                  <p>Referral</p>
                  <div>
                    <input
                      placeholder="Enter the referral username if you have any"
                      {...register("referral")}
                      className="text-sm"
                    />
                    <p>{errors.referral?.message}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t">
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
                <ReCAPTCHA
                  ref={recaptcha}
                  size="invisible"
                  sitekey={robot_keys.SITE_KEY}
                />
              </div>

              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  disabled={disable}
                  className="flex items-center gap-3 shadow-md invest-now"
                >
                  {disable && <Spin />}
                  <p>Create my profile</p>
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
