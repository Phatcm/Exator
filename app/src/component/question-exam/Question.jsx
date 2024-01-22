import React, { useEffect, useState } from "react";

export default function Question({
  index,
  question,
  answersSelection,
  setAnswersSelection,
  isReviewMode,
}) {
  const [rightAnswer, setRightAnswer] = useState();
  const [editedQuestion, setEditedQuestion] = useState(question);
  useEffect(() => {
    const edit = [...question];
    edit[1] = shuffle(
      edit[1].map((item) => {
        if (item.includes("*")) {
          const newItem = item.replace("*", "");
          setRightAnswer(newItem);
          return newItem;
        } else return item;
      })
    );

    setEditedQuestion(edit);
  }, []);

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  return (
    <div className="text-[18px] mt-3">
      <p className="text-[20px]">
        {index + 1}. {question[0]}
      </p>
      <div className="flex flex-col ">
        {editedQuestion[1].map((select, key) => (
          <div
            key={key}
            className={`mt-2 pl-4 
              ${isReviewMode && rightAnswer === select ? "text-green-500" : ""}
              ${
                isReviewMode &&
                rightAnswer !== select &&
                answersSelection[index] === select
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
              onChange={(e) => {
                const newArray = [...answersSelection];
                newArray[index] = e.target.value;
                setAnswersSelection(newArray);
              }}
              disabled={isReviewMode}
            />
             
            <label className="" htmlFor={index + "-" + select}>
              {" "}
              {select}{" "}
            </label>
          </div>
        ))}
      </div>

      {isReviewMode && (
        <p className="mt-4 text-yellow-700">Explain: {question[2]}</p>
      )}
    </div>
  );
}
