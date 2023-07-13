import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import ArrowRightSvg from "../assets/ArrowRightSvg";
import { setCurrentAnswer } from "../features/resultSlice";
import { useDispatch } from "react-redux";

function Card(props) {
  const dispatch = useDispatch();
  const [isAnswered, setIsAnswered] = useState(true);
  const [answer, setAnswer] = useState(0);
  const [options, setOptions] = useState([]);
  const getOptions = async () => {
    axios
      .get("http://localhost:3000/options")
      .then((response) => setOptions(response.data))
      .catch((error) => console.log(error.message));
  };

  const radioHandler = (optionId) => {
    if (optionId >= 1 && optionId <= 3) {
      setAnswer(optionId);
      dispatch(setCurrentAnswer(optionId));
    } else {
      setIsAnswered(false);
    }
  };

  useEffect(() => {
    getOptions();
  }, [answer]);
  return (
    <>
      <div
        key={props.number}
        className="flex flex-col gap-4 p-16 bg-slate-200/80 w-11/12 md:w-5/6 lg:w-3/5 xl:w-1/3 h-auto rounded-lg relative"
      >
        <div
          id="card__header"
          className="text-slate-500 font-bold text-xl absolute top-5 left-5"
        >
          <h1>{`#${props.number}`}</h1>
        </div>
        <div
          id="card__questions"
          className="text-indigo-800 text-2xl font-semibold"
        >
          <h2>{props.question}</h2>
        </div>
        <div id="card__options" className="flex flex-col gap-2">
          {options.map((opt) => (
            <div
              key={opt.id}
              className="flex gap-2 bg-white rounded px-4 py-2"
              onClick={() => radioHandler(opt.id)}
            >
              <input
                type="radio"
                id={opt.id}
                name="answer"
                onChange={(e) => setAnswer(e.target.value)}
                value={opt.id}
              />
              <label htmlFor={opt.id} className="w-full">
                {opt.option}
              </label>
            </div>
          ))}
        </div>
        {isAnswered ? (
          ""
        ) : (
          <p className="text-red-500">Please select one answer!</p>
        )}

        {props.isLast ? (
          <Button onClick={props.onClick} variant="primary" text="Submit" />
        ) : (
          <Button
            onClick={isAnswered && props.onClick}
            variant="primary"
            text="Next"
            iconRight={<ArrowRightSvg />}
          />
        )}
      </div>
    </>
  );
}

export default Card;
