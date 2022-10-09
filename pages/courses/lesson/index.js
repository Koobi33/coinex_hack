import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../course-page.module.scss";
import Link from "next/link";
import Image from "next/image";
import backBtn from "../../../public/arrow_back.svg";
import cx from "class-names";
import {Rate} from "antd";
import flame from "../../../public/flame.svg";
import arrowDown from "../../../public/arrow_down.svg";
import reward from "../../../public/Reward.png";
import coin from "../../../public/icon_coin.svg";
import {courses} from "../../../constants";
import flash from "../../../public/icon_flash.svg";
import play from "../../../public/play.svg";
import nextLess from "../../../public/chevron.right.svg";
import {FlameIcon, PointIcon} from "../[slug]";
import { Radio, Space} from 'antd';
import JSONInput from "react-json-editor-ajrm/index";
import locale from "react-json-editor-ajrm/locale/en";

const LessonPage = function () {
  const {active, account, library, connector, activate, deactivate} =
      useWeb3React();
  const [isLoading, setLoading] = useState(false);
  const [currCourse, setCurrCourse] = useState(null);
  const [submissionData, setSubmissionData] = useState("submission test data");
  const [activeLesson, setActiveLesson] = useState(null);
  const [answer, setAnswer] = useState(null);

  const router = useRouter();
  const lessonID = router.query.lessonID;

  useEffect(() => {
    // load current course
    if (account) {
      setLoading(true);
      fetch(`http://localhost:3000/api/courses/${router.query.courseID}`)
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              // если все уроки пройдены перенаправить на экзамен
              if (Number(lessonID) > data.lessons[data.lessons.length - 1].id) {
                router.push(`/courses/exam?courseID=${router.query.courseID}`);
              }
              setCurrCourse(data);
            }
          });
    }
  }, [account, lessonID]);

  const submitLesson = () => {
    setAnswer(false);
    // submit lesson
    fetch(
        `http://localhost:3000/api/users/${account}/${router.query.courseID}/${
            Number(router.query.lessonID) + 1
        }`,
        {
          method: "PUT",
        }
    )
        .then((res) => res.json())
        .then((data) => {
          // перенаправить на следующий
          router.push(
              `/courses/lesson?courseID=${router.query.courseID}&lessonID=${
                  Number(router.query.lessonID) + 1
              }`
          );
        });
  };

  useEffect(() => {
    const find = currCourse?.lessons.find(lesson => lesson.id == Number(router.query.lessonID));
    if (find) {
      setActiveLesson(find);
    }
  }, [currCourse, router.query.lessonID])
  return (
      <div className={styles.container}>
        <Link href="/">
          <a className={styles.back_btn}>
            <Image src={backBtn}/>
            <p>Back to Courses</p>
          </a>
        </Link>
        <div className={styles.title_container}>
          <p className={styles.title}>{currCourse?.title}</p>
          <div
              className={cx(styles.register, styles.registered)}
          >
            Registered
          </div>
        </div>
        <div className={styles.action_container}>
          <div className={styles.rating_container}>
            <>
              <p className={styles.rate}>Rate this course</p>
              <Rate defaultValue={3} character={({index}) => <FlameIcon/>}/>
            </>
          </div>
        </div>
        <div className={styles.content_container}>
          <div className={cx(styles.info_container, styles.program)}>
            <p className={styles.info_title}>
              Program
            </p>
            {currCourse?.lessons.map((item, index) => (
                <div key={item.id} className={styles.lesson_container}>
                  <div className={styles.point_container}>
                      <span className={cx({
                        [styles.active_point]: true,
                        [styles.point]: item.id === activeLesson?.id,
                      })}><PointIcon/></span>
                  </div>
                  <p className={cx({
                    [styles.info_desc]: true,
                    [styles.active_desc]: item.id === activeLesson?.id
                  })}>{item.title}</p>
                </div>
            ))}
          </div>
          <div className={styles.part}>
            <div className={styles.info_container}>
              {activeLesson?.id !== currCourse?.lessons?.length - 1
                  ? (<>
                    <p className={styles.info_title}>{activeLesson?.title}</p>
                    <p className={styles.info_desc}>{activeLesson?.description}</p>
                    <div className={styles.subject_btn}>
                      <Image src={arrowDown} width={8} height={9}/>
                      <p className={styles.info_desc}>Subject.pdf</p>
                    </div>
                    <div className={styles.video_container}>
                      <Image src={play}/>
                    </div>
                    <p className={styles.info_title}>Which of these adds richness and visual interest to all types of
                      design?</p>
                    <div className={cx({[styles.answer_container]: true, [styles.opacity]: answer})}>
                      <Radio.Group onChange={(e) => {
                        console.log('radio checked', e.target.value);
                      }}>
                        <Space direction="vertical">
                          <Radio value={1}>Economy of line</Radio>
                          <Radio value={2}>Typography</Radio>
                          <Radio value={3}>Pattern</Radio>
                          <Radio value={4}>Pixels</Radio>
                        </Space>
                      </Radio.Group>
                    </div>
                  </>)
                  : <>
                    <p className={styles.info_title}>{activeLesson?.title}</p>
                    <p className={styles.info_desc}>{activeLesson?.description}</p>
                    <JSONInput
                        id='json_input'
                        placeholder={null}
                        locale={locale}
                        height='516px'
                        width='100%'
                        colors={{
                          background: '#100F0F'
                        }}
                        onChange={(val) => {
                          if (val.jsObject) {
                            console.log(val.jsObject);
                          }
                        }}
                    />
                  </>
              }
              {answer && <div className={styles.next_container}>
                <p className={styles.congrats}>Congratulations! This is the correct answer!</p>
                <div className={styles.next_btn}
                     onClick={submitLesson}>
                  <Image src={nextLess}/>
                  Next lesson
                </div>
              </div>}
              {!answer && <div className={cx(styles.subject_btn, styles.send_btn)}
                               onClick={() => setAnswer(true)}>
                Give an answer
              </div>}
            </div>
          </div>


        </div>
      </div>
  );
};

export default LessonPage;
