import React from 'react';
import LoginSignUp from './LoginSignUp';
import styles from './navbar.module.css';

const Navbar = ({ setLoginIsOpen, setSignUpIsOpen }) => {
  return (
    <div>
      <div className={styles.navbar}>
        <i className='bi bi-pie-chart-fill'></i>
        <LoginSignUp
          setLoginIsOpen={setLoginIsOpen}
          setSignUpIsOpen={setSignUpIsOpen}
        />
      </div>
    </div>
  );
};

export default Navbar;
