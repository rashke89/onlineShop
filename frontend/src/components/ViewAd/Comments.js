import {useEffect, useState} from "react";
import CommentService from "../../services/commentService";
import moment from "moment";
import {useRef} from 'react';

function Comments({productId, productTitle}) {
    const [comment, setComment] = useState({
        comment_product_id: productId,
        product_title: "",
        comment_author: "",
        comment_content: "",
        comment_date: moment().format('DD-MM-YYYY')
    });
    const [isValidForm, setIsValidForm] = useState(true);
    const [isApiErr, setIsApiErr] = useState(false);
    const [isApiFinish, setIsApiFinish] = useState(false);
    const [text, setText] = useState(false);
    //view comments
    const [comments, setComments] = useState([]);
    const nameRef = useRef(null);
    const commentRef = useRef(null);


    useEffect(() => {
        CommentService.getComments(productId)
            .then(res => {
                if (res.status === 200) {
                    setComments(res.data);
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    const onHandleInput = (e) => {
        let newInput = comment;
        newInput["product_title"] = productTitle;
        newInput[e.target.name] = e.target.value;
        setComment(newInput);
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        setText(true);
        setTimeout(() => setText(false), 2000);
        if (!comment.comment_content || !comment.comment_author || nameRef.current.value === '' || commentRef.current.value === '') {
            setIsValidForm(false);
            setIsApiFinish(false);
            return
        }
        setIsValidForm(true);
        CommentService.addComment(comment)
            .then(res => {
                if (res.status === 200) {
                    setIsApiErr(false);
                    setIsApiFinish(true);
                }
            })
            .catch(err => {
                console.log(err);
                setIsApiErr(true);
            })
        nameRef.current.value = '';
        commentRef.current.value = '';
    }


    return <>
        {/*{ADD COMMENT}*/}
        <div className="col-md-6">
            <h4>Leave a Comment:</h4>
            {!isValidForm && text ? <p className={`text-warning msg `}>All fields are required!</p> : null}
            {isApiFinish && text ? <p className={`text-success msg `}>Comment sent to verification!</p> : null}
            {isApiErr && text ? <p className={`text-danger msg `}>ERROR: Something went wrong , please try later!</p> : null}

            <form onSubmit={onSubmitForm} method="post">
                <label htmlFor="comment_author">Name</label>
                <input type="text" className="form-control" id="comment_author"
                       name="comment_author"
                       ref={nameRef}
                       onChange={onHandleInput}
                />
                <label htmlFor="comment_content">Comment</label>
                <textarea maxLength="500" className="form-control" id="comment_content"
                          name="comment_content"
                          ref={commentRef}
                          onChange={onHandleInput}
                />
                <button name="create_comment" className="btn my-3">Submit</button>
            </form>
        </div>
        {/*{SHOW COMMENT}*/}
        {comments && <div className="comments my-3">
            <h4 className="my-3">Comments({comments.length})</h4>
            {comments.map((comm, index) => {
                return <div className="comment col-md-6" key={index}>
                    <div className="comment-holder">
                        <div className="comment-header d-flex justify-content-between align-items-center">
                            <p className="author ">{comm.comment_author}</p>
                            <p className="date">{comm.comment_date}</p>
                        </div>
                        <hr/>
                        <div className="comment-body">
                            <p className="content ">{comm.comment_content}</p>
                        </div>
                    </div>
                </div>
            })}
        </div>}
    </>
}

export default Comments;