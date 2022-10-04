import { useEffect, useState } from "react";
// import { Header } from "../../components/header";
import { useRouter } from "next/router";
import styles from "./course-page.module.scss";
import ReactConfetti from "react-confetti";
import { useWeb3React } from "@web3-react/core";
import {
  CONTRACT_ABI,
  CONTRACT_ADDRESS,
  courses,
  IMG_URL,
} from "../../constants";
import { Input, notification, Rate } from "antd";

const INFO_STATE = "INFO_STATE";
const LEARN_STATE = "LEARN_STATE";
const SUBMIT_STATE = "SUBMIT_STATE";

const CoursePage = function () {
  const router = useRouter();

  const { active, account, library, connector, activate, deactivate, error } =
    useWeb3React();
  const { slug } = router.query;
  const currCourse = courses.find((item) => item.id === slug);
  const [courseState, setCourseState] = useState(INFO_STATE);

  return (
    <div className={styles.container}>
      {/*<Header />*/}
      <div className={styles.content}>
        {!currCourse && <h1 className={styles.title}>Loading...</h1>}
        {active && currCourse && courseState === INFO_STATE && (
          <CourseInfo setCourseState={setCourseState} currCourse={currCourse} />
        )}
        {active && currCourse && courseState === LEARN_STATE && (
          <CourseMaterials
            setCourseState={setCourseState}
            currCourse={currCourse}
          />
        )}
        {active && currCourse && courseState === SUBMIT_STATE && (
          <CourseForm currCourse={currCourse} />
        )}
      </div>
    </div>
  );
};

export default CoursePage;
const CourseInfo = function ({ currCourse, setCourseState }) {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  async function start() {
    const LearnContract = new library.eth.Contract(
      CONTRACT_ABI,
      CONTRACT_ADDRESS
    );

    await LearnContract.methods.addCourseToMyList(currCourse.id).call();
    setCourseState(LEARN_STATE);
  }

  return (
    <>
      <img className={styles.img} alt={currCourse.title} src={currCourse.img} />
      <div>
        <div className={styles.difficulty}>
          <p>Difficulty:</p>
          <Rate disabled defaultValue={currCourse.difficulty} />
          <span>+50 coins</span>
        </div>
      </div>
      <h1 className={styles.title}>{currCourse.title}</h1>
      <p className={styles.description}>{currCourse.description}</p>

      <button className={styles.btn} disabled={!active} onClick={start}>
        {active ? "Start" : "Connect wallet first"}
      </button>
    </>
  );
};
const CourseMaterials = function ({ setCourseState, currCourse }) {
  return (
    <div>
      <h1 className={styles.title}>{currCourse.title}</h1>
      <iframe
        width="100%"
        height="450px"
        src="https://www.youtube.com/embed/bfmKtxZiB6I"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <p className={styles.description}>
        Watch video materials and go ahead...
      </p>
      <button
        onClick={() => setCourseState(SUBMIT_STATE)}
        className={styles.btn}
      >
        Next
      </button>
    </div>
  );
};

const CourseForm = function ({ currCourse }) {
  const [isCelebrate, setCelebrate] = useState(false);
  const [text, setText] = useState("");
  function submitProgress() {
    if (!isCelebrate) {
      setCelebrate(true);
      notification.open({
        message: "Congratulations!",
        description: "You have earned 50 coins!",
      });
      localStorage.setItem("submission", text);
    }
  }
  return (
    <>
      {isCelebrate && (
        <div className={styles.waiting}>Wait for evaluation...</div>
      )}
      {!isCelebrate && (
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <h1 className={styles.title}>SUBMISSION FOR: {currCourse.title}</h1>
          <p style={{ color: "white" }}>
            What color of light saber real Jedy use?
          </p>
          <Input
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            className={styles.textarea}
          />
          <button
            disabled={text.length === 0}
            onClick={submitProgress}
            className={styles.btn}
          >
            submit
          </button>
        </form>
      )}
      {isCelebrate && <ReactConfetti />}
    </>
  );
};
