import { useWeb3React } from "@web3-react/core";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import styles from "../course-page.module.scss";
import Link from "next/link";
import Image from "next/image";
import backBtn from "../../../public/arrow_back.svg";
import cx from "class-names";
import { PointIcon } from "../[slug]";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import nextLess from "../../../public/chevron.right.svg";
import ReactConfetti from "react-confetti";
import { notification } from "antd";

const ExamPage = function () {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();
  const [isLoading, setLoading] = useState(false);
  const [currCourse, setCurrCourse] = useState(null);
  const [submissionData, setSubmissionData] = useState({ test: "test" });
  const [isCelebrate, setCelebrate] = useState(false);

  const jsonInputRef = useRef(null);

  const router = useRouter();
  const courseID = router.query;

  useEffect(() => {
    // load current course
    if (account) {
      setLoading(true);
      fetch(`http://45.91.8.175:3000/api/courses/${courseID}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            const myData = {
              ...data,
              lessons: [
                ...data.lessons,
                {
                  id: data.lessons.length,
                  title: "Final exam",
                  description:
                    "Write ERC20 like contract for CoinEx Smart Chain",
                },
              ],
            };
            setCurrCourse(myData);
          }
        });
    }
  }, [account, courseID]);

  const submitExam = () => {
    fetch(`http://45.91.8.175:3000/api/users/${account}/${courseID}/submit`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        submission: submissionData,
      }),
    }).then(() => {
      setTimeout(() => {
        notification.open({
          message: "Congratulations!",
          description: `You have submitted your project! Wait for other peers to check it!`,
        });
        setCelebrate(true);
      }, 1000);
    });
  };

  return (
    <div className={styles.container}>
      <Link href="/">
        <a className={styles.back_btn}>
          <Image src={backBtn} />
          <p>Back to Courses</p>
        </a>
      </Link>
      <div className={styles.title_container}>
        <p className={styles.title}>{currCourse?.title}</p>
        <div className={cx(styles.register, styles.registered)}>Registered</div>
      </div>
      {/*<div className={styles.action_container}>*/}
      {/*  <div className={styles.rating_container}>*/}
      {/*    <>*/}
      {/*      <p className={styles.rate}>Rate this course</p>*/}
      {/*      <Rate defaultValue={3} character={({ index }) => <FlameIcon />} />*/}
      {/*    </>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div className={styles.content_container}>
        <div className={cx(styles.info_container, styles.program)}>
          <p className={styles.info_title}>Program</p>
          {currCourse?.lessons.map((item, index) => (
            <div key={item.id} className={styles.lesson_container}>
              <div className={styles.point_container}>
                <span
                  className={cx({
                    [styles.active_point]: true,
                    [styles.point]: item.id === currCourse.lessons.length - 1,
                  })}
                >
                  <PointIcon />
                </span>
              </div>
              <p
                className={cx({
                  [styles.info_desc]: true,
                  [styles.active_desc]:
                    item.id === currCourse.lessons.length - 1,
                })}
              >
                {item.title}
              </p>
            </div>
          ))}
        </div>
        <div className={styles.part}>
          <div className={styles.info_container}>
            <>
              <p className={styles.info_title}>
                {currCourse?.lessons[currCourse.lessons.length - 1].title}
              </p>
              <p className={styles.info_desc}>
                {currCourse?.lessons[currCourse.lessons.length - 1].description}
              </p>
              <JSONInput
                placeholder={submissionData}
                ref={jsonInputRef}
                id="json_input"
                locale={locale}
                height="516px"
                width="100%"
                confirmGood={false}
                style={{
                  warningBox: {
                    opacity: 0,
                  },
                  errorMessage: {
                    opacity: 0,
                  },
                }}
                onBlur={(obj) => {
                  console.log(obj);
                  if (obj.jsObject) {
                    setSubmissionData(obj.jsObject);
                  }
                }}
              />
            </>
            <button className={styles.next_btn} onClick={submitExam}>
              <Image src={nextLess} />
              submit exam
            </button>
          </div>
        </div>
      </div>
      {isCelebrate && <ReactConfetti />}
    </div>
  );
};

export default ExamPage;
