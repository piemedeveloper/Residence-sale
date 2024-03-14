import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { Spin, notification } from "antd";
import { postDataAuth } from "../../hooks/useFetch";
import useToken, { getToken } from "../../utils/useToken";
import ReCAPTCHA from "react-google-recaptcha";
import { robot_keys } from "../../utils/utils";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as y from "yup";

const schema = y
  .object({
    email_id: y.string().email().label("Email address").required(),
    password: y.string().label("Password").required(),
  })
  .required();

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  document.title = "Login | Pieme";
  const navigate = useNavigate();
  const { setToken } = useToken();
  const [disable, setDisable] = React.useState(false);

  React.useEffect(() => {
    if (getToken().length > 0) {
      navigate("/dashboard");
      window.location.reload(false);
    }
    // eslint-disable-next-line
  }, []);

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
                      autoComplete={true}
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
                  className="flex items-center gap-3 text-base text-center shadow-md register-btn"
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
