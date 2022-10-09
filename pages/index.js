import styles from "../styles/Home.module.css";
import {courses} from "../constants/index";
import Image from "next/image";
import flame from "../public/flame.svg";
import cx from 'class-names';
import Link from 'next/link';

export default function Home() {

  return (
    <div className={styles.container}>
      <p className={styles.page_title}>Courses</p>
      <div className={styles.courses_container}>
        {courses?.map(course => (
            <Link href="/courses/1">
              <a className={styles.course_container} key={course.id}>
                <div className={styles.rating_container}>
                    <Image src={flame}/>
                    <p className={styles.rating}>4.9</p>
                    <p className={styles.rating_count}>1 371 ratings</p>
                </div>
                <div className={styles.course_title_container}><p className={styles.course_title}>{course.title}</p></div>
                <div className={cx(styles.course_title_container, styles.course_desc_container)}>
                  <p className={styles.course_desc}>{course.description}</p>
                </div>
                <div className={styles.info_container}>
                  <p className={styles.info}>{course.grade}</p>
                  <p className={styles.info}>{course.duration}</p>
                </div>
              </a>
            </Link>
        ))}
      </div>
    </div>
  );
}
