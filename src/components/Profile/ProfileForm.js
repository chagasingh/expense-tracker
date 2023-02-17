import classes from './ProfileForm.module.css';
import { useRef,useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

const ProfileForm = () => {
  const history=useHistory();
  const nameInputRef=useRef();
  const imageUrlRef=useRef();
  const AuthCtx=useContext(AuthContext);

  const submitHandler=(event)=>{
    event.preventDefault();

    const enteredName=nameInputRef.current.value;
    const enteredImageUrl=imageUrlRef.current.value;

    fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCdVdERwY8R0pWYqhtuP3-j712UDKCGo78",
    {
      method: 'POST',
      body: JSON.stringify({
        idToken: AuthCtx.token,
        displayName: enteredName,
        photoUrl: enteredImageUrl,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': "application/json",
      },
    }).then(res=>{
      //assume always succed
      console.log("updated to firebase")
      history.replace('/home')
    })

  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.text}><h1>Complete Your Profile</h1><br/></div>
      <div className={classes.control}>
        <label htmlFor='name'>Your Name:</label>
        <input type='name' id='name' required ref={nameInputRef}/>
      </div>
      <div className={classes.control}>
        <label htmlFor='image-url'>Profile Photo Url:</label>
        <input type='text' id='image-url' required  ref={imageUrlRef}/>
      </div>
      <div className={classes.action}>
        <button>Update</button>
      </div>
    </form>
  );
}

export default ProfileForm;
