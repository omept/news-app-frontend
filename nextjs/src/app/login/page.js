"use client";
import { log } from "../_appBackendApi/appBackendApi";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext, AuthDispatchContext } from "../_contexts/authContext";
import { redirect } from "next/navigation";

export default function Login() {
  const authState = useContext(AuthContext);
  const prevAuthState = useRef(authState);
  const authDispatch = useContext(AuthDispatchContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [fetching, setFetching] = useState(false);
  const emailInput = useRef();
  const passwordInput = useRef();

  if (authState.token != "") {
    redirect("/");
  }

  useEffect(() => {
    // Access the resolved value of the promise
    if (!(authState instanceof Promise)) {
      return;
    }
    authState.then((authState) => {
      // Check if the context value has changed
      if (prevAuthState.current !== authState) {
        // Perform any other actions based on the updated context value
        if (!authState.ok) {
          setErrorMessage(() => authState.message);
          setFetching(() => false);
        } else {
          redirect("/");
        }
      }
      // Update the previous value to track changes in the future
      prevAuthState.current = authState;
    });
  }, [authState]);

  async function submitLogin(event) {
    event.preventDefault();
    setFetching(() => true);
    setErrorMessage(() => "");
    authDispatch({
      type: "login",
      payload: {
        email: emailInput.current.value,
        password: passwordInput.current.value,
      },
    });
  }

  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 mx-auto md:h-screen lg:py-0">
        <a
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          NewsFeed
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login
            </h1>

            {!errorMessage || errorMessage == "" ? (
              ""
            ) : (
              <div
                className="mb-4 rounded-lg bg-danger-100 px-6 py-5 text-base text-danger-700"
                role="alert"
              >
                {errorMessage}
              </div>
            )}
            <form className="space-y-4 md:space-y-6" onSubmit={submitLogin}>
              <div>
                <label
                  // for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  ref={emailInput}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required={true}
                />
              </div>
              <div>
                <label
                  // for="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  ref={passwordInput}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                />
              </div>

              {fetching ? (
                <>
                  <br />
                  Loading ...
                </>
              ) : (
                <button
                  type="submit"
                  style={{ background: "red" }}
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Login
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
    // </main>
  );
}
