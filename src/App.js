import "./css/reset.css";
import "./css/common.scss";
import { useState, useRef } from "react";
import book from "./data/Book";
// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faCircleCheck,
  faSquareMinus,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  // state
  // plus button
  let [plusBtn, setPlusBtn] = useState(false);
  // input value
  let [inputValue, setInputValue] = useState("");

  //도서 추가
  const addBook = () => {};
  // input 하단에 띄우기
  const showUnderInput = () => {
    plusBtn ? setPlusBtn(false) : setPlusBtn(true);
  };
  const showUpInput = () => {
    setPlusBtn(false);
  };
  //input value change
  const inputText = (e) => {
    setInputValue(e.target.value);
  };
  //input value null
  const clearAllText = () => {
    setInputValue("");
  };

  return (
    <div className="App">
      <body className="bg center">
        <div className="container">
          <h1 className="title">2023 독서 계획</h1>
          <p className="msg">2023년에 읽을 도서</p>
          <div className="icon">
            {" "}
            <FontAwesomeIcon
              icon={plusBtn ? faCircleCheck : faCirclePlus}
              className="circlePlus cursor"
              onClick={showUnderInput}
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
            />
            <button className="clearbtn" onClick={clearAllText}>
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
            {book.map((a, i) => {
              return (
                <div className="bucket img2 center ">
                  <h4>{book[i].title}</h4>
                </div>
              );
            })}
          </div>
        </div>
      </body>
    </div>
  );
}

export default App;
