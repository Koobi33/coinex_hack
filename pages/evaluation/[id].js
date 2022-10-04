import styles from "./chcek.module.scss";
// import { Header } from "../../components/header";
import { courses } from "../../constants";
import { notification, Rate } from "antd";
import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

function EvaluationPage() {
  const [isCelebrate, setCelebrate] = useState(false);

  function submitProgress() {
    if (!isCelebrate) {
      setCelebrate(true);
      notification.open({
        message: "Congratulations!",
        description: "You have earned 20 coins!",
      });
    }
  }

  const [usersSubmission, setSubmission] = useState("");
  useEffect(() => {
    const val = localStorage.getItem("submission");
    setSubmission(val);
  }, []);
  return (
    <div className={styles.container}>
      {/*<Header />*/}
      <div className={styles.content}>
        <h1 className={styles.title}>Evaluating: {courses[0].title}</h1>
        <div style={{ width: "100%" }}>
          <h3 className={styles.submit_title}>
            Your peer submitted answer on question "What color of light saber
            real Jedy use?":{" "}
          </h3>
          <div className={styles.submit_container}>{usersSubmission}</div>
        </div>
        <div className={styles.checklist}>
          {[{ id: 0, title: "Was the answer accurate?" }].map((item, index) => (
            <div className={styles.checklist_item} key={item.id}>
              <h3 className={styles.checklist_title}>{item.title}</h3>
              <Rate />
            </div>
          ))}
        </div>
        <button onClick={submitProgress} className={styles.btn}>
          submit
        </button>
        {isCelebrate && <ReactConfetti />}
      </div>
    </div>
  );
}

export default EvaluationPage;
