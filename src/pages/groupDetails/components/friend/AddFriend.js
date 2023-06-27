import React from 'react';

const AddFriend = ({ setFriendIsOpen }) => {
  const openfriendModal = () => {
    setFriendIsOpen(true);
  };

  return (
    <button className='btn' onClick={openfriendModal}>
      Add Friend
    </button>
  );
};
export default AddFriend;
