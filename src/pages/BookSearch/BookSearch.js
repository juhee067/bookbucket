import { useState, useEffect } from "react";
import axios from "axios";
import "./book.scss";

const BookSearch = () => {
  const [list, setList] = useState([]);

  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiKey =
    "5196C67D1E3BA4FBD1181C4103213BE2D73BFDFE73AC5DC257632D7DA1A15293";
  // async await 말고 기본
  // const params = {
  //   key: apiKey,
  //   output: "json",
  //   categoryId: "100",
  // };
  // useEffect(() => {
  //   axios
  //     .get(`${proxyUrl}http://book.interpark.com/api/bestSeller.api`, {
  //       params,
  //     })
  //     .then((res) => {
  //       setList(res.data.item);
  //     })
  //     .catch((error) => console.log("error", error));
  // }, []);
  useEffect(() => {
    getInterparkBook();
  }, []);
  // async await
  const getInterparkBook = async () => {
    const params = {
      key: apiKey,
      output: "json",
      categoryId: "100",
    };
    try {
      const response = await axios.get(
        `${proxyUrl}http://book.interpark.com/api/bestSeller.api`,
        {
          params,
        }
      );
      return setList(response.data.item);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="bookSearch">
      <div className="bg center">
        {" "}
        <div className="container">
          <div className="title">베스트셀러</div>
          <div className="row flex-row wrap">
            {" "}
            {list.map((book, i) => {
              return (
                <div className="reference" key={i}>
                  <img src={book.coverSmallUrl} alt="/"></img>
                  <h2>{book.title}</h2>
                  <h6>{book.author}</h6>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSearch;
