import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './welcome.module.css';
const Welcome = ({ setIsSidebarOpen }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const currentUser = useSelector(
    (reduxStore) => reduxStore.reduce.currentUser
  );
  if (currentUser) {
    setIsSidebarOpen(true);
  }
  useEffect(() => {
    if (currentUser) {
      // console.log(currentUser);
      setLoggedIn(true);
    }
    if (loggedIn) {
      navigate('/home');
    }
  }, [currentUser, loggedIn, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.welcome}>
        <h1>Less stress when sharing expenses</h1>
        <h3>Split expenses with friends</h3>
      </div>
    </div>
  );
};

export default Welcome;
