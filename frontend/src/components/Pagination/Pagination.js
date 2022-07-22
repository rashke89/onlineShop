import React from 'react';
import './Pagination.scss'

const Pagination = ({ itemsPerPage, totalItems, setCurrentPage, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            {pageNumbers.length>1 && <nav className='d-flex justify-content-center align-items-center'>
            <ul className='pagination'>

                <li className={`pagination-item page-item ${currentPage===1 && 'disabled'}`} >
                    <a className="page-link" href="#" onClick={()=>setCurrentPage(prevState=>prevState-1)}>Previous</a>
                </li>
                {pageNumbers.map(number => (
                    <li key={number} className={`pagination-item mx-1 ${currentPage===number? 'active-item':null}`}>
                        <a onClick={() => setCurrentPage(number)} className='page-link'>
                            {number}
                        </a>
                    </li>
                ))}
                <li className={`pagination-item page-item ${currentPage===pageNumbers.length && 'disabled'}`}>
                    <a className="page-link" href="#" onClick={()=>setCurrentPage(prevState=>prevState+1)}>Next</a>
                </li>
            </ul>
        </nav>}
        </>
    );
};

export default Pagination;