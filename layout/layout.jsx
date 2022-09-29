import Head from "next/head";
import React from "react";
import Login from "../pages/login";

function Layout({ children }) {
  const isLogin = true;

  if (!isLogin)
    return (
      <div>
        <Head>
          <title>{"next-app"}</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <main>
          <Login />
        </main>
      </div>
    );

  return (
    <div>
      <Head>
        <title>{"next-app"}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
