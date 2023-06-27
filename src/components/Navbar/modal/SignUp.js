import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { signup } from '../../../redux/auth/action/authAction';
import { useSelector } from 'react-redux';
import { validatePerson } from './helper/helper';
import styles from './modal.module.css';
// import { filterUserIdFornewMember } from './helper/helper';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '35rem',
  },
  overlay: { background: 'rgba(0, 0, 0, 0.4)' },
};

const SignUp = ({ signUpIsOpen, setSignUpIsOpen }) => {
  const [signUpCreds, setSignUpCreds] = useState({
    userName: '',
    name: '',
    email: '',
    password: '',
    cpassword: '',
  });

  const alluser = useSelector((reduxStore) => reduxStore.reduce.alluser);
  // const groups = useSelector((reduxStore) => reduxStore.groups.group);
  // console.log(filterUserIdFornewMember(groups, signUpCreds.userName));
  // console.log(groups);
  const message = validatePerson(
    signUpCreds.password,
    signUpCreds.cpassword,
    alluser,
    signUpCreds.userName,
    signUpCreds.email
  );
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    if (message === '') {
      dispatch(
        signup(
          signUpCreds.userName,
          signUpCreds.name,
          signUpCreds.email,
          signUpCreds.password
        )
      );
    }

    console.log(signUpCreds);

    setSignUpIsOpen(false);
  };
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }
  function closeModal() {
    setSignUpIsOpen(false);
  }
  return (
    <Modal
      isOpen={signUpIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div className='login'>
        <i className='bi bi-person-bounding-box'></i>
        <h1>SignUp Here !</h1>
        <input
          className={styles.input}
          value={signUpCreds.userName}
          onChange={(e) =>
            setSignUpCreds((prev) => ({ ...prev, userName: e.target.value }))
          }
          type='text'
          placeholder='User name *'
          required
        />
        <input
          className={styles.input}
          value={signUpCreds.name}
          onChange={(e) => {
            setSignUpCreds((prev) => ({
              ...prev,
              name: e.target.value,
            }));
          }}
          type='text'
          placeholder='Name *'
          required
        />
        <input
          className={styles.input}
          value={signUpCreds.email}
          onChange={(e) =>
            setSignUpCreds((prev) => ({ ...prev, email: e.target.value }))
          }
          type='email'
          placeholder='Email Address *'
          required
        />
        <input
          className={styles.input}
          value={signUpCreds.password}
          onChange={(e) =>
            setSignUpCreds((prev) => ({ ...prev, password: e.target.value }))
          }
          type='password'
          placeholder='Password *'
          required
        />
        <input
          className={styles.input}
          value={signUpCreds.cpassword}
          onChange={(e) => {
            return setSignUpCreds((prev) => ({
              ...prev,
              cpassword: e.target.value,
            }));
          }}
          type='password'
          placeholder='Confirm-Password *'
          required
        />
        <p style={{ color: 'red' }}>{message}</p>
        <button onClick={handleSubmit}>SignUp</button>
      </div>
    </Modal>
  );
};

export default SignUp;
