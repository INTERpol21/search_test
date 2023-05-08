import React from 'react';
import "./index.scss";
interface PaginationProps {
    currentPage: number;
    cardsPerPage: number;
    totalCards: number;
    onPageChange: (page: number) => void;
    onCardsPerPageChange: (cardsPerPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
                                                   currentPage,
                                                   cardsPerPage,
                                                   totalCards,
                                                   onPageChange,
                                                   onCardsPerPageChange,
                                               }) => {
    // Calculate page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleChangeCardsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onCardsPerPageChange(parseInt(e.target.value));
    };

    const handleClickPrev = () => {
        onPageChange(currentPage - 1);
    };

    const handleClickNext = () => {
        onPageChange(currentPage + 1);
    };

    return (
        <div className="pagination">
            <div className="cards-per-page">
                <span>Cards per page:</span>
                <select value={cardsPerPage} onChange={handleChangeCardsPerPage}>
                    <option value={10}>10</option>
                    <option value={30}>30</option>
                    <option value={50}>50</option>
                </select>
            </div>
            <ul className="page-numbers">
                {currentPage > 1 && (
                    <li onClick={handleClickPrev}>
                        <i className="bi bi-chevron-compact-left"></i>
                    </li>
                )}
                {pageNumbers.map((number) => (
                    <li
                        key={number}
                        onClick={() => onPageChange(number)}
                        className={number === currentPage ? 'active' : ''}
                    >
                        {number}
                    </li>
                ))}
                {currentPage < pageNumbers.length && (
                    <li onClick={handleClickNext}>
                        <i className="bi bi-chevron-compact-right"></i>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Pagination;
