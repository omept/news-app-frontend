"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import { useEffect, useReducer, useState } from "react";
import { AuthContext, AuthDispatchContext } from "./_contexts/authContext";
import { authReducer } from "./_reducers/authReducer";
import { MetaContext } from "./_contexts/metaContext";
import { metaReducer } from "./_reducers/metaReducer";
import axios from "axios";
import { isObject, log } from "./_appBackendApi/appBackendApi";
import { FeedsContext, FeedsDispatchContext } from "./_contexts/feedsContext";
import { feedsReducer } from "./_reducers/feedsReducer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NewsFeed App",
  description: "By georgetheprogrammer@gmail.com",
};
export default function RootLayout({ children }) {
  const token = localStorage.getItem("token");
  const metaData = localStorage.getItem("meta");
  let defaultAuthState = { user: {}, token: token ?? "" };
  let defaultMetaState = isObject(metaData)
    ? metaData
    : {
        providers: [],
        categories: [],
        countries: [],
      };
  let defaultFeedsState = {
    category: {
      name: "Business",
    },
    country: {
      name: "Germany",
    },
    search: "",
    items: [],
  };
  const [authState, dispatch] = useReducer(authReducer, defaultAuthState);
  const [metaState, dispatchMeta] = useReducer(metaReducer, defaultMetaState);
  const [feedsState, dispatchFeeds] = useReducer(
    feedsReducer,
    defaultFeedsState
  );
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API;

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const response = await axios.get(`${baseUrl}/feeds/meta`);
        dispatchMeta({ type: "changed", payload: response.data.data.meta });
      } catch (error) {
        alert(error);
      }
    };

    fetchMeta();
  }, []);

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const response = await axios.get(`${baseUrl}/feeds`);
        dispatchFeeds({ type: "changed", payload: response.data.data.feeds });
      } catch (error) {
        alert(error);
      }
    };

    fetchFeeds();
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext.Provider value={authState}>
          <AuthDispatchContext.Provider value={dispatch}>
            <MetaContext.Provider value={metaState}>
              <FeedsContext.Provider value={feedsState}>
                <FeedsDispatchContext.Provider value={dispatchFeeds}>
                  <Header />
                  {children}
                </FeedsDispatchContext.Provider>
              </FeedsContext.Provider>
            </MetaContext.Provider>
          </AuthDispatchContext.Provider>
        </AuthContext.Provider>
      </body>
    </html>
  );
}
