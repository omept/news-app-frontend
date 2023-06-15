"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext, AuthDispatchContext } from "../_contexts/authContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import { log, ucwords } from "../_appBackendApi/appBackendApi";
import { MetaContext } from "../_contexts/metaContext";

export default function Settings() {
  const authState = useContext(AuthContext);
  const authDispatch = useContext(AuthDispatchContext);
  const metaState = useContext(MetaContext);
  const prevAuthState = useRef(authState);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [fetching, setFetching] = useState(false);
  const router = useRouter();
  const newsProviders = [...metaState.providers];
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API;
  const email = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (authState.token == "") {
      router.push("/");
    }
    if (prevAuthState.current !== authState) {
      // Perform any other actions based on the updated context value
      if (!authState.ok) {
        setErrorMessage(() => authState.message);
        setFetching(() => false);
      }
    }
    // Update the previous value to track changes in the future
    prevAuthState.current = authState;
  }, [authState]);

  function handleProviderChange(event) {
    const providerKey = event.target.value;
    setSelectedProvider(() => providerKey);
  }

  async function submitSettings(event) {
    event.preventDefault();
    setFetching(() => true);
    setErrorMessage(() => "");

    // log(selectedProvider);
    // return;
    let ok = true;
    let message = "";
    let user = {};
    const res = await axios
      .post(
        `${baseUrl}/auth/user/settings`,
        {
          provider: selectedProvider,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((err) => {
        message = err;
        setErrorMessage(() => "Error: " + err);
        ok = false;
      });

    if (res && res.data && res.data.data) {
      user = res.data.data.user;
    }

    authDispatch({
      type: "settings_update",
      payload: {
        message,
        user: { ...user, user_provider: selectedProvider },
        token: token,
        ok,
      },
    });
    setSelectedProvider(() => selectedProvider);
    setFetching(() => false);
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
              Settings
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
            <form className="space-y-4 md:space-y-6" onSubmit={submitSettings}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Update provider from{" "}
                  <code>{authState.user.user_provider}</code> for{" "}
                  <code>{email}</code>
                </label>
              </div>
              <div>
                <div className="relative mb-4 flex flex-wrap item-center ">
                  <label className="pt-2 font-bold">News Provider: </label>
                  <br />
                  <br />
                  <select
                    className="w-80"
                    value={ucwords(selectedProvider)}
                    onChange={handleProviderChange}
                  >
                    {newsProviders.map((item, index) => (
                      <option key={index} value={ucwords(item.key)}>
                        {ucwords(item.name)}
                      </option>
                    ))}
                  </select>
                </div>
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
                  Update
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
