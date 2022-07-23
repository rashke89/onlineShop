import React, {useEffect, useState} from 'react';
import CategoryModalForm from "./CategoryModalForm";
import "./style.scss"
import AdminService from "../../services/adminService";
import {useDispatch, useSelector} from "react-redux";
import {setCategories} from "../../redux/dashboardSlice";
import {toast, ToastContainer} from "react-toastify";
import {showLoader} from "../../redux/loaderSlice";
import {FaRegEye} from "react-icons/fa";
import CategoryProductList from "./CategoryProductList";


function Category() {
    const {categories} = useSelector(state => state.dashboardStore)
    const [modalCategory, setModalCategory] = useState(false);
    const [modalCategoryProduct, setModalCategoryProduct] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null)

    const dispatch = useDispatch()

    const showCategoryModal = () => setModalCategory(!modalCategory)
    const showCategoryProductsModal = () => setModalCategoryProduct(!modalCategoryProduct)

    useEffect(() => {
        getCategories()
    }, [])

    const getCategories = () => {
        dispatch(showLoader(true))
        AdminService.getAllCategory()
            .then((res) => {
                dispatch(setCategories(res.data))
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                dispatch(showLoader(false))
            })
    }

    const addCategory = () => {
        setCurrentCategory(null)
        showCategoryModal()
    }

    const editCategory = (cat) => {
        setCurrentCategory(cat)
        showCategoryModal()
    }

    const deleteCategory = (index) => {
        if (categories[index].products?.length > 0) {
            toast.warning("This category have products, and can't delete!")
        } else {
            AdminService.deleteCategory(categories[index]._id).then((res) => {
                getCategories()
                toast.warning("Category deleted!")
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    const showCategoryProduct = (category) => {
        setCurrentCategory(category)
        showCategoryProductsModal()
    }

    const categoryListLayout = () => {
        return (
            <table className="table table-striped table-bordered table-hover table-dark table-responsive">
                <thead>
                <tr>
                    <th className="w-100">Category name</th>
                    <th className="w-100">Number products</th>
                    <th className="text-center">Action</th>
                </tr>
                </thead>
                <tbody>

                {categories.map((cat, index) => {
                    const existProducts = cat.products ? true : false
                    return (
                        <tr key={index}>
                            <td>{cat.categoryName}</td>
                            <td>{existProducts ? cat.products.length : 0}
                                <button className="btn-sm btn-info float-end" onClick={() => {
                                    showCategoryProduct(cat)
                                }}><FaRegEye/>
                                </button>
                            </td>
                            <td className="action-btn">
                                <button className="btn-sm btn-warning" onClick={() => {
                                    editCategory(cat)
                                }}>Edit
                                </button>
                                <button
                                    className="btn-sm btn-danger"
                                    onClick={() => deleteCategory(index)}>Delete
                                </button>
                            </td>
                        </tr>

                    )
                })}
                </tbody>
            </table>)


    }

    return (
        <div className="categories-wrapper col-md-12 ">
            <div className="my-3">
                <div className="d-flex justify-content-between w-100">
                    <h1 className="text-left">Categories</h1>
                    <button className="btn" onClick={addCategory}>Add</button>
                </div>
                <hr/>
            </div>


            <div className="categories-list">
                {categories.length ? categoryListLayout() : "Dont have category!"}
            </div>

            {modalCategory &&
                <CategoryModalForm showModal={showCategoryModal} toast={toast} data={currentCategory}/>}

            {modalCategoryProduct &&
                <CategoryProductList showModal={showCategoryProductsModal} category={currentCategory}/>}
            <ToastContainer/>
        </div>
    );
}

export default Category;
