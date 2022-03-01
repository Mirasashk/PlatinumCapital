import axios from 'axios';

const handleCreateUser = async (props) => {
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

export default handleCreateUser;
