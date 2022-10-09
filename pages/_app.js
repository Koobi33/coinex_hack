import "../styles/globals.css";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import DefaultLayout from "../components/defaultLayout/defaultLayout";

function getLibrary(provider, connector) {
  const myProvider =
    Web3.givenProvider ||
    new Web3.providers.HttpProvider("https://testnet.aurora.dev");
  // new Web3.providers.HttpProvider("https://testnet-rpc.coinex.net");
  return new Web3(myProvider); // this will vary according to whether you use e.g. ethers or web3.js
}

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </Web3ReactProvider>
  );
}

export default MyApp;
