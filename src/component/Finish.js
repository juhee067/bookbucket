import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import "./Entire";
const Finish = (props) => {
  let copyListBook = [...props.listBook].filter((el) => {
    return el.Whether === true;
  });
  let copySearchListBook = [...copyListBook].filter((item) => {
    return item.title.includes(props.searchText.toLowerCase());
  });
  return (
    <div className="finish">
      {" "}
      <div className="row flex-row wrap">
        {(props.searchText ? copySearchListBook : copyListBook).map(
          (book, i) => {
            return (
              <div
                className={`bucket cursor img2 center ${
                  props.minusBtn ? "on" : ""
                } ${book.isOn === false ? "oc" : ""} ${
                  book.Whether ? "done" : ""
                }`}
                onClick={() => {
                  props.toggleIsOn(book.id);
                  props.attachStamp(book.id);
                }}
              >
                <FontAwesomeIcon
                  icon={book.bookMark ? solidStar : regularStar}
                  className="fastar cursor"
                  onClick={() => {
                    props.bookMark(book.id);
                  }}
                />

                <h4>{book.title}</h4>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Finish;
