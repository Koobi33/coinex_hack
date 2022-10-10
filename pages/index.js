import styles from "../styles/Home.module.css";
import Image from "next/image";
import flame from "../public/flame.svg";
import cx from "class-names";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";

export default function Home() {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  const [courses, setCourses] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    // load list of available courses
    if (account) {
      setLoading(true);
      fetch(`http://localhost:3000/api/courses`)
        .then((res) => res.json())
        .then((list) => {
          if (list) {
            setCourses(list);
            setLoading(false);
          }
        });
    }
  }, [account]);

  return (
    <div className={styles.container}>
      <p className={styles.page_title}>Courses</p>
      {isLoading && <div className={styles.loading}>loading...</div>}
      {!account && <div className={styles.loading}>Please log in</div>}
      {!isLoading && account && (
        <div className={styles.courses_container}>
          {courses?.map((course) => (
            <Link href={`/courses/${course.id}`} key={course.id}>
              <a className={styles.course_container}>
                <div className={styles.rating_container}>
                  <Image src={flame} />
                  <p className={styles.rating}>4.9</p>
                  <p className={styles.rating_count}>1 371 ratings</p>
                </div>
                <div className={styles.course_title_container}>
                  <p className={styles.course_title}>{course.title}</p>
                </div>
                <div
                  className={cx(
                    styles.course_title_container,
                    styles.course_desc_container
                  )}
                >
                  <p className={styles.course_desc}>{course.description}</p>
                </div>
                <div className={styles.info_container}>
                  <p className={styles.info}>Beginner</p>
                  <p className={styles.info}>1-2 hours</p>
                </div>
              </a>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
