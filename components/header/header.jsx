import styles from './Header.module.scss';
import { useRouter } from 'next/router';
import logo from '../../public/logo.svg';
import Image from 'next/image';
import logout from '../../public/power.svg';
import React, { useEffect } from "react";
import Link from "next/link";
import cx from "class-names";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../constants";
import { AuthClient } from "../../client";

export default function MenuAppBar() {
  const { pathname } = useRouter();
    const { active, account, library, connector, activate, deactivate } =
        useWeb3React();

    async function connect() {
        try {
            await activate(injected);
        } catch (ex) {
            console.log(ex);
        }
    }
    async function disconnect() {
        try {
            deactivate();
        } catch (ex) {
            console.log(ex);
        }
    }

    useEffect(() => {
        console.log({ active, account, library });
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
    }, [active, account, library]);

    const handleLogin = () => {
        if (account && active) {
            disconnect();
        } else {
            connect();
        }
    };

    return (
        <div className={styles.container}>
            <Link href="/"><a><Image src={logo}/></a></Link>
            <div className={styles.right_part}>
                <div className={styles.menu}>
                    <Link href="/profile">
                        <a className={cx({[styles.link]: true, [styles.active_link]: pathname.includes('/profile') })}>Profile</a>
                    </Link>
                    <Link href="/">
                        <a className={cx({[styles.link]: true, [styles.active_link]: pathname.includes('/courses') || pathname === '/' })}>Courses</a>
                    </Link>
                    <Link href="/settings" className={styles.active_link}>
                        <a className={cx({[styles.link]: true, [styles.active_link]: pathname.includes('/settings') })}>Settings</a>
                    </Link>
                </div>
                <div onClick={handleLogin} className={styles.logout}>
                    <Image src={logout} />
                    {active ? "Log out" : "Log in"}
                </div>
            </div>
        </div>
    );
}
