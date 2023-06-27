import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import SignIn from './components/Navbar/modal/SignIn';

import SignUp from './components/Navbar/modal/SignUp';

import { BrowserRouter } from 'react-router-dom';
import Landing from './pages/Landing';

function App() {
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [signUpIsOpen, setSignUpIsOpen] = useState(false);

  return (
    <>
      <BrowserRouter>
        <SignIn loginIsOpen={loginIsOpen} setLoginIsOpen={setLoginIsOpen} />
        <SignUp signUpIsOpen={signUpIsOpen} setSignUpIsOpen={setSignUpIsOpen} />
        <Navbar
          setLoginIsOpen={setLoginIsOpen}
          setSignUpIsOpen={setSignUpIsOpen}
        />

        <Landing />
      </BrowserRouter>
    </>
  );
}

export default App;
