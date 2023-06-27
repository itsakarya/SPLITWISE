import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './loginSignup.module.css';

const LoginSignUp = ({ setLoginIsOpen, setSignUpIsOpen }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const currentUser = useSelector(
    (reduxStore) => reduxStore.reduce.currentUser
  );

  useEffect(() => {
    if (
      currentUser !== null ||
      JSON.stringify(currentUser) !== JSON.stringify({})
    ) {
      setLoggedIn(true);
    }

    if (
      currentUser === null ||
      JSON.stringify(currentUser) === JSON.stringify({})
    )
      setLoggedIn(false);
  }, [currentUser]);

  if (currentUser === undefined) setLoggedIn(false);

  const openloginModal = () => {
    setLoginIsOpen(true);
  };

  const opensignupModal = () => {
    setSignUpIsOpen(true);
  };
  if (loggedIn)
    return (
      <>
        <h3>{currentUser?.name}</h3>
      </>
    );
  return (
    <div className={styles.navbar_btn}>
      <button onClick={openloginModal}>
        <i className='bi bi-person-lock'></i> LogIn
      </button>
      <button onClick={opensignupModal}>
        <i className='bi bi-person-add'></i> SignUp
      </button>
    </div>
  );
};

export default LoginSignUp;
