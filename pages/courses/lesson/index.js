import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const LessonPage = function () {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();
  const [isLoading, setLoading] = useState(false);
  const [currCourse, setCurrCourse] = useState(null);
  const [submissionData, setSubmissionData] = useState("submission test data");

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

  console.log(Number(router.query.lessonID));

  const submitLesson = () => {
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
  return (
    <div>
      lesson page
      <button onClick={submitLesson}>continue</button>
    </div>
  );
};

export default LessonPage;
