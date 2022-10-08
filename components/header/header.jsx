import styles from './Header.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cx from 'class-names';

export default function MenuAppBar() {
    const { pathname } = useRouter();

    return (
        <div className={styles.container}>
            <p>Logo</p>
            <div className={styles.right_part}>
                <div className={styles.menu}>
                    <Link href="/profile">
                        <a className={cx({[styles.link]: true, [styles.active_link]: pathname.includes('/profile') })}>Profile</a>
                    </Link>
                    <Link href="/courses/1">
                        <a className={cx({[styles.link]: true, [styles.active_link]: pathname.includes('/courses') })}>Courses</a>
                    </Link>
                    <Link href="/settings" className={styles.active_link}>
                        <a className={cx({[styles.link]: true, [styles.active_link]: pathname.includes('/settings') })}>Settings</a>
                    </Link>
                </div>
                <div className={styles.logout}>Log out</div>
            </div>
        </div>
    );
}
