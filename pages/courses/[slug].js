import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./course-page.module.scss";
import cx from "class-names";
import { useWeb3React } from "@web3-react/core";
import { courses } from "../../constants";
import { Rate } from "antd";
import Image from "next/image";
import backBtn from "../../public/arrow_back.svg";
import Link from "next/link";
import flame from "../../public/flame.svg";
import reward from "../../public/Reward.png";
import coin from "../../public/icon_coin.svg";
import flash from "../../public/icon_flash.svg";
import arrowDown from "../../public/arrow_down.svg";
import Icon from "@ant-design/icons";
import play from "../../public/play.svg";
import nextLess from "../../public/chevron.right.svg";

const FlameSvg = () => (
  <svg
    width="16"
    height="20"
    viewBox="0 0 16 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.56934 19.4873C12.2979 19.4873 15.4619 16.2969 15.4619 11.498C15.4619 3.55273 8.66797 0.230469 3.97461 0.230469C3.07812 0.230469 2.48926 0.564453 2.48926 1.20605C2.48926 1.45215 2.60352 1.71582 2.79688 1.94434C3.87793 3.24512 4.88867 4.66895 4.89746 6.35645C4.89746 6.53223 4.88867 6.69043 4.85352 6.86621C4.33496 5.78516 3.47363 5.15234 2.69141 5.15234C2.27832 5.15234 1.99707 5.44238 1.99707 5.89941C1.99707 6.16309 2.05859 6.65527 2.05859 7.08594C2.05859 9.09863 0.529297 10.1445 0.529297 13.3789C0.529297 17.0439 3.33301 19.4873 7.56934 19.4873ZM7.66602 18.0107C4.28223 18.0107 2.01465 16.1475 2.01465 13.3789C2.01465 10.6016 3.52637 9.71387 3.51758 7.22656C3.51758 7.15625 3.51758 7.09473 3.50879 7.02441C3.97461 7.54297 4.30859 8.26367 4.51074 9.16895C4.55469 9.41504 4.68652 9.5293 4.87988 9.5293C5.67969 9.5293 6.21582 7.70996 6.21582 6.45312C6.21582 4.67773 5.53906 2.95508 4.41406 1.67188C10.2061 2.14648 13.915 6.13672 13.915 11.4453C13.915 15.374 11.4102 18.0107 7.66602 18.0107ZM7.78906 16.7803C9.81934 16.7803 10.8564 15.3125 10.8564 13.5723C10.8564 11.8232 9.85449 9.95996 7.96484 9.08984C7.85938 9.0459 7.77148 9.10742 7.79785 9.23047C7.94727 10.5928 7.78027 11.8496 7.32324 12.5264C7.12109 11.999 6.86621 11.5596 6.47949 11.2168C6.3916 11.1377 6.30371 11.1816 6.29492 11.2871C6.1543 12.3242 5.09082 12.8428 5.09082 14.3545C5.09082 15.8047 6.16309 16.7803 7.78906 16.7803Z"
      fill="currentColor"
    />
  </svg>
);
const PointSvg = () => (
  <svg
    width="16"
    height="21"
    viewBox="0 0 16 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.20801 7.12988C2.20801 9.00195 3.35059 10.3027 5.53027 10.874L9.95996 12.0781C11.3662 12.4648 12.0869 13.1943 12.0869 14.2139V14.5566C10.8477 14.917 9.94238 16.0684 9.94238 17.4219C9.94238 19.0654 11.2871 20.4014 12.9395 20.4014C14.583 20.4014 15.9189 19.0654 15.9189 17.4219C15.9189 16.0684 15.0137 14.917 13.7832 14.5566V14.2139C13.7832 12.3418 12.6406 11.0498 10.4609 10.4697L6.02246 9.26562C4.63379 8.8877 3.9043 8.14941 3.9043 7.12988V6.78711C5.14355 6.42676 6.04004 5.28418 6.04004 3.92188C6.04004 2.27832 4.7041 0.942383 3.05176 0.942383C1.4082 0.942383 0.0722656 2.27832 0.0722656 3.92188C0.0722656 5.28418 0.977539 6.42676 2.20801 6.78711V7.12988Z"
      fill="currentColor"
    />
  </svg>
);

