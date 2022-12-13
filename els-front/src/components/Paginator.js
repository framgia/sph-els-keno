import React, {
    useState
  } from "react";
import ReactPaginate from "react-paginate";

const Paginator = ({ page,setPage, pageCount }) => {
    
    const handlePageChange = (event) => {
        setPage(event.selected+1);  
    };
  
    return (
      <div className="flex justify-center mt-5">
        <ReactPaginate
          previousLabel="<"
          nextLabel=">"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="previous-page-item page-item"
          previousLinkClassName="page-link"
          nextClassName="next-page-item page-item"
          nextLinkClassName="next-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName="pagination"
          activeClassName="active"
          forcePage={page-1}
        />
      </div>
    );
}

export default Paginator;
