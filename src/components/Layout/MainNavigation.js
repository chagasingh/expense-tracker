import { useContext,useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
    const AuthCtx=useContext(AuthContext)
    const isLoggedIn=AuthCtx.isLoggedIn;

  useEffect(() => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCdVdERwY8R0pWYqhtuP3-j712UDKCGo78",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: AuthCtx.token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        AuthCtx.ProfileDetails(data);
        console.log("use effect is running")
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [isLoggedIn]);


  const logoutHandler=()=>{
      AuthCtx.logout();
      }

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>{
            !isLoggedIn && (<li>
                <Link to='/auth'>Login</Link>
              </li>)}
              {isLoggedIn &&(<li>
            <Link to='/profile'>Profile</Link>
          </li>)}
          {isLoggedIn && (<li>
            <button onClick={logoutHandler}>Logout</button>
          </li>)}
          
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;