export const FlameIcon = (props) => <Icon component={FlameSvg} {...props} />;
export const PointIcon = (props) => <Icon component={PointSvg} {...props} />;

const CoursePage = function () {
  const router = useRouter();

  const { active, account, library, connector, activate, deactivate, error } =
    useWeb3React();
  const { slug } = router.query;
  const [currCourse, setCurrCourse] = useState(null);
  const [isRegister, setIsRegister] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [activeLesson, setActiveLesson] = useState(null);

  useEffect(() => {
    // load current course
    if (account) {
      setLoading(true);
      fetch(`http://45.91.8.175:3000/api/courses/${slug}`)
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
        })
        .then(() => {
          // check проходит ли пользователь текущий курс
          fetch(`http://45.91.8.175:3000/api/users/${account}`)
            .then((res) => res.json())
            .then((data) => {
              if (data) {
                setUserData(data);
                if (
                  typeof data.startedCourses !== "string" &&
                  data.startedCourses[slug]
                ) {
                  setIsRegister(true);
                }
              }
            });
          setLoading(false);
        });
    }
  }, [account, slug]);

  const handleRegistration = async () => {
    if (account && !isRegister) {
      const res = await fetch(
        `http://45.91.8.175:3000/api/users/${account}/${slug}/registration`,
        {
          method: "POST",
        }
      );
      const regData = await res.json();
      setIsRegister(true);
      setActiveLesson(currCourse?.lessons[0]);
      router.push(
        `/courses/lesson?courseID=${slug}&lessonID=${regData.startedCourses[slug].currentLesson}`
      );
    }
    if (account && userData && isRegister) {
      router.push(
        `/courses/lesson?courseID=${slug}&lessonID=${userData.startedCourses[slug].currentLesson}`
      );
    }
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
        <div
          onClick={handleRegistration}
          className={cx({
            [styles.register]: true,
            [styles.registered]: isRegister,
          })}
        >
          {isRegister ? "Continue" : "Register for free"}
        </div>
      </div>
      <div className={styles.action_container}>
        <div className={styles.rating_container}>
          <Image src={flame} />
          <p className={styles.rating}>4.9</p>
          <p className={styles.rating_count}>1 371 ratings</p>
        </div>
      </div>
      <div className={styles.content_container}>
        <div className={styles.part}>
          <div className={styles.info_container}>
            <p className={styles.info_title}>Description</p>
            <p className={styles.info_desc}>{currCourse?.description}</p>
          </div>
          <div className={styles.info_container}>
            <p className={styles.info_title}>What will you learn</p>
            {currCourse?.lessons.map((item, index) => (
              <div key={item.id} className={styles.lesson_container}>
                <div className={styles.point_container}>
                  <span className={styles.point}>
                    <PointIcon />
                  </span>
                </div>
                <p className={styles.info_desc}>{item.title}</p>
              </div>
            ))}
          </div>
          <div className={styles.info_container}>
            <p className={styles.info_title}>About specialization</p>
            <p className={styles.info_desc}>
              {currCourse?.specializationDescription}
            </p>
          </div>
        </div>
        <div className={styles.part}>
          <div className={styles.right_part_container}>
            <p className={styles.info_title}>Reward</p>
            <div className={styles.reward_container}>
              <Image src={reward} />
              <p className={styles.coin_text}>{`+ ${
                currCourse?.reward?.tokens || 0
              }`}</p>
              <Image src={coin} width={27} height={27} />
            </div>
          </div>

          <div className={styles.right_part_container}>
            <p className={styles.info_title}>How to pass</p>
            {[
              {
                id: 0,
                text: "Watch all lessons",
              },
              {
                id: 1,
                text: "80% success of Final project",
              },
            ].map((item) => (
              <div key={item.id} className={styles.to_pass_container}>
                <Image src={flash} height={28} width={28} />
                <p className={styles.info_desc}>{item.text}</p>
              </div>
            ))}
          </div>

          <div className={styles.right_part_container}>
            <p className={styles.info_title}>Skills will you gain</p>
            <div className={styles.tag_container}>
              {currCourse?.skills.map((item) => (
                <div key={item} className={styles.tag}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
