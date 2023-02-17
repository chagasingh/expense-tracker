import classes from './ProfileForm.module.css';
import { useRef,useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

const ProfileForm = () => {
  const history=useHistory();
  const newPasswordInputRef=useRef();
  const AuthCtx=useContext(AuthContext);

  const submitHandler=(event)=>{
    event.preventDefault();

    const enteredNewPassword=newPasswordInputRef.current.value;

    fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCdVdERwY8R0pWYqhtuP3-j712UDKCGo78",
    {
      method: 'POST',
      body: JSON.stringify({
        idToken: AuthCtx.token,
        password: enteredNewPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': "application/json",
      },
    }).then(res=>{
      //assume always succed
      history.replace('/')
    })

  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength='7' ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
