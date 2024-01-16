import React, { useEffect, useState } from "react";

export default function Question({
  index,
  question,
  answersSelection,
  setAnswersSelection,
}) {
  const [editedQuestion, setEditedQuestion] = useState(question);
  useEffect(() => {
    const edit = [...question];
    edit[1] = shuffle(edit[1].map((item) => item.replace("*", "")));

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
          <div key={key} className="mt-2 pl-4">
            <input
              type="radio"
              className="w-[16px] h-[16px]"
              name={index}
              id={index + "-" + select}
              value={select}
              onChange={(e) => {
                const newArray = [...answersSelection];
                newArray[index] = e.target.value;
                setAnswersSelection(newArray);
              }}
            />
             <label htmlFor={index + "-" + select}> {select} </label>
          </div>
        ))}
      </div>
    </div>
  );
}
