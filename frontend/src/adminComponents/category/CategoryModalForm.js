import React, {useEffect, useRef, useState} from 'react';
import AdminService from "../../services/adminService";
import {useDispatch} from "react-redux";
import {setCategories} from "../../redux/dashboardSlice";

function CategoryModalForm({showModal, toast, data}) {
    const [categoryInput, setCategoryInput] = useState(null);
    const dispatch = useDispatch()
    const inputRef = useRef();
    useEffect(() => {
        inputRef.current.focus()
        if (data) {
            inputRef.current.value = data.categoryName
            setCategoryInput(data.categoryName)
        }
    }, []);


    const onInputHandle = (e) => {
        setCategoryInput(e.target.value)
    }
    const saveCategory = () => {
        if (data) {
            AdminService.updateCategory({id: data._id, categoryName: inputRef.current.value}).then((res) => {
                dispatch(setCategories(res.data))
                toast.info("Category successfully edited.")
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                showModal()
            })
        } else {
            AdminService.addCategory({categoryName: categoryInput})
                .then((res) => {
                    if (res.status === 200) {
                        dispatch(setCategories(res.data))
                        toast.info("Category added.")
                    } else if (res.status === 201) {
                        toast.warn("Category existing.")
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
                .finally(() => {
                    showModal()
                })
        }
    }

    return (
        <div className="add-category modal-box">
            <div className="modal-box-dialog bg-light p-4 rounded-3">
                <h5 className="text-center">{data ? "EDIT CATEGORY" : "ADD CATEGORY"}</h5>
                <div className="mt-3">
                    <label htmlFor="categoryName">Category name (required)</label>
                    <input ref={inputRef} className="form-control mt-1" type="text" id="categoryName"
                           name="categoryName"
                           onInput={onInputHandle}/>
                    <div className="d-flex gap-2 w-100">
                        <button disabled={categoryInput ? false : true} className="btn mt-3"
                                onClick={saveCategory}>Save
                        </button>
                        <button className="btn secondary-btn mt-3"
                                onClick={showModal}>Cancel
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default CategoryModalForm;