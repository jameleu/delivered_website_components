import "../styles/globals.css";
import { MantineProvider } from "@mantine/core";
import { Footer, HeaderSearch } from "../components";
import Nav from "../components/navbar";
import Loading from "../components/loading"
import Head from "next/head";
import { useState, useEffect } from "react";

const links = [{ link: "string", label: "home" }];

function MyApp({ Component, pageProps }) {
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // setTimeout(() => setLoading(false), 10000);
    setLoading(false);
  }, []);

  return (
<>
    {loading? <Loading/> : <MantineProvider
    withGlobalStyles
    withNormalizeCSS
    theme={{
      /** Put your mantine theme override here */
      colorScheme: "dark",
      fontFamily: "Poppins",
    }}
    style={{
      width: "100vw",
      position: "relative",
      overflowX: "hidden",
    }}
  >
    <Head>
      <title>Michigan RoboSub</title>
      </Head>
    <Nav />
    <Component {...pageProps} />
    <Footer />
    
  </MantineProvider>}
  </>
  );
}

export default MyApp;
