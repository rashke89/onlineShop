import {useEffect, useState} from "react";
import CommentService from "../../services/commentService";
import "./commentsStyle.scss";
import {Link} from "react-router-dom";
import {routeConfig} from "../../config/routeConfig";

function Comments() {
    const [comments, setComments] = useState([]);
    // const [comment,setComment] = useState({});

    useEffect(() => {
        getComments()
    }, []);

    const getComments = () => {
        CommentService.getAllComments()
            .then(res => {
                if (res.status === 200) {
                    setComments(res.data);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const deleteComment = (id) => {
        CommentService.deleteCommentById(id)
            .then(res => {
                if (res.status === 200) {
                    getComments();
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const changeCommentStatus = (comment) => {
        comment.comment_status === true ? comment.comment_status = false : comment.comment_status = true;
        CommentService.commentStatusUpdate(comment)
            .then(res => {
                if (res.status === 200) {
                     getComments();
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <>
            <div className="col-md-12 ">
                <div className="my-3">
                    <h1 className="text-center">Comments</h1>
                    <hr/>
                </div>
                <table className="table table-striped table-bordered table-hover table-dark">
                    <thead>
                    <tr>
                        <th>Product name</th>
                        <th>Author</th>
                        <th>Content</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {comments.map((comment, index) => {
                        return <tr key={index}>
                            <td><Link className="nav-link" to={routeConfig.AD_SHOP.realUrl(comment.comment_product_id)}>{comment.product_title}</Link></td>
                            <td>{comment.comment_author}</td>
                            <td className="comment_content">{comment.comment_content}</td>
                            <td>{comment.comment_date}</td>
                            <td className={`comment-status ${ comment.comment_status ? 'approved text-success' : 'unapproved text-warning'}`}
                                onClick={() => changeCommentStatus(comment)}>
                                {comment.comment_status ? 'Approved' : 'Unapproved'}
                            </td>
                            <td>
                                <button className="btn-outline-danger  px-2"
                                        onClick={() => deleteComment(comment._id)}>Delete
                                </button>
                            </td>
                        </tr>
                    })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Comments;
