import classes from './ProfileForm.module.css';
import { useRef,useContext } from 'react';
// import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

const ProfileForm = () => {


  // const history=useHistory();
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
    }
    )
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((data) => {
          let erroMessage = "Authentication failed!";
          if (data && data.error && data.error.message) {
            erroMessage = data.error.message;
          }
          throw new Error(erroMessage);
        });
      }
    })
    .then((data) => {
      console.log("seccess to firebase");
    })
    .catch((err) => {
      alert(err.message);
    });

  };

  console.log(AuthCtx.profile.users[0].displayName,'profileform data')
  const getdata = AuthCtx.profile.users[0]

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.text}><h1>Complete Your Profile</h1><br/></div>
      <div className={classes.control}>
        <label htmlFor='name'>Your Name:</label>
        <input type='name' id='name' required ref={nameInputRef} defaultValue={getdata.displayName}/>
      </div>
      <div className={classes.control}>
        <label htmlFor='image-url'>Profile Photo Url:</label>
        <input type='text' id='image-url' required  ref={imageUrlRef} defaultValue={getdata.photoUrl}/>
      </div>
      <div className={classes.action}>
        <button>Update</button>
      </div>
    </form>
  );
}

export default ProfileForm;
