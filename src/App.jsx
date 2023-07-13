import axios from "axios";
import Card from "./components/Card";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  insertAnswer,
  resetAll,
} from "./features/resultSlice";
import Button from "./components/Button";
import StopwatchSvg from "./assets/StopwatchSvg";

function App() {
  const dispatch = useDispatch();
  const currentAnswer = useSelector((state) => state.result.currentAnswer);
  const answers = useSelector((state) => state.result.answers);
  const [questionId, setQuestionId] = useState(0);
  const [question, setQuestion] = useState({});
  const getQuestion = async () => {
    if (questionId >= 1 && questionId <= 10) {
      await axios
        .get(`http://localhost:3000/questions/${questionId}`)
        .then((response) => setQuestion(response.data))
        .catch((error) => console.log(error.message));
    }
  };
  // const isAnswered = currentAnswer !== 0;
  const survey = {
    questionId: Number(questionId),
    answerId: Number(currentAnswer),
  };
  const nextHandler = () => {
    dispatch(insertAnswer(survey));
    // dispatch(setCurrentAnswer(0));
    setQuestionId(questionId + 1);
  };
  const [isSurveyDone, setIsSurveyDone] = useState(false);
  const submitHandler = async () => {
    dispatch(insertAnswer(survey));
    await axios
      .post("http://localhost:3000/results", { answers })
      .then((response) => {
        setIsSurveyDone(true);
        Swal.fire({
          title: "Thank you!",
          text: "Sit tight while we review your answers",
          icon: "success",
          confirmButtonColor: "#3830A3",
          showConfirmButton: true,
        });
      })
      .catch((error) => console.log(error.message));
  };

  const retakeSurvey = () => {
    dispatch(resetAll());
    setIsSurveyDone(false);
    setQuestionId(0);
    setTimer(180);
  };

  const [timer, setTimer] = useState(180);
  const countdown = () => {
    if (questionId >= 1 && questionId <= 10) {
      timer > 0 &&
        setTimeout(() => {
          setTimer(timer - 1);
        }, 1000);
    }
    if (timer === 0) {
      setIsSurveyDone(true);
    }
    if (isSurveyDone) {
      setTimer(0);
    }
    if (questionId === 0) {
      setTimer(180);
    }
  };
  useEffect(() => {
    getQuestion();
    countdown();
  }, [questionId, isSurveyDone, timer]);
  return (
    <>
      <div className="flex flex-col gap-4 justify-center items-center h-screen w-screen bg-gradient-to-br from-green-400 to-blue-500">
        <div
          id="timer"
          className="flex gap-2 justify-center items-center p-4 w-40 h-auto bg-white rounded-lg"
        >
          <StopwatchSvg />
          <p className="text-3xl text-indigo-950">{timer}</p>
        </div>
        {isSurveyDone ? (
          <div className="flex flex-col gap-4 p-16 text-center bg-slate-200/80 w-11/12 md:w-5/6 lg:w-3/5 xl:w-1/3 h-auto rounded-lg">
            <div
              id="card__header"
              className="text-indigo-800 text-2xl font-semibold"
            >
              <h1>Thank you for participating!</h1>
            </div>
            <div id="card__subtitle" className="text-indigo-950">
              <p>Would you like to retake the survey?</p>
            </div>
            <Button variant="primary" text="Yes" onClick={retakeSurvey} />
            <Button variant="secondary" text="No, thanks" />
          </div>
        ) : questionId === 0 ? (
          <div className="flex flex-col gap-4 p-16 bg-slate-200/80 w-11/12 md:w-5/6 lg:w-3/5 xl:w-1/3 h-auto rounded-lg">
            <div
              id="card__header"
              className="text-indigo-800 text-center text-2xl font-semibold"
            >
              <h1>Welcome to Demo Survey!</h1>
            </div>
            <div id="card__subtitle" className="text-indigo-950 text-justify">
              <p>
                Be aware that you cannot go back to the previous question once
                you click next. However, after you submit your answers you will
                be able to retake the test. You have 3 minutes to take the
                survey.
              </p>
            </div>
            <Button
              variant="primary"
              text="Take Survey"
              onClick={() => setQuestionId(1)}
            />
          </div>
        ) : (
          <Card
            number={question.id}
            question={question.question}
            onClick={
              questionId === 10 ? () => submitHandler() : () => nextHandler()
            }
            isLast={questionId === 10}
            // isAnswered={isAnswered}
          />
        )}
      </div>
    </>
  );
}

export default App;
