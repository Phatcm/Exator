import React, { useEffect, useState } from "react";

export default function QuestionHistory({ question, index }) {
  const [editedQuestion, setEditedQuestion] = useState([]);
  const [rightAnswer, setRightAnswer] = useState("");
  const [answerSelection, setAnswersSelection] = useState("");

  useEffect(() => {
    console.log(question);
    const edit = [...question];
    edit[1] = edit[1].map((item) => {
      let newItem = item;

      if (newItem.includes(">")) {
        newItem = newItem.replace(">", "");
        if (newItem.includes("*")) {
          newItem = newItem.replace("*", "");
          setRightAnswer(newItem);
        }
        setAnswersSelection(newItem);
      } else if (newItem.includes("*")) {
        newItem = newItem.replace("*", "");
        setRightAnswer(newItem);
      }

      return newItem;
    });

    setEditedQuestion(edit);
  }, []);
  return (
    <div className="text-[18px] mt-3">
      <p className="text-[20px]">
        {index + 1}. {question[0]}
      </p>
      <div className="flex flex-col ">
        {editedQuestion[1]?.map((select, key) => (
          <div
            key={key}
            className={`mt-2 pl-4 
          ${rightAnswer === select ? "text-green-500" : ""}
          ${
            rightAnswer !== select && answerSelection === select
              ? "text-red-600"
              : ""
          }
        `}
          >
            <input
              type="radio"
              className={`w-[16px] h-[16px] `}
              name={index}
              id={index + "-" + select}
              value={select}
              disabled={true}
              checked={answerSelection === select}
            />
             
            <label className="" htmlFor={index + "-" + select}>
              {" "}
              {select}{" "}
            </label>
          </div>
        ))}
      </div>

      <p className="mt-4 text-yellow-700 italic">
        Explain:{" "}
        {!question[2] || question[2] === "undefined"
          ? "This question don't have explain"
          : question[2]}
      </p>
    </div>
  );
}
