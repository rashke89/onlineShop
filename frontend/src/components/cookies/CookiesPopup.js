import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import {setAcceptCookies} from '../../redux/cookiesSlice'

export default function CookisPopup() {

    const [modalStyle, setModalStyle] = useState({
        display: 'block'
    })

    const dispatch = useDispatch()
    const onClickHandler = (e) => {
        if (e.target.name === "accept") {
            localStorage.setItem("accept", true)
            dispatch(setAcceptCookies())
        } else {
            setModalStyle({ display: 'none' });
    
        }
    }
  
  return (
      <div>
          <div className="modal" tabIndex="-1" style={modalStyle}> 
              <div className="modal-dialog">
                  <div className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title">Modal title</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClickHandler}></button>
                      </div>
                      <div className="modal-body">
                          <p>This website uses cookies.</p>
                      </div>
                      <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" name="upAccept" onClick={onClickHandler}>Close</button>
                          <button type="button" className="btn btn-primary" name="accept" onClick={onClickHandler}>Accept</button>
                      </div>
                  </div>
              </div>
          </div>
    </div>
  )
}
