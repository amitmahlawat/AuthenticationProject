import { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../store/auth-context';
import { useHistory } from 'react-router-dom';

const ProfileForm = () => {
  const history=useHistory();
  const authCtx=useContext(AuthContext)
  const enteredPasswordRef=useRef();
  const SubmitHandler=(event)=>{
    event.preventDefault();
    const enteredNewPassword=enteredPasswordRef.current.value;
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyClZNmJUMIdt_s-o4AAFKLhV7Ua1ptqeDw',
    {
      method:"POST",
      body:JSON.stringify(
        {
          idToken:authCtx.token,
          password:enteredNewPassword,
          returnSecureToken:false
        }
      ),
      headers:{
        'Content-Type':"application/json"
      }
    }).then(res=>{
      if(res.ok){
        res.json().then(data=>{
          console.log(data)
          history.replace('/')
        })
      }else{
        res.json().then(data=>{
          console.log(data)
        })
      }
    })


  }
  return (
    <form className={classes.form} onSubmit={SubmitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength='7' ref={enteredPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
