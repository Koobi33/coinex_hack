import React, { useState, useEffect } from "react";
import styles from "./profile.module.scss";
import { courses, topUsers } from "../../constants/index";
import coin from "../../public/icon_coin.svg";
import flash from "../../public/icon_flash.svg";
import avatar from "../../public/pic_1.png";
import cube from "../../public/icon_cube.svg";
import arrowRight from "../../public/arrow_right.svg";
import achiev1 from "../../public/achiev_1.png";
import achiev2 from "../../public/achiev_2.png";
import achiev3 from "../../public/achiev_3.png";
import achiev4 from "../../public/achiev_4.png";
import avatarMin from "../../public/avatar_mini.png";
import Image from "next/image";
import { Progress } from "antd";
import Link from "next/link";
import cx from "class-names";
import { useWeb3React } from "@web3-react/core";

function Profile() {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();
  const [userData, setUserData] = useState(null);
  const [isUserLoading, setUserLoading] = useState(false);
  const [tokensAmount, setTokensAmount] = useState(0);
  const [isTokensLoading, setTokensLoading] = useState(false);
  const [evaluationsList, setEvaluationsList] = useState([]);
  const [isEvaluationsLoading, setEvaluationsLoading] = useState(false);

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // load profile data
    if (account) {
      setUserLoading(true);
      fetch(`http://localhost:3000/api/users/${account}`)
        .then((res) => res.json())
        .then((data) => {
          setUserData(data);
          setUserLoading(false);
        });
    }
  }, [account]);

  useEffect(() => {
    // load list of available courses
    if (account) {
      fetch(`http://localhost:3000/api/courses`)
        .then((res) => res.json())
        .then((list) => {
          if (list) {
            setCourses(list);
          }
        });
    }
  }, [account]);

  useEffect(() => {
    // load tokens amount
    if (account) {
      setTokensLoading(true);
      fetch(`http://localhost:3000/api/users/${account}/tokens`)
        .then((res) => {
          return res.json();
        })
        .then((amount) => {
          if (amount) {
            setTokensAmount(amount);
            setTokensLoading(false);
          }
        });
    }
  }, [account]);

  useEffect(() => {
    // load list of available evaluations
    if (account) {
      setEvaluationsLoading(true);
      fetch(`http://localhost:3000/api/courses/evaluations`)
        .then((res) => res.json())
        .then((list) => {
          if (list) {
            console.log(list);
            setEvaluationsList(list.filter((item) => item.user !== account));
            setEvaluationsLoading(false);
          }
        });
    }
  }, [account]);

  return (
    <div className={styles.content}>
      <p className={styles.page_title}>Profile</p>
      <div className={styles.avatar_level_container}>
        <div className={styles.left_container}>
          <div className={styles.avatar_container}>
            <Image src={avatar} />
            <span className={styles.customize}>Customize me</span>
          </div>
          <Progress strokeColor={"#7FF4D1"} percent={80} />
          <div className={styles.lvl_container}>
            <p className={styles.lvl_title}>
              Lvl 19<span className={styles.lvl_percent}>80%</span>
            </p>
            <p className={styles.to_next_text}>208 points to next level</p>
          </div>
          <div className={styles.awards_container}>
            <div className={styles.award}>
              <Image src={coin} width={20} height={20} />
              <p className={styles.award_text}>4543</p>
            </div>
            <div className={styles.award}>
              <Image src={cube} width={24} height={24} />
              <p className={styles.award_text}>34</p>
            </div>
            <div className={styles.award}>
              <Image src={flash} width={24} height={24} />
              <p className={styles.award_text}>15</p>
            </div>
          </div>
          <div className={styles.daily_reward_container}>
            <p className={styles.lvl_title}>Daily reward</p>
            <p className={styles.collect_btn}>Collect</p>
          </div>
          <div className={styles.achievements_container}>
            <div className={styles.achievements_title}>
              <p className={styles.lvl_title}>Achievements</p>
              <Link href="/achievements">
                <a>
                  <Image src={arrowRight} />
                </a>
              </Link>
            </div>
            <div className={styles.achiev_cards_container}>
              <Image src={achiev1} />
              <Image src={achiev2} />
              <Image src={achiev3} />
              <Image src={achiev4} />
            </div>
          </div>
        </div>
        <div className={styles.right_part}>
          <div className={styles.info_container}>
            <span className={styles.lvl_title}>Evaluations</span>
            <div className={styles.eval_container}>
              <div className={styles.eval_row}>
                <p className={styles.verification}>
                  Project verification{" "}
                  <span className={styles.nick}>jdkjsmn</span>
                </p>
                <div className={styles.start_btn}>Start</div>
              </div>
              <div className={styles.eval_row}>
                <p className={styles.verification}>
                  Project verification{" "}
                  <span className={styles.nick}>jdkjsmn</span>
                </p>
                <div className={styles.start_btn}>Start</div>
              </div>
            </div>
          </div>
          <div className={styles.info_container}>
            <span className={styles.lvl_title}>My active courses</span>
            <div className={styles.eval_row}>
              <p className={styles.course_title}>
                {courses && courses[0] && courses[0]?.title}
                <span className={styles.course_percent}>70%</span>
              </p>
              <Link href="/courses/1">
                <a className={styles.continue_btn}>Continue</a>
              </Link>
            </div>
          </div>
          <div className={styles.info_container}>
            <span className={styles.lvl_title}>Available evaluations</span>
            <div className={styles.users_container}>
              {evaluationsList.map((evaluation) => {
                const course = courses.find(
                  (el) => el.id === Number(evaluation.course[0])
                );
                console.log(course);
                return (
                  <Link
                    href={`/evaluation/${evaluation.user}?courseID=${evaluation.course[0]}`}
                  >
                    <span>{course?.title}</span>
                  </Link>
                );
              })}
              {/*{topUsers?.map((user, index) => (*/}
              {/*  <div key={user.id} className={styles.eval_row}>*/}
              {/*    <div className={styles.user_row}>*/}
              {/*      <div*/}
              {/*        className={cx({*/}
              {/*          [styles.top_avatar_container]: true,*/}
              {/*          [styles.first_border]: index === 0,*/}
              {/*        })}*/}
              {/*      >*/}
              {/*        <Image src={avatarMin} />*/}
              {/*        <p*/}
              {/*          className={cx({*/}
              {/*            [styles.place]: true,*/}
              {/*            [styles.first_border_min]: index === 0,*/}
              {/*          })}*/}
              {/*        >*/}
              {/*          {index + 1}*/}
              {/*        </p>*/}
              {/*      </div>*/}
              {/*      <p*/}
              {/*        className={cx({*/}
              {/*          [styles.user_text]: true,*/}
              {/*          [styles.first_text]: index === 0,*/}
              {/*        })}*/}
              {/*      >*/}
              {/*        {user.name}*/}
              {/*      </p>*/}
              {/*    </div>*/}
              {/*    <p*/}
              {/*      className={cx({*/}
              {/*        [styles.user_text]: true,*/}
              {/*        [styles.first_text]: index === 0,*/}
              {/*      })}*/}
              {/*    >*/}
              {/*      {user.level}*/}
              {/*    </p>*/}
              {/*  </div>*/}
              {/*))}*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
