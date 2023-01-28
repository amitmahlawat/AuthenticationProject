import { useContext, useRef, useState } from 'react';
import AuthContext from '../store/auth-context';
import { useHistory } from 'react-router-dom';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const[IsLoading,SetIsLoading]=useState(false)
  const EmailInputRef=useRef()
  const PasswordInputRef=useRef()
  const authCtx=useContext(AuthContext);
  const history=useHistory();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const SubmitHandler=(event)=>{
    event.preventDefault();
   const EnteredEmail=EmailInputRef.current.value;
  const  EnteredPassword=PasswordInputRef.current.value;
  SetIsLoading(true)
    if(isLogin){
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyClZNmJUMIdt_s-o4AAFKLhV7Ua1ptqeDw',
      {
        method:"POST",
        body:JSON.stringify({
          email:EnteredEmail,
            password:EnteredPassword,
            returnSecureToken:true
        }),
        
          headers:{
            'Content-Type':'application/json'
          }
        }).then(res=>{
          SetIsLoading(false)
          if(res.ok){
            res.json().then(data=>{
              authCtx.login(data.idToken)
              history.replace('/')
            })
          }else{
            res.json().then(data=>{
              console.log(data)
            })
          }
        })
    }else{
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyClZNmJUMIdt_s-o4AAFKLhV7Ua1ptqeDw',
      {
        method:"POST",
        body:JSON.stringify(
          {
            email:EnteredEmail,
            password:EnteredPassword,
            returnSecureToken:true
          }),
          headers:{
            'Content-Type':'application/json'
          }
      }).then(res=>{
        SetIsLoading(false)
        if(res.ok){
          console.log('success')
        }else{
       return res.json().then(data=>{
            alert('Authentication failed')
          })
        }
      })
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={SubmitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required  ref={EmailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required  ref={PasswordInputRef}/>
        </div>
        <div className={classes.actions}>
          {!IsLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {IsLoading && <p>Loading....</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
