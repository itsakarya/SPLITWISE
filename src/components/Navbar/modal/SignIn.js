import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { authAction } from '../../../redux/auth/action/authAction';
import { useSelector } from 'react-redux';
import { validateLoginUser } from './helper/helper';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: { background: 'rgba(0, 0, 0, 0.4)' },
};

const SignIn = ({ loginIsOpen, setLoginIsOpen }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const alluser = useSelector((reduxStore) => reduxStore.reduce.allUser);

  const handleSubmit = () => {
    dispatch(authAction(userName, password));
    const message = validateLoginUser(userName, password, alluser);

    setMessage(message);
    if (message === '') {
      setLoginIsOpen(false);
    }
  };

  function afterOpenModal() {}
  function closeModal() {
    setLoginIsOpen(false);
  }
  return (
    <Modal
      isOpen={loginIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div className='login'>
        <i className='bi bi-person-square'></i>
        <h1>SignIn Here !</h1>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          type='text'
          placeholder='UserName *'
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type='password'
          placeholder='Password *'
          required
        />
        <p style={{ color: 'red' }}>{message}</p>
        <button onClick={handleSubmit}>SignIn</button>
      </div>
    </Modal>
  );
};

export default SignIn;
