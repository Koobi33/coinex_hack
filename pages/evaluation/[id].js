import styles from "./chcek.module.scss";
// import { Header } from "../../components/header";
import { courses } from "../../constants";
import { notification, Rate } from "antd";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/router";
import ReactConfetti from "react-confetti";

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

  useEffect(() => {
    // load current course
    if (account) {
      setLoading(true);
      fetch(`http://localhost:3000/api/courses/${courseID}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setCurrCourse(data);
            setLoading(false);
          }
        });
    }
  }, [account]);

  useEffect(() => {
    // load profile data проверяЕМОГО
    if (account) {
      setUserLoading(true);
      fetch(`http://localhost:3000/api/users/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setUserData(data);
          setSubmission(data.startedCourses[courseID].submission);
          console.log(data.startedCourses[courseID]);
          setUserLoading(false);
        });
    }
  }, [account]);

  const submitEvaluation = () => {
    fetch(
      `http://localhost:3000/api/courses/evaluations/${account}/${id}/${courseID}`,
      { method: "POST" }
    ).then(() => {
      setCelebrate(true);
    });
  };

  return (
    <div className={styles.container}>
      {!isLoading && !isUserLoading && currCourse && (
        <div className={styles.content}>
          <h1 className={styles.title}>Evaluating: {currCourse.title}</h1>
          <div style={{ width: "100%" }}>
            <h3 className={styles.submit_title}>
              Your peer submitted answer on question "What color of light saber
              real Jedy use?":{" "}
            </h3>
            <div className={styles.submit_container}>{usersSubmission}</div>
          </div>
          <div className={styles.checklist}>
            {[{ id: 0, title: "Was the answer accurate?" }].map(
              (item, index) => (
                <div className={styles.checklist_item} key={item.id}>
                  <h3 className={styles.checklist_title}>{item.title}</h3>
                  <Rate />
                </div>
              )
            )}
          </div>
          <button onClick={submitProgress} className={styles.btn}>
            submit
          </button>
          {isCelebrate && <ReactConfetti />}
        </div>
      )}
    </div>
  );
}

export default EvaluationPage;
