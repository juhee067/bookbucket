import { useState, useRef, useEffect } from "react";
import "./css/reset.css";
import "./css/common.scss";
import book from "./data/Book";
// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faCircleCheck,
  faSquareMinus,
  faMagnifyingGlass,
  faXmark,
  faEraser,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  // 변수
  let pattern = /([^가-힣a-z\x20])/i;
  // ---usestate
  // plus button
  let [plusBtn, setPlusBtn] = useState(false);
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
      copy.unshift({ id: bookId, title: inputValue });
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
  // 자음, 모음 검사
  const testWord = () => {
    if (pattern.test(inputValue)) {
      alert("똑바로 작성해주세요");
      setInputValue("");
      return titleInputRef.current.focus();
    }
  };
  // 빈칸 검사
  const blankWord = () => {
    if (inputValue === "") {
      alert("도서를 입력해주세요");
      return titleInputRef.current.focus();
    }
  };
  return (
    <div className="App">
      <div className="bg center">
        <div className="container">
          <h1 className="title">2023 독서 계획</h1>
          <p className="msg">2023년에 읽을 도서</p>
          <div className="icon">
            {" "}
            <FontAwesomeIcon
              icon={plusBtn ? faCircleCheck : faCirclePlus}
              className="circlePlus cursor"
              onClick={openInput}
            />
            <FontAwesomeIcon
              icon={faSquareMinus}
              className={`squareMinus cursor ${plusBtn ? "on" : ""}`}
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
                <div className="bucket img2 center ">
                  <h4>{book.title}</h4>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
