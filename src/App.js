import "./css/bucket.css";
import "./css/common.scss";
import book from "./data/Book";

function App() {
  return (
    <div className="App">
      <body className="bg center">
        <h1 className="title">2023 독서 계획</h1>
        <p className="msg">2023년에 읽을 도서</p>
        <div className="row flex-row wrap">
          {book.map((a, i) => {
            return (
              <div className="bucket img2 center ">
                <h4>{book[i].title}</h4>
              </div>
            );
          })}
        </div>
      </body>
    </div>
  );
}

export default App;
