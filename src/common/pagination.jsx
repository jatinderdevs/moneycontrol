import React from "react";
import _ from "lodash";
const Pagination = (props) => {
  const { pageSize, itemCount, onPageChange, currentPage } = props;

  const pageCount = Math.ceil(itemCount / pageSize);
  const Pages = _.range(1, pageCount + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {itemCount > pageSize &&
          Pages.map((page) => {
            return (
              <li
                key={page}
                className={
                  currentPage === page ? "page-item active" : "page-item"
                }
              >
                <button
                  className="page-link"
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </button>
              </li>
            );
          })}
      </ul>
    </nav>
  );
};

export default Pagination;
