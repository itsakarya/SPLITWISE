// const validEmail = new RegExp('/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i');
const validatePerson = (password, cpassword, alluser, username, email) => {
  let message = '';
  const user = alluser?.find((x) => x.userName === username);
  // cconsole.log(username);
  if (user) {
    message = 'Username already exist';
    return message;
  }
  if (password !== cpassword) {
    message = "password didn't match";
    return message;
  }
  // console.log(email);
  // if (!validEmail.test(email)) {

  //   message = 'Email not matched';
  //   return message;
  // }

  return message;
};

const validateLoginUser = (userName, password, alluser) => {
  let message = '';
  const user = alluser[userName];
  if (!user) {
    message = 'Unregistered User';
    return message;
  }

  if (user.password !== password) {
    message = 'login Creds wrong';
    return message;
  }
  return message;
};

const filterUserIdFornewMember = (groups, userName) => {
  return Object.keys(groups)
    ?.forEach((key) => groups[key]?.members)
    ?.filter((username) => userName === username);
};

export { validatePerson, validateLoginUser, filterUserIdFornewMember };
