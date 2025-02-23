import {  useState } from "react";
import {useCookies} from 'react-cookie'

const Auth = () => {
  const[cookies,setCookie,removeCookie] = useCookies(null)
  const[isLogIn,setIsLogin] = useState(true)
  const[email,setEmail] = useState(null)
  const[password,setPassword] = useState(null)
  const[confirmPassword,setConfirmPassword] = useState(null)
  const [error, setError] = useState(null)
  console.log(cookies)
  const viewLogin = (status) =>{
    setError(null)
    setIsLogin(status)
  }
  const handleSubmit = async(e,endPoint) =>{
    e.preventDefault()
    if(!isLogIn && password !== confirmPassword ){
      setError('Make sure password match!')
      return
    }

    const response = await fetch (`${process.env.REACT_APP_SERVERURL}/${endPoint}`,{
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body : JSON.stringify({email,password})
    })
    const data = await response.json()
    
    if(data.detail){
      setError(data.detail)
    }else{
      setCookie('Email',data.email)
      setCookie('AuthToken',data.token)
      setIsLogin(true)
    }
    
  }

    return (
      <div className="auth-container">
        <div className="auth-container-box">
        <form onSubmit={(e) => handleSubmit(e, isLogIn ? 'login' : 'signup')}>
  <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} required />
  <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} required />
  {!isLogIn && <input type="password" placeholder="confirm password" onChange={(e) => setConfirmPassword(e.target.value)} required />}
  <button type="submit" className="create">Submit</button>
</form>
          <div className="auth-options">
            <button onClick={() => viewLogin(false)} style={{backgroundColor : !isLogIn ? 'rgb(255,255,255)' : 'rgb(188,188,188)'}}>Sign Up</button>
            <button onClick={() => viewLogin(true)} style={{backgroundColor : isLogIn ? 'rgb(255,255,255)' : 'rgb(188,188,188)'}}>Login</button>
          </div>
        </div>
        
      </div>
    );
  }
  
  export default Auth
  