import React from "react";
import "../styles/table.scss";
import {PaginationButtonsComponentProps} from "../storage/types";

const PaginationButtonsComponent = ({
  current,
  length,
  setPage,
}: PaginationButtonsComponentProps) => {
  let buttons = [];
  for (let i = 0; i < length; i++) {
    buttons.push(
      <button
        className={current === i ? "active button-pagination" : "button-pagination"}
        key={"tablePage_" + i}
        onClick={() => setPage(i)}
      >
        {i + 1}
      </button>
    );
  }

  return (
    <div className="pagination-block">
      <button
        className="button-pagination"
        onClick={() => (current > 0 ? setPage(current - 1) : null)}
      >
        {"<"}
      </button>
      {buttons}
      <button
        className="button-pagination"
        onClick={() => (current < length - 1 ? setPage(current + 1) : null)}
      >
        {">"}
      </button>
    </div>
  );
};

export default PaginationButtonsComponent;
