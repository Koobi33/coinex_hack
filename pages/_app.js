import "../styles/globals.css";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";

function getLibrary(provider, connector) {
  const myProvider =
    Web3.givenProvider ||
    new Web3.providers.HttpProvider("https://testnet.aurora.dev");
  return new Web3(myProvider); // this will vary according to whether you use e.g. ethers or web3.js
}

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  );
}

export default MyApp;
