import styles from './defaultLayout.module.scss';
import Header from '../header/header';
import Head from 'next/head';

const DefaultLayout = ({ children }) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Project 21</title>
            </Head>
            <Header />
            {children}
        </div>
    );
};

export default DefaultLayout;
