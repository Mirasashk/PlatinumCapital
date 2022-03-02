import axios from 'axios';

export const handleCreateUser = async (props) => {
  const data = new FormData(props.target);

  const userData = {
    email: data.get('email'),
    password: data.get('password'),
    firstName: data.get('fName'),
    lastName: data.get('lName'),
  };
  try {
    await axios.post('http://localhost:5000/auth/signup', userData);
  } catch (err) {
    console.log(err);
  }
};

export const handleDeleteUser = async (props) => {
  const email = {
    email: props.Email,
  };
  console.log(email);
  try {
    const userInfo = await axios.post(
      'http://localhost:5000/auth/user/',
      email
    );
    console.log(userInfo);
  } catch (err) {
    console.log(err);
  }
};
