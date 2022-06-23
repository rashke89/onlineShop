import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import './CookiesModal.scss'

function CookiesModal() {
  const [modalShow, setModalShow] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setModalShow(true)
    }, 5000)
  }, [])

  const onClickUnderstand = (e) => {
    if (e.target.name === 'accept') {
      localStorage.setItem('accept', true)
      setModalShow(false)
    }
  }

  const onClickDeckline = (e) => {
    if (e.target.name === 'decline') {
      localStorage.setItem('accept', false)
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
              Cookies Privacy Policy
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4 className='display-4'>
              <div className='cookie-container'>
                {/* This our cookie */}
                <svg
                  className='cookie'
                  width='98'
                  height='98'
                  viewBox='0 0 98 98'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <g id='cookies-svgrepo-com 1' clip-path='url(#clip0_1_4)'>
                    <g>
                      <path
                        id='Vector'
                        d='M91.8045 47.5377L87.1455 48.4694C85.5951 48.7795 84.0369 47.9731 83.3947 46.5282L78.4042 35.2991C77.9817 34.3484 77.1449 33.6456 76.1358 33.3931L73.5359 32.7433C72.0315 32.3672 70.9763 31.0157 70.9763 29.4649V11.4467C70.9763 10.6047 70.6618 9.79291 70.0947 9.17046L63.8177 2.28251C58.1584 0.490378 52.0579 -0.309126 45.7154 0.108522C21.3389 1.71442 1.5917 21.5441 0.104278 45.9279C-1.6312 74.382 20.9314 98 49.0105 98C75.7926 98 97.5423 76.5099 97.9894 49.8343L93.9787 47.829C93.3065 47.4927 92.5414 47.3903 91.8045 47.5377Z'
                        fill='#FFE6A1'
                      />
                      <g id='Group'>
                        <path
                          id='Vector_2'
                          d='M64.2174 82.793C63.92 82.793 63.6269 82.7759 63.3308 82.7706C61.4742 84.8533 58.7788 86.1722 55.7691 86.1722C51.3361 86.1722 47.5777 83.3222 46.2001 79.3586C40.1366 76.9589 34.6673 73.3888 30.0709 68.9198C29.3755 69.1294 28.6534 69.2757 27.8896 69.2757C23.6904 69.2757 20.2862 65.8715 20.2862 61.6722C20.2862 60.2057 20.7211 58.8484 21.4404 57.687C21.3889 57.5949 21.334 57.5055 21.2829 57.4131C16.0087 57.0555 11.8381 52.6752 11.8381 47.3103C11.8381 44.1484 13.2863 41.3261 15.5547 39.4668C15.3397 37.6042 15.2174 35.7135 15.2174 33.793C15.2174 24.1559 18.0108 15.1764 22.8157 7.59825C9.11365 16.2858 0.0105591 31.5751 0.0105591 49C0.0105591 76.062 21.9486 98 49.0106 98C66.4354 98 81.7246 88.8969 90.4123 75.1949C82.8342 79.9998 73.8547 82.793 64.2174 82.793Z'
                          fill='#FFD796'
                        />
                        <path
                          id='Vector_3'
                          d='M38.0279 40.5517C40.3608 40.5517 42.252 38.6605 42.252 36.3276C42.252 33.9946 40.3608 32.1034 38.0279 32.1034C35.6949 32.1034 33.8037 33.9946 33.8037 36.3276C33.8037 38.6605 35.6949 40.5517 38.0279 40.5517Z'
                          fill='#FFD796'
                        />
                        <path
                          id='Vector_4'
                          d='M82.8037 68.431C85.1367 68.431 87.0279 66.5398 87.0279 64.2068C87.0279 61.8739 85.1367 59.9827 82.8037 59.9827C80.4708 59.9827 78.5796 61.8739 78.5796 64.2068C78.5796 66.5398 80.4708 68.431 82.8037 68.431Z'
                          fill='#FFD796'
                        />
                        <path
                          id='Vector_5'
                          d='M44.364 68.431C45.997 68.431 47.3209 67.1072 47.3209 65.4741C47.3209 63.8411 45.997 62.5173 44.364 62.5173C42.731 62.5173 41.4072 63.8411 41.4072 65.4741C41.4072 67.1072 42.731 68.431 44.364 68.431Z'
                          fill='#FFD796'
                        />
                        <path
                          id='Vector_6'
                          d='M67.1744 41.3964C68.8075 41.3964 70.1313 40.0726 70.1313 38.4395C70.1313 36.8065 68.8075 35.4827 67.1744 35.4827C65.5414 35.4827 64.2176 36.8065 64.2176 38.4395C64.2176 40.0726 65.5414 41.3964 67.1744 41.3964Z'
                          fill='#FFD796'
                        />
                        <path
                          id='Vector_7'
                          d='M55.3469 15.2068C56.9799 15.2068 58.3037 13.883 58.3037 12.25C58.3037 10.617 56.9799 9.29315 55.3469 9.29315C53.7138 9.29315 52.39 10.617 52.39 12.25C52.39 13.883 53.7138 15.2068 55.3469 15.2068Z'
                          fill='#FFD796'
                        />
                      </g>
                      <g id='Group_2'>
                        <path
                          id='Vector_8'
                          d='M46.5517 43.5231L44.5984 46.7787C43.4308 48.7246 44.4752 51.2454 46.6765 51.7957L52.4907 53.2492C54.3014 53.7019 56.1362 52.6011 56.5887 50.7904L57.2538 48.1299C57.3884 47.5916 57.3884 47.0289 57.2538 46.4907L56.5506 43.6776C56.1132 41.9275 54.3783 40.8296 52.6095 41.1834L48.7868 41.9478C47.8531 42.1348 47.0417 42.7068 46.5517 43.5231Z'
                          fill='#B97850'
                        />
                        <path
                          id='Vector_9'
                          d='M56.3045 64.4413L54.2673 67.8365C53.2546 69.5245 53.8931 71.7175 55.6537 72.5977L62.1389 75.8403C64.0725 76.8073 66.4042 75.7347 66.9286 73.6375L67.5967 70.9654L68.3774 67.8419C68.8634 65.8979 67.5607 63.9603 65.5767 63.6769L59.6797 62.8343C58.3341 62.6421 57.0039 63.2755 56.3045 64.4413Z'
                          fill='#B97850'
                        />
                        <path
                          id='Vector_10'
                          d='M20.7509 44.2834L18.2648 48.4271C17.467 49.7568 17.6766 51.4588 18.7729 52.5554L22.6857 56.4683C24.1099 57.8926 26.4558 57.7626 27.7141 56.1898L31.0685 51.9967C31.7273 51.1732 31.9639 50.0893 31.708 49.066L30.9429 46.0058C30.6262 44.7387 29.6079 43.7679 28.3274 43.5116L24.3113 42.7085C22.911 42.4283 21.4857 43.0587 20.7509 44.2834Z'
                          fill='#B97850'
                        />
                        <path
                          id='Vector_11'
                          d='M34.5088 16.8474L32.5917 20.0427C31.4794 21.8965 32.3699 24.3036 34.4208 24.9873L38.581 26.3741C39.7953 26.7787 41.134 26.4627 42.0391 25.5577L44.2784 23.3184C45.1177 22.4791 45.4552 21.2608 45.1673 20.1093L44.5816 17.7667C44.2055 16.2621 42.8538 15.2066 41.303 15.2066H37.4063C36.2196 15.2068 35.1196 15.8297 34.5088 16.8474Z'
                          fill='#B97850'
                        />
                        <path
                          id='Vector_12'
                          d='M75.3214 42.965L73.3655 44.921C72.0459 46.2405 72.0459 48.3802 73.3655 49.7L74.3227 50.6572C75.3513 51.6858 76.9224 51.9408 78.2235 51.2902L83.7584 48.5228C85.175 47.8144 85.9098 46.2173 85.5257 44.6807L85.2749 43.678C84.8376 41.9279 83.1027 40.83 81.3339 41.1838L77.0485 42.0409C76.3941 42.1714 75.7933 42.4932 75.3214 42.965Z'
                          fill='#B97850'
                        />
                        <path
                          id='Vector_13'
                          d='M62.7562 18.8451L60.512 21.8375C59.6876 22.9366 59.6108 24.4257 60.3177 25.6038L62.3943 29.0646C63.3869 30.7192 65.5611 31.208 67.1664 30.1379L71.3831 27.3267C72.9974 26.2506 73.376 24.0393 72.2121 22.4874L69.9198 19.431C69.5073 18.8811 68.9371 18.4699 68.285 18.2527L66.5282 17.667C65.1482 17.2067 63.6288 17.6813 62.7562 18.8451Z'
                          fill='#B97850'
                        />
                        <path
                          id='Vector_14'
                          d='M33.8385 72.2339L31.632 74.992C30.2154 76.7627 30.9104 79.3984 33.0158 80.2408L35.9798 81.4263C36.7856 81.7487 37.6842 81.7487 38.4899 81.4263L41.8161 80.0957C43.809 79.2987 44.5636 76.8695 43.373 75.0835L42.8017 74.2266C42.4753 73.7372 42.0272 73.3417 41.5013 73.0785L37.989 71.3224C36.5632 70.6098 34.8338 70.9897 33.8385 72.2339Z'
                          fill='#B97850'
                        />
                      </g>
                      <g id='Group_3'>
                        <path
                          id='Vector_15'
                          d='M26.8788 56.0669L22.9661 52.1542C21.8697 51.0578 21.6599 49.3556 22.4579 48.0261L24.9441 43.8824C25.1561 43.529 25.4364 43.2421 25.7462 42.9956L24.3115 42.7089C22.9111 42.4288 21.4857 43.0593 20.7509 44.2837L18.2648 48.4275C17.467 49.7572 17.6766 51.4592 18.7729 52.5558L22.6857 56.4685C24.0058 57.7886 26.107 57.7568 27.4105 56.4951C27.2237 56.3712 27.0438 56.2321 26.8788 56.0669Z'
                          fill='#A5694B'
                        />
                        <path
                          id='Vector_16'
                          d='M41.9655 25.1711L37.8052 23.7845C35.7545 23.1008 34.8637 20.6937 35.9762 18.8399L37.8933 15.6446C37.9907 15.4819 38.1195 15.3481 38.2403 15.2068H37.4062C36.2193 15.2068 35.1192 15.8297 34.5085 16.8476L32.5913 20.0427C31.4789 21.8965 32.3693 24.3036 34.4204 24.9873L38.5806 26.3741C39.7949 26.7787 41.1336 26.4627 42.0388 25.5577L42.3536 25.2428C42.2242 25.2161 42.0929 25.2136 41.9655 25.1711Z'
                          fill='#A5694B'
                        />
                        <path
                          id='Vector_17'
                          d='M55.6969 52.2776L49.8828 50.8241C47.6812 50.2736 46.6369 47.753 47.8047 45.8072L49.758 42.5515C49.9905 42.1639 50.2995 41.8368 50.6557 41.5744L48.7868 41.9482C47.8533 42.1348 47.0415 42.707 46.5517 43.5235L44.5984 46.7791C43.4308 48.725 44.4752 51.2458 46.6765 51.7961L52.4907 53.2496C53.7155 53.5559 54.9405 53.1401 55.7519 52.2859C55.7335 52.2813 55.7153 52.2822 55.6969 52.2776Z'
                          fill='#A5694B'
                        />
                        <path
                          id='Vector_18'
                          d='M65.5507 28.7724L63.4741 25.3116C62.7673 24.1335 62.844 22.6447 63.6684 21.5453L65.9126 18.553C66.1584 18.2251 66.4635 17.9683 66.7943 17.7552L66.528 17.6666C65.148 17.2067 63.6286 17.6813 62.7558 18.8449L60.5117 21.8372C59.6873 22.9364 59.6106 24.4254 60.3175 25.6035L62.394 29.0643C63.3834 30.7132 65.5457 31.2023 67.1493 30.1463C66.5068 29.8789 65.9379 29.4176 65.5507 28.7724Z'
                          fill='#A5694B'
                        />
                        <path
                          id='Vector_19'
                          d='M77.0347 50.4321C75.715 49.1123 75.715 46.9728 77.0347 45.6531L78.9907 43.6971C79.4623 43.2255 80.0632 42.9037 80.7176 42.773L84.3246 42.0516C83.5529 41.3181 82.4509 40.96 81.3337 41.1835L77.0483 42.0407C76.3941 42.1716 75.7933 42.4931 75.3214 42.9648L73.3655 44.9207C72.0459 46.2405 72.0459 48.38 73.3655 49.6998L74.3227 50.657C75.2876 51.6219 76.7231 51.8747 77.9718 51.3696L77.0347 50.4321Z'
                          fill='#A5694B'
                        />
                        <path
                          id='Vector_20'
                          d='M59.8399 72.3143C58.0794 71.434 57.4406 69.241 58.4536 67.553L60.4907 64.158C60.7579 63.713 61.1355 63.3756 61.552 63.1021L59.6801 62.8347C58.3341 62.6423 57.004 63.2755 56.3046 64.4413L54.2675 67.8365C53.2548 69.5245 53.8933 71.7175 55.6539 72.5977L62.1391 75.8403C63.4317 76.4867 64.8904 76.2077 65.8797 75.3345L59.8399 72.3143Z'
                          fill='#A5694B'
                        />
                        <path
                          id='Vector_21'
                          d='M39.359 80.8615L36.3951 79.6759C34.2898 78.8339 33.5948 76.1979 35.0113 74.4272L37.2178 71.669C37.3579 71.4939 37.5152 71.3408 37.6814 71.2006C36.3212 70.6798 34.764 71.0768 33.8385 72.2339L31.632 74.992C30.2154 76.7627 30.9104 79.3984 33.0158 80.2408L35.9798 81.4263C36.7856 81.7487 37.6842 81.7487 38.4899 81.4263L39.6722 80.9534C39.5675 80.9229 39.4609 80.9023 39.359 80.8615Z'
                          fill='#A5694B'
                        />
                      </g>
                      <path
                        id='Vector_22'
                        d='M13.5258 69.2741C13.2725 69.2741 13.0141 69.2165 12.7718 69.0959C11.9369 68.6785 11.5985 67.6638 12.0162 66.8289L13.7059 63.4496C14.1235 62.6147 15.1357 62.2798 15.9729 62.694C16.8078 63.1116 17.1462 64.1261 16.7286 64.961L15.0388 68.3402C14.7427 68.9325 14.1463 69.2741 13.5258 69.2741Z'
                        fill='#C98850'
                      />
                      <path
                        id='Vector_23'
                        d='M43.9415 91.2413H42.2517C41.3186 91.2413 40.562 90.4856 40.562 89.5515C40.562 88.6176 41.3186 87.8618 42.2517 87.8618H43.9415C44.8746 87.8618 45.6312 88.6175 45.6312 89.5515C45.6312 90.4856 44.8746 91.2413 43.9415 91.2413Z'
                        fill='#925F4A'
                      />
                      <path
                        id='Vector_24'
                        d='M37.1812 59.1378C36.928 59.1378 36.6696 59.0802 36.4273 58.9596C35.5924 58.542 35.254 57.5273 35.6716 56.6926L37.3613 53.3133C37.778 52.4801 38.7904 52.1435 39.6284 52.5577C40.4633 52.9753 40.8017 53.9898 40.384 54.8247L38.6943 58.204C38.3982 58.7964 37.8016 59.1378 37.1812 59.1378Z'
                        fill='#C98850'
                      />
                      <g id='Group_4'>
                        <path
                          id='Vector_25'
                          d='M27.0434 32.1034C26.7902 32.1034 26.5318 32.0458 26.2895 31.9252L22.9102 30.2355C22.0753 29.8178 21.7369 28.8034 22.1545 27.9685C22.5712 27.1353 23.5843 26.7969 24.4215 27.2128L27.8008 28.9023C28.6357 29.32 28.9741 30.3344 28.5565 31.1694C28.2604 31.7618 27.6638 32.1034 27.0434 32.1034Z'
                          fill='#925F4A'
                        />
                        <path
                          id='Vector_26'
                          d='M47.321 8.4481H43.9417C43.0086 8.4481 42.252 7.69243 42.252 6.75837C42.252 5.82431 43.0086 5.06863 43.9417 5.06863H47.321C48.2541 5.06863 49.0107 5.82431 49.0107 6.75837C49.0107 7.69243 48.2541 8.4481 47.321 8.4481Z'
                          fill='#925F4A'
                        />
                      </g>
                      <path
                        id='Vector_27'
                        d='M54.0813 33.793C53.4607 33.793 52.8643 33.4515 52.5682 32.8591L50.8785 29.4798C50.4608 28.6449 50.7992 27.6301 51.6341 27.2128C52.4708 26.7969 53.4846 27.1353 53.9011 27.9685L55.5909 31.3478C56.0085 32.1827 55.6701 33.1975 54.8352 33.6148C54.5925 33.7354 54.3345 33.793 54.0813 33.793Z'
                        fill='#C98850'
                      />
                      <g id='Group_5'>
                        <path
                          id='Vector_28'
                          d='M7.711 42.0667C7.4838 41.9547 7.27766 41.7888 7.11324 41.5734C6.54859 40.83 6.69387 39.7702 7.43748 39.2057L10.4468 36.9211C11.1896 36.3563 12.2487 36.5029 12.8145 37.2454C13.3791 37.9888 13.2338 39.0486 12.4902 39.613L9.48112 41.8975C8.95342 42.2979 8.26742 42.3408 7.711 42.0667Z'
                          fill='#925F4A'
                        />
                        <path
                          id='Vector_29'
                          d='M70.9761 60.8276C70.5437 60.8276 70.1113 60.6626 69.7815 60.3326L66.4023 56.9533C65.7423 56.2933 65.7423 55.2239 66.4023 54.564C67.0622 53.904 68.1316 53.904 68.7916 54.564L72.1709 57.9433C72.8308 58.6032 72.8308 59.6726 72.1709 60.3326C71.8407 60.6626 71.4083 60.8276 70.9761 60.8276Z'
                          fill='#925F4A'
                        />
                      </g>
                      <path
                        id='Vector_30'
                        d='M74.3554 77.7242C73.9231 77.7242 73.4907 77.5592 73.1609 77.2292C72.5009 76.5692 72.5009 75.4998 73.1609 74.8399L74.8506 73.1501C75.5106 72.4902 76.58 72.4902 77.2399 73.1501C77.8999 73.8101 77.8999 74.8795 77.2399 75.5395L75.5502 77.2292C75.22 77.5592 74.7878 77.7242 74.3554 77.7242Z'
                        fill='#C98850'
                      />
                    </g>
                    <g id='crumbs'>
                      <g id='Group_6'>
                        <path
                          id='Vector_31'
                          d='M77.7346 6.75855V11.0215C77.7346 12.2171 78.9418 13.0344 80.0518 12.5903L85.1208 10.5627C85.7622 10.3061 86.1829 9.68477 86.1829 8.99398V6.75855C86.1829 5.82545 85.4263 5.06882 84.4932 5.06882H79.4242C78.4912 5.06882 77.7346 5.82545 77.7346 6.75855Z'
                          fill='#FFE6A1'
                        />
                        <path
                          id='Vector_32'
                          d='M81.347 20.0793L80.2688 27.6272C80.0152 29.4027 81.1929 31.0671 82.9514 31.4187L86.0458 32.0376C87.3887 32.3063 88.7607 31.7378 89.5204 30.5984L90.6842 28.8528C91.2869 27.9484 91.4182 26.8093 91.0366 25.7918L87.5114 16.3916C87.0729 15.2225 85.5732 14.8977 84.6903 15.7807L82.3031 18.1677C81.7859 18.6847 81.4506 19.3556 81.347 20.0793Z'
                          fill='#FFE6A1'
                        />
                      </g>
                      <g id='Group_7'>
                        <path
                          id='Vector_33'
                          d='M89.818 29.0361L86.7235 28.4173C84.9649 28.0655 83.7874 26.401 84.041 24.6258L85.1192 17.078C85.2154 16.4049 85.5294 15.7901 85.986 15.2897C85.5274 15.2666 85.0566 15.4141 84.6904 15.7801L82.303 18.1673C81.786 18.6843 81.4505 19.3552 81.3473 20.0789L80.2691 27.6266C80.0155 29.4023 81.1932 31.0666 82.9517 31.4182L86.0461 32.037C87.3889 32.3054 88.7611 31.7373 89.5208 30.5978L90.5388 29.0708C90.2992 29.0756 90.0594 29.0846 89.818 29.0361Z'
                          fill='#FFD796'
                        />
                        <path
                          id='Vector_34'
                          d='M83.4311 9.21085C82.3212 9.65472 81.114 8.83741 81.114 7.64208V5.06882H79.4242C78.4911 5.06882 77.7345 5.82545 77.7345 6.75855V11.0215C77.7345 12.2171 78.9417 13.0344 80.0517 12.5903L85.1207 10.5627C85.7621 10.3061 86.1828 9.68496 86.1828 8.99398V8.11026L83.4311 9.21085Z'
                          fill='#FFD796'
                        />
                        <path
                          id='Vector_35'
                          d='M90.4047 36.8501L89.4059 38.8476C89.1682 39.3233 89.1682 39.8831 89.4059 40.3588L89.8616 41.2706C90.3162 42.1796 91.4645 42.4847 92.3101 41.921L95.034 40.1052C95.5041 39.7916 95.7864 39.2641 95.7864 38.6993V36.8788C95.7864 35.7256 94.6566 34.9112 93.5625 35.276L91.3814 36.0029C90.9565 36.1444 90.6051 36.4491 90.4047 36.8501Z'
                          fill='#FFD796'
                        />
                      </g>
                    </g>
                  </g>
                  <defs></defs>
                </svg>
              </div>
            </h4>
            <h6>
              This website uses cookies to enhance the user expiriance. By
              clicking on "I Understand", you accept its use.
            </h6>

            {/* <h5>
              We use cookies to understand visitors and create a better
              experience for you. By clicking on "Accept", you accept its use.
              To find out more, please see our privacy policy.
            </h5> */}
          </Modal.Body>
          <Modal.Footer>
            <Button
              name='decline'
              className='btn btn-lg btn-warning'
              onClick={onClickDeckline}
            >
              I Decline
            </Button>
            <Button
              name='accept'
              className='btn btn-lg btn-danger'
              onClick={onClickUnderstand}
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
