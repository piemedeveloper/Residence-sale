import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { Spin, notification } from "antd";
import { postDataAuth } from "../../hooks/useFetch";
import ReCAPTCHA from "react-google-recaptcha";
import { robot_keys } from "../../utils/utils";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as y from "yup";
import useToken from "../../hooks/user-token";

const schema = y
  .object({
    email_id: y.string().email().label("Email address").required(),
    password: y.string().label("Password").required(),
  })
  .required();

function Login() {
  document.title = "Login | Pieme";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const { setToken } = useToken();
  const [disable, setDisable] = React.useState(false);

  const recaptcha = React.useRef();

  const onSubmit = async (data) => {
    const captchaValue = recaptcha.current.getValue();
    if (!captchaValue) await recaptcha.current.executeAsync();

    setDisable(true);
    postDataAuth({
      service: "login",
      data: data,
    }).then((resp) => {
      setDisable(false);
      if (resp.success === 0)
        notification.error({
          message: "Sign in",
          description: resp.message,
        });
      else {
        setToken(resp.token);
        navigate("/dashboard");
        window.location.reload(false);
      }
    });
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
          <div className="max-w-xl mx-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="detail-form">
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
                  <p>Password</p>
                  <div>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      {...register("password")}
                      className="text-sm"
                    />
                    <p>{errors.password?.message}</p>
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
                  <p>Sign in</p>
                </button>
              </div>
            </form>

            <div className="mt-10 text-base">
              <Link to="/forgot-password">
                <p className="main-color">Forgot your password?</p>
              </Link>
              <p className="mt-3 main-color ">Don't have an account?</p>
              <Link to="/signup">
                <div className="flex items-center justify-center gap-3 p-3.5 mt-3 text-sm text-center text-white rounded-full shadow-md main-deep-bg">
                  <p >
                    Click here to sign up.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
