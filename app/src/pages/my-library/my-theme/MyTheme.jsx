import React, { Fragment, useEffect, useState } from "react";
import Pagination from "../../../component/pagination/Pagination";
import { useNavigate, useParams } from "react-router-dom";
import { functionItems } from "./functionThemeItems";
import FunctionTheme from "../../../component/function-theme/FunctionTheme";
import Card from "../../../component/card/Card";
import { IoSettingsOutline } from "react-icons/io5";
import axios from "axios";
import AcceptBtn from "../../../component/accept-btn/AcceptBtn";
import LinkNav from "../../../component/link-nav/LinkNav";
import { PiUploadSimple } from "react-icons/pi";
import { IoAddOutline } from "react-icons/io5";
import CardEdit from "../../../component/card-edit/CardEdit";
import NotFound from "../../notfound/NotFound";
import { v4 as uuidv4 } from "uuid";
import Loading from "../../../component/loading/Loading";
import { useSelector } from "react-redux";
import Notification from "../../../component/notification-popup/Notification";

export default function MyTheme() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { theme } = useParams();
  const [isSetting, setIsSetting] = useState(false);
  const [newCards, setNewCards] = useState([]);
  const [editCards, setEditCards] = useState([]);
  const [cards, setCards] = useState([]);
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [validateCard, setValidateCard] = useState([]);
  const [notification, setNotification] = useState({
    type: null,
    show: false,
    name: "",
  });

  const getQuestions = async () => {
    setLoading(true);
    const url = `${process.env.REACT_APP_URL}/questions?username=${user.email}&topic=${theme}`;
    const response = await axios.get(url);

    const data = response.data;
    if (data[0]) {
      setTopic(data[0]);
      let ncards = [];
      data[0].questions.forEach((question) => {
        const card = {
          index: uuidv4(),
          card: question,
        };
        ncards.push(card);
      });
      console.log(ncards);
      setCards(ncards);
      setEditCards(ncards);
    } else {
      setNotFound(true);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (notification.show === true) {
      setTimeout(() => {
        setNotification({
          type: null,
          show: false,
          name: "",
        });
      }, 3000);
    }
  }, [notification]);

  useEffect(() => {
    getQuestions();
    return () => {};
  }, []);

  const settingsClick = () => {
    setIsSetting(!isSetting);
  };

  const addNewCardClick = () => {
    let ncards = [...newCards];
    const array = {
      index: uuidv4(),
      card: ["", [], ""],
    };
    ncards.unshift(array);
    setNewCards(ncards);
  };
  const saveClick = async () => {
    setLoading(true);
    let validArray = [];
    editCards.forEach((card) => {
      if (card.card[0] === "") {
        validArray.push(card.index);
      }
    });
    newCards.forEach((card) => {
      if (card.card[0] === "") {
        validArray.push(card.index);
      }
    });

    if (validArray.length > 0) {
      setValidateCard(validArray);
    } else {
      const url = `${process.env.REACT_APP_URL}/questions`;
      let editArray = [...editCards];
      let newArray = [...newCards];
      let array = editArray.concat(newArray);
      const body = {
        username: user.email,
        topic: topic.topic,
        description: topic.description,
        questions: stringFormatQuestions(array),
      };
      const response = await axios.patch(url, body);
      if (response.status === 200) {
        getQuestions();
        setIsSetting(false);
        setNotification({
          type: "success",
          show: true,
          message: "update success!",
        });
      } else {
        setNotification({
          type: "fail",
          show: true,
          message: "update fail!",
        });
      }
      setNewCards([]);
    }
    setLoading(false);
  };
  const stringFormatQuestions = (array) => {
    let newArray = [];
    array.forEach((item) => {
      newArray.push(combineQuestion(item.card));
    });
    const string = newArray.join("\n");
    return string;
  };
  const stringFormatAnswers = (answers) => {
    let stringFormat = answers.join("-");
    stringFormat = "-" + stringFormat;
    return stringFormat;
  };
  const combineQuestion = (question) => {
    return question[0] + stringFormatAnswers(question[1]) + "|" + question[2];
  };
  const deleteTheme = async () => {
    const url = `${process.env.REACT_APP_URL}/topic?username=${user.email}&topic=${theme}`;
    const response = await axios.delete(url);
    if (response.status === 200) {
      console.log("Delete success");
      navigate("/mylibrary");
    }
  };
  const deleteNewCard = (index) => {
    let ncards = [...newCards];
    ncards = ncards.filter((card) => card.index !== index);
    setNewCards(ncards);
  };
  const deleteEditCard = (index) => {
    let ncards = [...editCards];
    ncards = ncards.filter((card) => card.index !== index);
    setEditCards(ncards);
  };
  const returnDefault = () => {
    setEditCards([...cards]);
    setNewCards([]);
  };

  const handlerEditingNewCard = (editedItem) => {
    let ncards = [...newCards];
    ncards.forEach((item, key) => {
      if (item.index === editedItem.index) {
        ncards[key] = editedItem;
      }
    });
    setNewCards(ncards);
  };
  const handlerEditingEditCard = (editedItem) => {
    let ncards = [...editCards];
    ncards.forEach((item, key) => {
      if (item.index === editedItem.index) {
        ncards[key] = editedItem;
      }
    });
    setEditCards(ncards);
  };
  const testClick = () => {
    const link = `/test/maketest?isMine=1&username=${user.email}&topic=${theme}`;
    navigate(link);
  };
  return !notFound ? (
    <Fragment>
      <div className="h-full flex flex-col">
        <div className="w-full flex flex-col flex-1 bg-white rounded-xl p-4 pt-0 mt-4 relative overflow-y-auto">
          <div className="flex justify-between bg-white items-center sticky w-full left-0 top-0 py-4 z-20 border-b border-black">
            <div className="">
              <LinkNav linksArr={["My library", theme]}></LinkNav>
            </div>
            <div className="overflow-hidden">
              <div
                className={`
          ${isSetting ? "translate-x-0" : "translate-x-[calc(100%-36px)]"}
          flex items-center gap-2 transition-all`}
              >
                <div
                  className="cursor-pointer hover:opacity-70 hover:bg-[#eff7f9] transition-all p-1 rounded-full"
                  onClick={() => {
                    if (isSetting) returnDefault();
                    settingsClick();
                  }}
                >
                  <IoSettingsOutline
                    className={`${
                      isSetting ? "rotate-0" : "rotate-180"
                    } text-[28px] transition-all duration-500`}
                  ></IoSettingsOutline>
                </div>
                <div className="flex items-center gap-2">
                  <AcceptBtn
                    name={"save"}
                    clickFunction={() => saveClick()}
                  ></AcceptBtn>
                  <AcceptBtn
                    name={"delete"}
                    clickFunction={deleteTheme}
                  ></AcceptBtn>
                </div>
              </div>
            </div>
          </div>
          {!loading && topic ? (
            <div className="flex-1 flex flex-col">
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-[32px] font-semibold">{topic.topic}</h1>
                </div>
                <p className="mt-2 break-all">{topic.description}</p>
              </div>
              <div className="flex mt-8 gap-3 flex-wrap justify-end">
                {functionItems.map((item, key) => (
                  <FunctionTheme
                    key={key}
                    name={item.name}
                    Icon={item.Icon}
                    isSetting={isSetting}
                    clickFunction={() => {
                      if (item.name === "Test") {
                        testClick();
                      }
                    }}
                  ></FunctionTheme>
                ))}
              </div>
              <div className="mt-8 flex items-center">
                <p className="text-[20px] font-semibold">
                  Term in this set ({cards.length})
                </p>
                <div
                  className={`
                  ${isSetting ? "t" : ""}
                  flex gap-2 ml-auto`}
                >
                  <FunctionTheme
                    name={"Add"}
                    Icon={IoAddOutline}
                    isSetting={!isSetting}
                    clickFunction={addNewCardClick}
                  ></FunctionTheme>
                  <FunctionTheme
                    name={"Import"}
                    Icon={PiUploadSimple}
                    isSetting={!isSetting}
                  ></FunctionTheme>
                </div>
              </div>
              <div className="mt-4 flex-1 flex flex-col">
                {isSetting && (
                  <div className="flex flex-col gap-4 pb-4 mt-4 border-[#5fadc3] border-b-8">
                    <p className="font-semibold">
                      New Card ({newCards.length})
                    </p>
                    {newCards.map((item, key) => (
                      <CardEdit
                        key={item.index}
                        question={item.card[0]}
                        answers={item.card[1]}
                        explain={item.card[2]}
                        index={item.index}
                        deleteFunction={() => deleteNewCard(item.index)}
                        updateCards={handlerEditingNewCard}
                        titleError={validateCard.includes(item.index)}
                      ></CardEdit>
                    ))}
                  </div>
                )}
                <div className="flex flex-col gap-4 mt-4">
                  {!isSetting
                    ? cards.map((item, key) => (
                        <Card
                          key={item.index}
                          question={item.card[0]}
                          answers={item.card[1]}
                          explain={item.card[2]}
                          index={1}
                        ></Card>
                      ))
                    : editCards.map((item) => (
                        <CardEdit
                          key={item.index}
                          question={item.card[0]}
                          answers={item.card[1]}
                          index={item.index}
                          explain={item.card[2]}
                          deleteFunction={() => deleteEditCard(item.index)}
                          updateCards={handlerEditingEditCard}
                          titleError={validateCard.includes(item.index)}
                        ></CardEdit>
                      ))}
                </div>
                <div className="flex justify-center pt-4 mt-auto">
                  <Pagination></Pagination>
                </div>
              </div>
            </div>
          ) : (
            <Loading size={"xl"}></Loading>
          )}
        </div>
      </div>
      <Notification
        type={notification.type}
        name={notification.message}
        isShow={notification.show}
      ></Notification>
    </Fragment>
  ) : (
    <NotFound></NotFound>
  );
}
