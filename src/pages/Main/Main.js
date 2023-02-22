import React from "react";
import { useState, useRef, useEffect } from "react";
import book from "../../data/Book";
import "./main.scss";

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
} from "@fortawesome/free-solid-svg-icons";

const Main = () => {
  // 변수
  let pattern = /([^가-힣a-z\x20])/i;
  // ---usestate
  // plus button
  let [plusBtn, setPlusBtn] = useState(false);
  // minus button
  let [minusBtn, setMinusBtn] = useState(false);
  // input value
  let [inputValue, setInputValue] = useState("");
  // book data
  let [listBook, setListBook] = useState(book);
  //book id
  const [bookId, setBookId] = useState(listBook.length);
  //------------useref
  const titleInputRef = useRef(null);
  // ---------------------useEffect
  // input focus
  useEffect(() => {
    titleInputRef.current.focus();
    console.log(listBook);
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
      copy.unshift({ id: bookId, title: inputValue, isOn: true });
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
  //도서 클릭 시 isOn true에서 false만들기
  const isOn = (book) => {
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
              className={`circlePlus cursor ${minusBtn ? "on" : ""}`}
              onClick={openInput}
            />
            <FontAwesomeIcon
              icon={minusBtn ? faSquareCheck : faSquareMinus}
              className={`squareMinus cursor ${plusBtn ? "on" : ""}`}
              onClick={deleteBefore}
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
              <ul>
                <li>전체보기</li>
                <li>즐겨찾기</li>
              </ul>
            </div>
            <div className="search">
              {" "}
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="faMagnifyingGlass cursor"
              />
            </div>
          </div>
          <div className="row flex-row wrap">
            {listBook.map((book, i) => {
              return (
                <div
                  className={`bucket cursor img2 center ${
                    minusBtn ? "on" : ""
                  } ${book.isOn === false ? "oc" : ""}`}
                  onClick={() => {
                    isOn(book.id);
                  }}
                >
                  <h4>{book.title}</h4>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
