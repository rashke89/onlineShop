import React from 'react';
import {Link} from "react-router-dom";
import {FaWindowClose} from "react-icons/fa";

function CategoryProductList({showModal, category}) {
    return (
        <div className="modal-box">
            <div className="modal-box-dialog w-75 p-4 rounded-3 bg-light">
                <div className="d-flex justify-content-between align-items-start">
                    <h3 className="w-100">{category.categoryName}</h3>
                    <button className="btn-sm btn-danger" onClick={showModal}><FaWindowClose/></button>
                </div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Details</th>
                    </tr>
                    </thead>
                    <tbody>
                    {category.products.map((el, index) => {
                        return (
                            <tr key={index}>
                                <th>{el.title}</th>
                                <th>{el.price}</th>
                                <th><a href={el.imgUrl} target="_blank">IMAGE</a></th>
                                <th><Link to={"/shop/ad/" + el._id} target="_blank">INFO</Link></th>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CategoryProductList;