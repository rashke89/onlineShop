import React, {useEffect, useState} from 'react';
import './Pagination.scss'

export const itemsPerPageList = [2,4,6,8];

const Pagination = ({ onPagination, totalItems }) => {
    const pageNumbers = [];
    const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageList[0]);
    const [stateCurrentPage, setStateCurrentPage] = useState(1);

    useEffect(() => {
        onPagination(returnPagination())
    }, [itemsPerPage]);

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const returnPagination = (setPage) => {
        setPage && setStateCurrentPage(setPage);
        return {
            currentPage: setPage || stateCurrentPage,
            itemsPerPage: Number(itemsPerPage)
        }
    }

    return (
        <>

            {pageNumbers.length>1 && <nav className='d-flex justify-content-center align-items-center'>
            <ul className='pagination'>

                <li className="pagination-item page-item">
                    <select className="form-select sort mx-3" defaultValue="0" aria-label="Sort"
                            onChange={(event) => {setItemsPerPage(event.target.value)}}>
                        {itemsPerPageList.map(item => <option value={item}>{item}</option>)}
                    </select>
                </li>
                <li className={`pagination-item page-item ${stateCurrentPage===1 && 'disabled'}`} >
                    <a className="page-link" href="#"
                       onClick={(e)=> onPagination(returnPagination(stateCurrentPage - 1))}
                    >Previous</a>
                </li>
                {pageNumbers.map(number => (
                    <li key={number} className={`pagination-item mx-1 ${stateCurrentPage===number? 'active-item':null}`}>
                        <a onClick={(e) => onPagination(returnPagination(number))} className='page-link'>
                            {number}
                        </a>
                    </li>
                ))}
                <li className={`pagination-item page-item ${stateCurrentPage===pageNumbers.length && 'disabled'}`}>
                    <a className="page-link" href="#" onClick={(e)=> onPagination(returnPagination(stateCurrentPage + 1))}>Next</a>
                </li>
            </ul>
        </nav>}
        </>
    );
};

export default Pagination;
