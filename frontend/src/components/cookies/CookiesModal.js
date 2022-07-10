import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import './CookiesModal.scss'
import CookieSvg from './CookieSvg'

function CookiesModal() {
  const [modalShow, setModalShow] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setModalShow(true)
    }, 5000)
  }, [])

  const setCookie = (e) => {
    if (e.target.name === 'accept') {
      localStorage.setItem('cookie', true)
      setModalShow(false)
    }
    else if (e.target.name === 'decline') {
      localStorage.setItem('cookie', false)
    }
    setModalShow(false)
  }


  return (
    <>
      {modalShow && (
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          size='lg'
          aria-labelledby='contained-modal-title-vcenter'
          centered
        >
          <Modal.Header>
            <Modal.Title id='contained-modal-title-vcenter'>
              Cookie Privacy Policy
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4 className='display-4'>
              <div className='cookie-container'>
                {/* This our cookie */}
                <CookieSvg />
              </div>
            </h4>
            <h6>
              This website uses cookies to enhance the user expiriance. By
              clicking on "I Understand", you accept its use.
            </h6>
          </Modal.Body>
          <Modal.Footer>
            <Button
              name='decline'
              className='btn btn-lg btn-warning secondary-btn'
              onClick={setCookie}
            >
              I Decline
            </Button>
            <Button
              name='accept'
              className='btn btn-lg btn-danger'
              onClick={setCookie}
            >
              I Understand
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  )
}

export default CookiesModal
