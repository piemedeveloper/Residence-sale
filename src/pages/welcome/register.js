import React from "react";
import { Link } from "react-router-dom";
import { Checkbox } from "antd";

function Register() {
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <div>
      <div className="bg-white">
        <div className="container mx-auto heading-color text-center py-12">
          <h1 className="font-semibold text-5xl">Register</h1>
          <p className="text-lg mt-3 menu-color">
            Sign up now to get access to exclusive crowdfunded real estate
            opportunities
          </p>
        </div>
      </div>
      <div className="gray-bg">
        <div className="container mx-auto py-12">
          <div className="max-w-2xl mx-auto detail-form">
            <h2 className="font-semibold text-3xl heading-color text-center mb-2">
              Your details
            </h2>
            <table>
              <tbody>
                <tr>
                  <td>
                    <p>Full Name</p>
                  </td>
                  <td>
                    <div className="grid md:grid-cols-2 gap-5">
                      <input
                        type="email"
                        placeholder="Enter your first name"
                        className="text-base"
                      />
                      <input
                        type="email"
                        placeholder="Enter your last name"
                        className="text-base"
                      />
                    </div>
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
                    />
                  </td>
                </tr>

                <tr className="border-t mt-3">
                  <td>
                    <p>Password</p>
                  </td>
                  <td>
                    <input
                      type="password"
                      placeholder="Enter password"
                      className="text-base"
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    Your password must be at least eight characters long and
                    contain at least one capital letter and one number.
                  </td>
                </tr>

                <tr className="border-t mt-3">
                  <td>
                    <p>Referral Code</p>
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Enter your referral code if you have one"
                      className="text-base"
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="mt-4">
              <Checkbox onChange={onChange}>
                <p className="text-base">
                  Please click here to accept our{" "}
                  <Link>
                    <span className="main-color">terms & conditions</span>
                  </Link>
                </p>
              </Checkbox>
            </div>

            <div className="flex justify-center mt-6">
              <button className="text-base text-center register-btn shadow-md">
                Create my profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
