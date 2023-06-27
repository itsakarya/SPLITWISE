import React from 'react';
import GroupWiseSummary from './GroupWiseSummary';
import { useSelector } from 'react-redux';
import styles from './groupWiseSummary.module.css';

const DisplayGroup = () => {
  const groups = useSelector((reduxStore) => reduxStore.groups.group);

  return (
    <div className={styles.displayGroup}>
      {Object.keys(groups).map((key) => (
        <GroupWiseSummary group={groups[key]} />
      ))}
    </div>
  );
};

export default DisplayGroup;
