import React from "react";

const View = ({ tap }) => {
  // tap

  return (
    <div className="view">{[<Entire />, <Bookmark />, <Finish />][tap]}</div>
  );
};

export default View;
