import { Fragment,useRef,useContext } from "react";
import AuthContext from "../../store/auth-context";
import classes from './VerifyEmailForm.module.css'

const VerifyEmailForm=()=>{

    // const emailInputRef=useRef();
    const AuthCtx=useContext(AuthContext);
  
    const submitHandler=(event)=>{
      event.preventDefault();
  
    // const enteredEmail=emailInputRef.current.value;
  
      fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCdVdERwY8R0pWYqhtuP3-j712UDKCGo78",
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: AuthCtx.token,
          requestType:"VERIFY_EMAIL"
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
        console.log("email verification send");
      })
      .catch((err) => {
        alert(err.message);
      });
  
    };

    return (
      <Fragment>   
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.action}>
          <label htmlFor="email-verification">First verify your mail here...   </label>
            <button>Verify Email</button>
          </div>
        </form>
      </Fragment>
    );
}
export default VerifyEmailForm;