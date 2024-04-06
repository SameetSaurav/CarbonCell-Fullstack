import axios from "axios"
import { useContext, useState } from "react"
import { UserContext } from "../UserContext"

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoginOrRegister, setIsLoginOrRegister] = useState('register')
  const {setUsername: setLoggedInUsername, setId} = useContext(UserContext)

  async function handleSubmit(ev) {
    ev.preventDefault();

    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }
    
    const url = isLoginOrRegister === 'register' ? "/api/register" : "/api/login"
    try {
      const {data} = await axios.post(url, {username,password})
      setLoggedInUsername(username)
      setId(data.id)
    } catch (error) {
      if (error.response && error.response.status === 400 ) {
        alert("User already exists. Please choose a different username.");
      }else if (error.response && error.response.status === 401) {
        alert("Invalid credentials. Please check your username and password.");
      }else {
        console.error("Error:", error);
      }
      
    }
  }

  return (
    <div>
      <div className="bg-blue-50 h-screen flex items-center ">
        <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
          <input value={username} onChange={ev => setUsername(ev.target.value)} className = "block w-full p-2 mb-2 rounded-sm border" type="text" placeholder="Username" />
          <input value={password} onChange={ev => setPassword(ev.target.value)} className = "block w-full p-2 mb-2 rounded-sm border" type="password" placeholder="Password" />
          <button className='bg-blue-500 text-white block w-full rounded-sm'>
            {isLoginOrRegister === 'register' ? 'Register' : 'Login'} 
          </button>
          <div className="mt-2 text-center">
            {isLoginOrRegister === 'login' && (
              <div>Don't have an account? <button onClick={() => setIsLoginOrRegister('register')}>Register here</button></div>
            )}
            {isLoginOrRegister === 'register' && (
              <div>Already have an account? <button onClick={() => setIsLoginOrRegister('login')}>Login here</button></div>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register