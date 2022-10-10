import styles from "./chcek.module.scss";
// import { Header } from "../../components/header";
import { courses } from "../../constants";
import { notification, Radio, Rate, Space } from "antd";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/router";
import ReactConfetti from "react-confetti";
import Link from "next/link";
import Image from "next/image";
import backBtn from "../../public/arrow_back.svg";
import JSONInput from "react-json-editor-ajrm/index";
import locale from "react-json-editor-ajrm/locale/en";
import cx from "class-names";
import Slider from "rc-slider";

function EvaluationPage() {
  const router = useRouter();

  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();
  const { id } = router.query;
  const { courseID } = router.query;

  const [isCelebrate, setCelebrate] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isUserLoading, setUserLoading] = useState(false);
  const [currCourse, setCurrCourse] = useState(null);

  const [usersSubmission, setSubmission] = useState("");

  async function submitProgress() {
    if (!isCelebrate) {
      await submitEvaluation();
      notification.open({
        message: "Congratulations!",
        description: "You have earned 20 coins!",
      });
    }
  }

  console.log(router.query, "===== query");

  useEffect(() => {
    // load current course
    if (account && courseID) {
      setLoading(true);
      fetch(`http://45.91.8.175:3000/api/courses/${courseID}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setCurrCourse(data);
            setLoading(false);
          }
        });
    }
  }, [account, courseID]);

  useEffect(() => {
    // load profile data проверяЕМОГО
    if (account) {
      setUserLoading(true);
      fetch(`http://45.91.8.175:3000/api/users/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setUserData(data);
          setSubmission(data.startedCourses[courseID].submission);
          setUserLoading(false);
        });
    }
  }, [account, courseID, id]);

  const submitEvaluation = async () => {
    await fetch(
      `http://45.91.8.175:3000/api/courses/evaluations/${account}/${id}/${courseID}`,
      { method: "POST" }
    );
    setCelebrate(true);
  };

  return (
    <div className={styles.container}>
      {!isLoading && !isUserLoading && currCourse && (
        <>
          <Link href="/profile">
            <a className={styles.back_btn}>
              <Image src={backBtn} />
              <p>Back to Profile</p>
            </a>
          </Link>
          <p className={styles.title}>Final Project Evaluation</p>
          <div className={styles.content_container}>
            <div className={styles.part}>
              <div className={styles.info_container}>
                <p className={styles.info_title}>About</p>
                <p className={styles.info_desc}>
                  You need to honestly check the final project of the
                  participant and give a correct assessment of his knowledge
                </p>
              </div>
              <div className={styles.info_container}>
                <p className={styles.info_title}>Does the program code run?</p>
                <div className={styles.answer_container}>
                  <Radio.Group
                    onChange={(e) => {
                      console.log("radio checked", e.target.value);
                    }}
                  >
                    <Space direction="vertical" size={32}>
                      <Radio value={1}>Yes</Radio>
                      <Radio value={2}>No</Radio>
                    </Space>
                  </Radio.Group>
                </div>
              </div>
              <div className={styles.info_container}>
                <p className={styles.info_title}>
                  Enter &quot;_^_^_&quot; and run the program. Does it run?
                </p>
                <div className={styles.answer_container}>
                  <Radio.Group
                    onChange={(e) => {
                      console.log("radio checked", e.target.value);
                    }}
                  >
                    <Space direction="vertical" size={32}>
                      <Radio value={1}>Yes</Radio>
                      <Radio value={2}>No</Radio>
                    </Space>
                  </Radio.Group>
                </div>
              </div>
              <div className={styles.info_container}>
                <p className={styles.info_title}>Please, rate the project</p>
                <Slider
                  className={styles.slider}
                  min={0}
                  defaultValue={75}
                  marks={{ 25: "25%", 50: "50%", 75: "75%", 100: "100%" }}
                  step={null}
                />
              </div>
            </div>
            <div className={styles.part}>
              <div className={styles.json_container}>
                <JSONInput
                  id="json_input"
                  placeholder={usersSubmission}
                  viewOnly
                  locale={locale}
                  height="650px"
                  width="100%"
                  colors={{
                    background: "#232429",
                  }}
                  onChange={(val) => {
                    if (val.jsObject) {
                      console.log(val.jsObject);
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div className={styles.finish} onClick={submitProgress}>
            Finish evaluation
          </div>
        </>
      )}
      {isCelebrate && <ReactConfetti />}
    </div>
  );
}

export default EvaluationPage;
