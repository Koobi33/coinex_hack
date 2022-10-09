import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const ExamPage = function () {
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
            setCurrCourse(data);
          }
        });
    }
  }, [account]);

  const submitExam = () => {
    fetch(
      `http://localhost:3000/api/users/${account}/${router.query.courseID}/submit`,
      {
        method: "POST",
      }
    );
  };
  return <div>exam page</div>;
};

export default ExamPage;
