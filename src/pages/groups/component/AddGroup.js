import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { addgroup } from '../../../redux/gruop/addGroupAction';
import { setGroupId } from '../../../redux/auth/action/authAction';

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

const AddGroup = ({ addGroupOpen, setAddGroupOpen }) => {
  const [addGroupCreds, setAddGroupCreds] = useState({
    __group_id: '',
    __group_name: '',
  });
  const currentUser = useSelector(
    (reduxStore) => reduxStore.reduce.currentUser
  );
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const handleSubmit = () => {
    // console.log(currentUser.name);
    dispatch(
      addgroup(
        addGroupCreds.__group_id,
        addGroupCreds.__group_name,
        currentUser.name
      )
    );

    dispatch(setGroupId(addGroupCreds.__group_id, currentUser.name));

    // navigate('/group');
    setAddGroupOpen(false);
    // setAddGroupCreds(false);
  };
  function afterOpenModal() {}
  function closeModal() {
    setAddGroupOpen(false);
  }
  return (
    <Modal
      isOpen={addGroupOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel='Example Modal'
    >
      <div className='login'>
        <i className='bi bi-person-square'></i>
        <h1>Add Group !</h1>
        <input
          value={addGroupCreds.__group_id}
          onChange={(e) =>
            setAddGroupCreds((prev) => ({
              ...prev,
              __group_id: e.target.value,
            }))
          }
          type='text'
          placeholder='Group ID *'
          required
        />
        <input
          value={addGroupCreds.__group_name}
          onChange={(e) =>
            setAddGroupCreds((prev) => ({
              ...prev,
              __group_name: e.target.value,
            }))
          }
          type='text'
          placeholder='Group Name *'
          required
        />

        <button onClick={handleSubmit}>Add</button>
        {/* <navigate> Don't have account</navigate> */}
      </div>
    </Modal>
  );
};

export default AddGroup;
