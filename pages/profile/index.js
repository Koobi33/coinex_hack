import React, { useState, useEffect } from "react";
import styles from "./profile.module.scss";
import { courses, topUsers } from "../../constants/index";
import coin from "../../public/icon_coin.svg";
import flash from "../../public/icon_flash.svg";
import avatar from "../../public/avatar1.png";
import avatar2 from "../../public/avatar2.png";
import avatar3 from "../../public/avatar3.png";
import cube from "../../public/icon_cube.svg";
import arrowRight from "../../public/arrow_right.svg";
import achiev1 from "../../public/achiev_1.png";
import reward from "../../public/Reward.png";

import Image from "next/image";
import { Progress } from "antd";
import Link from "next/link";
import cx from "class-names";
import { useWeb3React } from "@web3-react/core";

function Profile() {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();
  const [userData, setUserData] = useState(null);
  const [isUserLoading, setUserLoading] = useState(true);
  const [tokensAmount, setTokensAmount] = useState(0);
  const [isTokensLoading, setTokensLoading] = useState(false);
  const [evaluationsList, setEvaluationsList] = useState([]);
  const [isEvaluationsLoading, setEvaluationsLoading] = useState(false);

  const [courses, setCourses] = useState([]);

  const finishedCourses = userData
    ? Object.values(userData.startedCourses).filter(
        (item) => item.status === "FINISHED"
      )
    : [];
  const activeCourses = userData
    ? Object.entries(userData.startedCourses)
        .filter(
          (item) =>
            item[1].status === "IN_PROGRESS" || item[1].status === "EVALUATION"
        )
        .map((item) => item[0])
    : [];

  useEffect(() => {
    // load profile data
    if (account) {
      setUserLoading(true);
      fetch(`http://45.91.8.175:3000/api/users/${account}`)
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
      fetch(`http://45.91.8.175:3000/api/courses`)
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
      fetch(`http://45.91.8.175:3000/api/users/${account}/tokens`)
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
      fetch(`http://45.91.8.175:3000/api/courses/evaluations`)
        .then((res) => res.json())
        .then((list) => {
          if (list) {
            setEvaluationsList(list.filter((item) => item.user !== account));
            setEvaluationsLoading(false);
          }
        });
    }
  }, [account]);

  const avatarsMapping = () => {
    if (userData) {
      if (userData.level < 1) {
        return avatar;
      } else if (userData.level <= 3) {
        return avatar2;
      } else {
        return avatar3;
      }
    }
  };

  return (
    <div className={styles.content}>
      <p className={styles.page_title}>Profile</p>
      <div className={styles.avatar_level_container}>
        <div className={styles.left_container}>
          <div className={styles.avatar_container}>
            {!isUserLoading && <Image src={avatarsMapping()} />}
            {/*<span className={styles.customize}>Customize me</span>*/}
          </div>
          {!isUserLoading && (
            <Progress
              strokeColor={"#7FF4D1"}
              percent={
                Number(userData.level.toFixed(2).toString().split(".")[1]) || 0
              }
            />
          )}
          {!isUserLoading && (
            <div className={styles.lvl_container}>
              <p className={styles.lvl_title}>
                Lvl {Number(userData.level.toString().split(".")[0])}
                <span className={styles.lvl_percent}>
                  {Number(userData.level.toFixed(2).toString().split(".")[1])}%
                </span>
              </p>
              {/*<p className={styles.to_next_text}>208 points to next level</p>*/}
            </div>
          )}
          <div className={styles.awards_container}>
            <div className={styles.award}>
              <Image src={coin} width={20} height={20} />
              <p className={styles.award_text}>{tokensAmount}</p>
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
                  <Image src={reward} width={60} height={60} />
                </a>
              </Link>
            </div>
            <div className={styles.achiev_cards_container}>
              {finishedCourses.map((item, index) => {
                return <Image key={item} src={achiev1} />;
              })}
            </div>
          </div>
        </div>
        <div className={styles.right_part}>
          {/*<div className={styles.info_container}>*/}
          {/*  <span className={styles.lvl_title}>Evaluations</span>*/}
          {/*  <div className={styles.eval_container}>*/}
          {/*    <div className={styles.eval_row}>*/}
          {/*      <p className={styles.verification}>*/}
          {/*        Project verification{" "}*/}
          {/*        <span className={styles.nick}>jdkjsmn</span>*/}
          {/*      </p>*/}
          {/*      <Link href="/evaluation/1?courseID=1&id=1">*/}
          {/*        <a className={styles.start_btn}>Start</a>*/}
          {/*      </Link>*/}
          {/*    </div>*/}
          {/*    <div className={styles.eval_row}>*/}
          {/*      <p className={styles.verification}>*/}
          {/*        Project verification{" "}*/}
          {/*        <span className={styles.nick}>jdkjsmn</span>*/}
          {/*      </p>*/}
          {/*      <div className={styles.start_btn}>Start</div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
          {activeCourses && courses && (
            <div className={styles.info_container}>
              <span className={styles.lvl_title}>My active courses</span>
              {activeCourses.map((item) => {
                return (
                  <div key={item} className={styles.eval_row}>
                    <p className={styles.course_title}>
                      {courses.find((el) => el.id.toString() === item)?.title}
                      {/*<span className={styles.course_percent}>70%</span>*/}
                    </p>
                    <Link href={`/courses/${item}`}>
                      <a className={styles.continue_btn}>Continue</a>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
          <div className={styles.info_container}>
            <span className={styles.lvl_title}>Available evaluations</span>
            <div className={styles.users_container}>
              {evaluationsList.map((evaluation) => {
                const course = courses.find(
                  (el) => el.id === Number(evaluation.course[0])
                );
                return (
                  <div key={evaluation.user} className={styles.eval_row}>
                    <span className={styles.course_title}>{course?.title}</span>
                    <Link
                      href={`/evaluation/${evaluation.user}?courseID=${evaluation.course[0]}`}
                    >
                      <a className={styles.continue_btn}>Start evaluation</a>
                    </Link>
                  </div>
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
