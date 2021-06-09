import React from "react";
import Head from "next/head";

import { Container } from "reactstrap";

const Layout = (props) => {
  const title = "God's Food";

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap"
          rel="stylesheet"
        />

        <script src="https://js.stripe.com/v3" />

        <script
          type="text/javascript"
          src="https://platform.linkedin.com/badges/js/profile.js"
        ></script>
      </Head>

      <Container>{props.children}</Container>
    </div>
  );
};

export default Layout;
