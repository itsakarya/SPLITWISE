import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getGroupId } from '../../redux/gruop/addGroupAction';
import styles from './group.module.css';

const Group = ({ setAddGroupOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addGroupModal = () => {
    setAddGroupOpen(true);
  };

  const gotodashboard = (groupID) => {
    dispatch(getGroupId(groupID));
    navigate('/groupDetails');
  };
  const groups = useSelector((reduxStore) => reduxStore.groups);
  const currentUser = useSelector(
    (reduxStore) => reduxStore.reduce.currentUser
  );
  return (
    <div className={styles.group__Container}>
      <div className={styles.container}>
        {currentUser?.groupID.map((key) => (
          <button onClick={() => gotodashboard(key)}>
            {groups.group[key]?.groupName}
            {/* think about it */}
          </button>
        ))}
      </div>
      <button className={styles.button} onClick={addGroupModal}>
        Add Group
      </button>
    </div>
  );
};

export default Group;
