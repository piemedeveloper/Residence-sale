import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div>
      <div className="bg-white">
        <div className="container mx-auto heading-color text-center py-12">
          <h1 className="font-semibold text-5xl">Sign in</h1>
          <p className="text-lg mt-3 menu-color">
            Login to your account by entering your details below
          </p>
        </div>
      </div>
      <div className="gray-bg">
        <div className="container mx-auto py-12">
          <div className="max-w-xl mx-auto detail-form">
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
                      className="text-sm"
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <p>Password</p>
                  </td>
                  <td>
                    <input
                      type="password"
                      placeholder="Enter password"
                      className="text-sm"
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="flex justify-center mt-6">
              <button className="text-base text-center register-btn shadow-md">
                Sign in
              </button>
            </div>

            <div className="mt-10 text-lg">
              <Link>
                <p className="main-color">Forgot your password?</p>
              </Link>
              <Link to="/signup">
                <p className="main-color mt-3 ">
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
