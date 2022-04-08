import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      {/*@ts-ignore*/}
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
