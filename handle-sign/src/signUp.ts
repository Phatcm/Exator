interface User {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
}
const signUp = (user: User): any => {
  //check password === passwordConfirm
  //encode password
  //save user to dynamodb
  //send email welcome
  //return
};

export default signUp;
