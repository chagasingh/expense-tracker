import React,{useState} from 'react';

const AuthContext=React.createContext({
  token:'',
  isLoggedIn:false,
  login:(token)=>{},
  logout:()=>{},
  data:'',

})

export const AuthContextProvider=(props)=>{

const initialToken=localStorage.getItem('token');
const initialProfileDetails=localStorage.getItem('profile');
const [token,setToken]=useState(initialToken);
const [profile,setProfile]= useState(initialProfileDetails)


const userIsLoggedIn =!!token;

const loginHandler=(token)=>{
  setToken(token)
  localStorage.setItem('token',token);
  console.log("User has successfully registered.")
  
};

const logoutHandler=()=>{
  setToken(null)
  localStorage.removeItem('token');
  localStorage.removeItem('profile');
};

const ProfileHandler =(data)=>{
  setProfile(data)
  localStorage.setItem('profile',data)
  console.log(data)
      }

const contextValue={
  token:token,
  isLoggedIn:userIsLoggedIn,
  login:loginHandler,
  logout:logoutHandler,
  ProfileDetails:ProfileHandler,
  profile:profile,
}
console.log(profile,'form auth provider')

return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}
export default AuthContext;

