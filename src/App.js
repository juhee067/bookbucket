import { Routes, Route, useNavigate } from "react-router-dom";
import "./css/reset.css";
import "./css/common.scss";
import Main from "./pages/Main/Main";
import BookSearch from "./pages/BookSearch/BookSearch";

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

function App() {
  // 경로 이동
  let navigate = useNavigate();

  return (
    <div className="App">
      {" "}
      <div className="bg center">
        <div className="container">
          <h1 className="title">
            <span
              className="cursor"
              onClick={() => {
                navigate("/");
              }}
            >
              2023 독서 계획
            </span>
            <button>
              <FontAwesomeIcon
                icon={faBook}
                className="bookIcon cursor"
                onClick={() => {
                  navigate("/bookSearch");
                }}
              />
            </button>
          </h1>
        </div>
      </div>
      <Routes>
        {" "}
        <Route path="/" element={<Main />}></Route>
        <Route path="/bookSearch" element={<BookSearch />}>
          {" "}
        </Route>
        <Route path="*" element={<div>없는 페이지에요</div>} />
      </Routes>{" "}
    </div>
  );
}

export default App;
