import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { validateFriend } from '../friend/helper/Helper';
import { addfriend } from '../../../../redux/gruop/addGroupAction';
import { groupChange } from '../../../../redux/auth/action/authAction';
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

const Friend = ({ friendIsOpen, setFriendIsOpen }) => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  // const allUser = useSelector((reduxStore) => reduxStore.reduce.allUser);
  const groupId = useSelector((reduxStore) => reduxStore.groups.group_id);
  const groups = useSelector((reduxStore) => reduxStore.groups.group);

  // console.log(allUser);

  const handleSubmit = () => {
    setMessage(validateFriend(userName, groupId, groups));
    if (message !== '') return;
    dispatch(addfriend(userName));
    dispatch(groupChange(userName, groupId));
    setFriendIsOpen(false);
  };

  function afterOpenModal() {}
  function closeModal() {
    setFriendIsOpen(false);
  }
  return (
    <Modal
      isOpen={friendIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel='Example Modal'
    >
      <div className='login'>
        <i className='bi bi-person-square'></i>
        <h1>Friend Here !</h1>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          type='text'
          placeholder='userName *'
          required
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type='email'
          placeholder='Email Address *'
          required
        />
        <p style={{ color: 'red' }}>{message}</p>
        <button onClick={handleSubmit}>Friend</button>
      </div>
    </Modal>
  );
};

export default Friend;
