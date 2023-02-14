import "./css/reset.css";
import "./css/common.scss";
import { useEffect } from "react";
import book from "./data/Book";
// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faSquareMinus,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  // 도서 추가
  const addBook = () => {};

  return (
    <div className="App">
      <body className="bg center">
        <div className="container">
          <h1 className="title">2023 독서 계획</h1>
          <p className="msg">2023년에 읽을 도서</p>
          <div className="icon">
            {" "}
            <FontAwesomeIcon
              icon={faCirclePlus}
              className="circlePlus cursor"
            />
            <FontAwesomeIcon
              icon={faSquareMinus}
              className="squareMinus cursor"
            />
          </div>
          <div className="Registration">
            <input type="text" placeholder="읽을 책을 입력하세요" />
            <button className="clearbtn">
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
