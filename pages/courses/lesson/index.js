import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../course-page.module.scss";
import Link from "next/link";
import Image from "next/image";
import backBtn from "../../../public/arrow_back.svg";
import cx from "class-names";
import { notification } from "antd";
import flame from "../../../public/flame.svg";
import arrowDown from "../../../public/arrow_down.svg";
import reward from "../../../public/Reward.png";
import coin from "../../../public/icon_coin.svg";
import { courses } from "../../../constants";
import flash from "../../../public/icon_flash.svg";
import play from "../../../public/play.svg";
import nextLess from "../../../public/chevron.right.svg";
import { FlameIcon, PointIcon } from "../[slug]";
import { Radio, Space } from "antd";
import JSONInput from "react-json-editor-ajrm/index";
import locale from "react-json-editor-ajrm/locale/en";

const LessonPage = function () {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();
  const [isLoading, setLoading] = useState(false);
  const [currCourse, setCurrCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [answer, setAnswer] = useState(null);

  const router = useRouter();
  const lessonID = router.query.lessonID;
  const courseID = router.query.courseID;

  useEffect(() => {
    // load current course
    if (account) {
      setLoading(true);
      fetch(`http://45.91.8.175:3000/api/courses/${router.query.courseID}`)
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (data) {
            // если все уроки пройдены перенаправить на экзамен
            if (Number(lessonID) > data.lessons[data.lessons.length - 1].id) {
              router.push(`/courses/exam?courseID=${courseID}`);
            }
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
  }, [account, lessonID]);

  const submitLesson = () => {
    setLoading(true);
    // submit lesson
    fetch(
      `http://45.91.8.175:3000/api/users/${account}/${courseID}/${
        Number(lessonID) + 1
      }`,
      {
        method: "PUT",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        notification.open({
          message: "Congratulations!",
          description: `You have earned ${currCourse.lessons[lessonID].reward} coins!`,
        });
        // перенаправить на следующий
        router.push(
          `/courses/lesson?courseID=${router.query.courseID}&lessonID=${
            Number(lessonID) + 1
          }`
        );
      });
  };

  useEffect(() => {
    const find = currCourse?.lessons.find(
      (lesson) => lesson.id == Number(lessonID)
    );
    if (find) {
      setActiveLesson(find);
      setAnswer(false);
    }
  }, [currCourse, lessonID]);
  console.log(currCourse && currCourse.lessons[lessonID].question);

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
                    [styles.point]: item.id === activeLesson?.id,
                  })}
                >
                  <PointIcon />
                </span>
              </div>
              <p
                className={cx({
                  [styles.info_desc]: true,
                  [styles.active_desc]: item.id === activeLesson?.id,
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
              <p className={styles.info_title}>{activeLesson?.title}</p>
              <p className={styles.info_desc}>{activeLesson?.description}</p>
              <div className={styles.subject_btn}>
                <Image src={arrowDown} width={8} height={9} />
                <p className={styles.info_desc}>Subject.pdf</p>
              </div>
              <div className={styles.video_container}>
                <Image src={play} />
              </div>
              <p className={styles.info_title}>
                {currCourse &&
                  currCourse.lessons[lessonID].question &&
                  currCourse.lessons[lessonID].question.title}
              </p>
              <div
                className={cx({
                  [styles.answer_container]: true,
                  [styles.opacity]: answer,
                })}
              >
                <Radio.Group
                  onChange={(e) => {
                    console.log("radio checked", e.target.value);
                  }}
                >
                  <Space direction="vertical">
                    {currCourse &&
                      currCourse.lessons[lessonID].question &&
                      (() => {
                        var str = currCourse.lessons[lessonID].question.answers;
                        var replace = str
                          .replace(/[\[\]]/g, "")
                          .replace(/[\']/g, "");
                        var array = replace.split(",");
                        return array.map((item, index) => (
                          <Radio value={index}>{item}</Radio>
                        ));
                      })()}
                  </Space>
                </Radio.Group>
              </div>
            </>
            {answer && (
              <div className={styles.next_container}>
                <p className={styles.congrats}>
                  Congratulations! This is the correct answer!
                </p>
                <button
                  disabled={isLoading}
                  className={styles.next_btn}
                  onClick={submitLesson}
                >
                  <Image src={nextLess} />
                  Next lesson
                </button>
              </div>
            )}
            {!answer && (
              <div
                className={cx(styles.subject_btn, styles.send_btn)}
                onClick={() => setAnswer(true)}
              >
                Give an answer
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
