import styles from "../styles/Home.module.css";
import { useWeb3React } from "@web3-react/core";
import { CONTRACT_ABI, CONTRACT_ADDRESS, injected } from "../constants";
import { useEffect } from "react";
import { AuthClient } from "../client";

export default function Home() {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }

  useEffect(() => {
    if (active && account && library) {
      signNonce().then((res) => {});
    }
    async function signNonce() {
      const nonce = await AuthClient.getNonce(account);

      const message = library.utils.sha3(`${nonce}`);
      const signature = await library.eth.personal.sign(
        message,
        account,
        account
      );

      const token = await AuthClient.signSignature(account, signature);
      localStorage.setItem("token", token.token);
    }
  }, [active, account]);

  async function disconnect() {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }

  async function callContract() {
    const myContract = new library.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    const res1 = await myContract.methods.getCoursesLength().call();
    console.log(res1);
    const test = await myContract.methods
      .feelCourseList()
      .send({ from: account });
    console.log(test);

    const res = await myContract.methods.getCoursesLength().call();
    console.log(res);
  }

  return (
    <div className={styles.container}>
      {account} - {active}
      <button
        onClick={() => {
          if (account && active) {
            disconnect();
          } else {
            connect();
          }
        }}
      >
        {active ? "Disconnect" : "Connect"}
      </button>
      <button onClick={callContract}>Call contract</button>
    </div>
  );
}
