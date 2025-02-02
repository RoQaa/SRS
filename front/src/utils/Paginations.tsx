import { Href } from "@/Constant";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PaginationDynamic = ({totalPages, currentPage, setCurrentPage}:any) => {
  const handlePageChange = (page: number) => setCurrentPage(page);

  const handlePreviousButton = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    currentPage !== 1 ? handlePageChange(currentPage - 1) : null;
  };

  const handleNextButton = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    currentPage !== totalPages ? handlePageChange(currentPage + 1) : null;
  };

  return (
    <Pagination className="d-flex justify-content-end mt-2">
      <PaginationItem onClick={handlePreviousButton} disabled={currentPage === 1}>
        <PaginationLink href={Href} previous>Previous</PaginationLink>
      </PaginationItem>

      {Array.from({ length: totalPages }, (_, index) => (
        <PaginationItem key={index} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
          <PaginationLink href={Href}>{index + 1}</PaginationLink>
        </PaginationItem>
      ))}

      <PaginationItem onClick={handleNextButton} disabled={currentPage === totalPages}>
        <PaginationLink href={Href} next>Next</PaginationLink>
      </PaginationItem>
    </Pagination>
  );
};

export default PaginationDynamic;
