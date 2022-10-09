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

  useEffect(() => {
    // load current course
    if (account) {
      setLoading(true);
      fetch(`http://localhost:3000/api/courses/${router.query.courseID}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            // если все уроки пройдены перенаправить на экзамен
            if (
              router.query.lessonID > data.lessons[data.lessons.length - 1].id
            ) {
              router.push(`/courses/exam?courseID=${router.query.courseID}`);
            }
            setCurrCourse(data);
          }
        });
    }
  }, [account]);

  const submitLesson = () => {
    // submit lesson
    fetch(
      `http://localhost:3000/api/users/${account}/${router.query.courseID}/${
        router.query.lessonID + 1
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
            router.query.lessonID + 1
          }`
        );
      });
  };
  return <div>lesson page</div>;
};

export default LessonPage;