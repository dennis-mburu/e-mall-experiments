import React, { useState } from "react";
import "./LoginForm.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function CustomerSigupForm({ setUser }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    fetch("/api/customer_signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
        user_type: "customer",
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
        });
        navigate("/");
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <>
      <div className="form-container">
        <h1 className="text-center p-6 text-4xl font-medium">
          CUSTOMER SIGN UP
        </h1>
        <form
          className=" w-2/3 my-6 mx-auto flex flex-col"
          onSubmit={handleSubmit}
        >
          <label htmlFor="username" className="text-l">
            UserName:
          </label>
          <input
            className="bg-[#0a0a23] mt-2 h-8"
            required
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password" className="mt-5 text-xl">
            Password:
          </label>
          <input
            required
            className="bg-[#0a0a23] mt-2 h-8"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="password_confirmation" className="mt-5 text-xl">
            Confirm Password:
          </label>
          <input
            className="bg-[#0a0a23] mt-2 h-8"
            type="password"
            name="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />

          {errors.map((error) => {
            return (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-3 text-center"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
                <button
                onClick={() => setErrors([])}
                type="button"
                className="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
                data-dismiss-target="#alert-2"
                aria-label="Close"
              >
                <span class="sr-only">Close</span>
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
              </div>
            );
          })}

          <button className="bg-blue-500 hover:bg-blue-700 mt-6 w-1/3 mx-auto text-white font-bold py-2 px-4 rounded">
            Sign Up
          </button>
          <h2 className="text-center mt-6 py-6 text-xl ">
            Already Registered?
          </h2>

          <Link
            to="/customer_login"
            className="text-center text-l text-blue-500 underline hover:text-teal-200"
          >
            Log in here
          </Link>
        </form>
      </div>
    </>
  );
}

export default CustomerSigupForm;
