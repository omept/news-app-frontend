import { useContext, useEffect, useRef, useState } from "react";
import "tw-elements/dist/css/tw-elements.min.css";
import { AuthContext, AuthDispatchContext } from "../_contexts/authContext";
import Link from "next/link";
import { log } from "../_appBackendApi/appBackendApi";
import { useRouter } from "next/navigation";
export default function Header() {
  const router = useRouter();
  const authState = useContext(AuthContext);
  const authDispatch = useContext(AuthDispatchContext);
  const prevAuthState = useRef(authState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (prevAuthState.current !== authState) {
      // Perform any other actions based on the updated context value
      log("Auth context changed");
    }
    // Update the previous value to track changes in the future
    prevAuthState.current = authState;
  }, [authState]);

  function logoutUser(event) {
    event.preventDefault();
    authDispatch({
      type: "logout",
      payload: { user: {}, token: "" },
    });
    setLoading(() => !loading);
  }

  return (
    <nav
      className="flex-no-wrap relative flex w-full items-center justify-between bg-neutral-100 py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4"
      data-te-navbar-ref
    >
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        <button
          className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
          type="button"
          data-te-collapse-init
          data-te-target="#navbarSupportedContent1"
          aria-controls="navbarSupportedContent1"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => router.push("/")}
        >
          <span className="[&>svg]:w-7">
            <h1 className="font-bold ">NewsFeed App</h1>
          </span>
        </button>

        <div
          className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
          id="navbarSupportedContent1"
          data-te-collapse-item
        >
          <Link
            className="mb-4 mr-2 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0"
            href="/"
          >
            <h1 className="font-bold ">NewsFeed App</h1>
          </Link>
        </div>

        <div className="relative flex items-center">
          {authState.token == "" ? (
            <>
              <div className="relative">
                <Link
                  className="hidden-arrow mr-4 flex items-center text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                  href="/login"
                  id="dropdownMenuButton1"
                  role="button"
                  data-te-dropdown-toggle-ref
                  aria-expanded="false"
                >
                  Login
                </Link>
              </div>
              <div className="relative">
                <Link
                  className="hidden-arrow mr-4 flex items-center text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                  href="/sign-up"
                  id="dropdownMenuButton1"
                  role="button"
                  data-te-dropdown-toggle-ref
                  aria-expanded="false"
                >
                  Sign up
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="relative">
                <button
                  className="hidden-arrow mr-4 flex items-center text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                  onClick={logoutUser}
                  id="dropdownMenuButton1"
                  role="button"
                  data-te-dropdown-toggle-ref
                  aria-expanded="false"
                >
                  Logout
                </button>
              </div>
              <div className="relative">
                <Link
                  className="hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
                  href="/settings"
                  id="dropdownMenuButton2"
                  role="button"
                  data-te-dropdown-toggle-ref
                  aria-expanded="false"
                >
                  Settings
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
