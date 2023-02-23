import React from "react";
import { useState, useRef, useEffect } from "react";
import book from "../../data/Book";
import "./main.scss";
import Entire from "../../component/Entire";
import Finish from "../../component/Finish";
import Bookmark from "../../component/Bookmark";
// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faCircleCheck,
  faSquareCheck,
  faSquareMinus,
  faMagnifyingGlass,
  faXmark,
  faEraser,
  faStamp,
} from "@fortawesome/free-solid-svg-icons";

//import { faStar } from "@fortawesome/free-regular-svg-icons";
const Main = () => {
  // 변수
  let pattern = /([^가-힣a-z\x20])/i;
  // ---usestate
  // plus button
  let [plusBtn, setPlusBtn] = useState(false);
  // minus button
  let [minusBtn, setMinusBtn] = useState(false);
  // stamp button
  let [stampBtn, setStampBtn] = useState(false);
  // input value
  let [inputValue, setInputValue] = useState("");
  // book data
  let [listBook, setListBook] = useState(book);
  //book id
  const [bookId, setBookId] = useState(listBook.length);
  //tab
  let [tab, setTab] = useState(0);
  //search
  let [search, setSearch] = useState(false);
  // input search
  let [searchText, setSearchText] = useState("");
  //search filter
  const searched = listBook.filter((item) => {
    return item.title.includes(searchText.toLowerCase());
  });
  console.log(searched);
  //------------useref
  const titleInputRef = useRef(null);
  // ---------------------useEffect
  // input focus
  useEffect(() => {
    titleInputRef.current.focus();
  }, [plusBtn, listBook]);

  // --------함수 생성
  //도서 추가
  const addBook = () => {
    if (pattern.test(inputValue)) {
      alert("똑바로 작성해주세요");
      setInputValue("");
      return titleInputRef.current.focus();
    }
    if (plusBtn) {
      if (!inputValue) {
        alert("도서를 입력해주세요");
        return titleInputRef.current.focus();
      }
      let copy = [...listBook];
      copy.unshift({
        id: bookId,
        title: inputValue,
        isOn: true,
        Whether: false,
        bookMark: false,
      });
      setListBook(copy);
      increaseId();
      setInputValue("");
    }
  };
  // 엔터로 도서 추가
  const addEnter = () => {
    if (window.event.keyCode === 13) {
      addBook();
    }
  };
  // input 하단에 띄우기
  const openInput = () => {
    setPlusBtn(true);
    // testWord();
    addBook();
  };

  //input value change
  const inputText = (e) => {
    setInputValue(e.target.value);
  };
  //input value null
  const clearAllText = () => {
    setInputValue("");
  };
  // listBook.id lncrease
  const increaseId = () => {
    if (plusBtn) {
      let copy = bookId;
      copy++;
      setBookId(copy);
    }
  };
  // input close
  const closeInput = () => {
    setPlusBtn(false);
  };
  // 도서 삭제
  // 도서 선택 상태 만들기
  const deleteBefore = () => {
    setMinusBtn(!minusBtn);
    deleteBook();
  };
  //도서 클릭 시 isOn true에서 false 만들기
  const toggleIsOn = (book) => {
    if (minusBtn) {
      let copy = [...listBook];
      const mathId = copy.find((el) => el.id === book);
      mathId.isOn = !mathId.isOn;
      setListBook(copy);
    }
  };
  //선택한 도서 삭제하기
  const deleteBook = () => {
    if (minusBtn) {
      let copy = [...listBook];
      let saveContent = copy.filter((el) => el.isOn === true);
      let deleteContent = copy.filter((el) => el.isOn === false);
      //   선택한 것이 없을 때 alert창을 안띄우기
      if (deleteContent.length === 0) {
        return;
      } else {
        setListBook(saveContent);
        alert("정말 삭제하시겠습니까?!");
      }
    }
  };
  //stamp 찍기
  // stamp 창 열기
  const stamp = () => {
    setStampBtn(!stampBtn);
  };
  //stamp 붙이기
  const attachStamp = (stamp) => {
    if (stampBtn) {
      let copy = [...listBook];
      const mathId = copy.find((el) => el.id === stamp);
      mathId.Whether = !mathId.Whether;
      setListBook(copy);
    }
  };
  //즐겨찾기
  const bookMark = (mark) => {
    let copy = [...listBook];
    const mathId = copy.find((el) => el.id === mark);
    mathId.bookMark = !mathId.bookMark;
    setListBook(copy);
  };
  //tab 선택
  const selectTab = (index) => {
    setTab(index);
  };
  // tabMenu
  const menuArr = [
    {
      name: "전체보기",
      content: (
        <Entire
          listBook={listBook}
          minusBtn={minusBtn}
          toggleIsOn={toggleIsOn}
          attachStamp={attachStamp}
          bookMark={bookMark}
          searchText={searchText}
          searched={searched}
        />
      ),
    },
    {
      name: "즐겨찾기",
      content: (
        <Bookmark
          listBook={listBook}
          minusBtn={minusBtn}
          toggleIsOn={toggleIsOn}
          attachStamp={attachStamp}
          bookMark={bookMark}
          searchText={searchText}
          searched={searched}
        />
      ),
    },
    {
      name: "독서완료",
      content: (
        <Finish
          listBook={listBook}
          minusBtn={minusBtn}
          toggleIsOn={toggleIsOn}
          attachStamp={attachStamp}
          bookMark={bookMark}
          searchText={searchText}
          searched={searched}
        />
      ),
    },
  ];
  //bookSearch
  const searchBook = () => {
    setSearch(!search);
  };
  //search text
  const getValue = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  return (
    <div className="main">
      {" "}
      <div className="bg center">
        {" "}
        <div className="container">
          {" "}
          <p className="msg">2023년에 읽을 도서</p>
          <div className="icon">
            {" "}
            <FontAwesomeIcon
              icon={plusBtn ? faCircleCheck : faCirclePlus}
              className={`circlePlus cursor ${
                minusBtn || stampBtn ? "on" : ""
              } `}
              onClick={openInput}
            />
            <FontAwesomeIcon
              icon={minusBtn ? faSquareCheck : faSquareMinus}
              className={`squareMinus cursor ${
                plusBtn || stampBtn ? "on" : ""
              }`}
              onClick={deleteBefore}
            />{" "}
            <FontAwesomeIcon
              icon={stampBtn ? faCircleCheck : faStamp}
              className={`stamp cursor ${plusBtn || minusBtn ? "on" : ""}`}
              onClick={stamp}
            />
          </div>
          <div className={`registration ${plusBtn ? "on" : ""}`}>
            <input
              type="text"
              placeholder="읽을 책을 입력하세요"
              value={inputValue}
              onChange={(e) => inputText(e)}
              ref={titleInputRef}
              onKeyPress={addEnter}
            />
            <button className="clearBtn" onClick={clearAllText}>
              {" "}
              <FontAwesomeIcon icon={faEraser} className="faEraser cursor" />
            </button>
            <button className="inputCloseBtn" onClick={closeInput}>
              {" "}
              <FontAwesomeIcon icon={faXmark} className="faXmark cursor" />
            </button>
          </div>
          <div className="category">
            <div className="menu">
              {menuArr.map((el, index) => {
                return (
                  <li
                    className={index === tab ? "focused" : ""}
                    onClick={() => selectTab(index)}
                  >
                    {el.name}
                  </li>
                );
              })}
            </div>

            <div className="search">
              {" "}
              <input
                type="text"
                placeholder="책을 검색하세요"
                value={searchText}
                onChange={(e) => getValue(e)}
                ref={titleInputRef}
                onKeyPress={addEnter}
                className={`searchInput ${search == true ? "on" : ""}`}
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="faMagnifyingGlass cursor"
                onClick={searchBook}
              />
            </div>
          </div>
          <div className="row flex-row wrap">
            <div>{menuArr[tab].content}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
