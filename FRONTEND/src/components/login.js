import axios from "axios";
import { useState , useContext} from "react";
import { Link, useNavigate } from "react-router-dom"
// import GlobalContext from "../GlobalContext";


export function Login({ setuserName, setIsLoggedIn }) {
  axios.defaults.withCredentials = true; 
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

//************************************************************************************ */
const loginwithgoogle = ()=> {
  window.open(`http://localhost:8080/auth/google/callback`,"_self");
  getUser();
}

// const [userdata,setuserdata] = useState({});
const navigate = useNavigate();
    //isme agar user data mila tabhi hi user loggedin hai warna nhi hai

    // useEffect(()=> {
    const getUser = async()=>{
        try {
            const res = await axios.get(`http://localhost:8080/login/success`,{withCredentials:true});
            console.log(res);

            // document.cookie = `accessToken=${res.data.accessToken}; path=/;`; 
            // document.cookie = `refreshToken=${res.data.refreshToken}; path=/;`;

            // setuserdata(res.data.user);
            console.log(res.data.accessToken);
            localStorage.setItem("accessToken",res.data.accessToken);
            setIsLoggedIn(true);
            // navigate("/home");

        } catch (error) {
            console.log(error)
        }
    }

        // getUser();
    // },[navigate,setIsLoggedIn])

//************************************************************************************ */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 

  const newemailValue = (e) => {
    setEmail(e.target.value);
  }

  const newpassvalue = (e) => {
    setPassword(e.target.value);
  }

  const funcTocallAfterSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(`/login`, { email, password }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Extract user and tokens from response
      const { user, accessToken, refreshToken } = result.data.data;

      // Set tokens in localStorage (optional, but can be useful)
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Set axios default headers for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      axios.defaults.headers.common['x-access-token'] = accessToken;

      // Update login state
      setuserName(user.username);
      setIsLoggedIn(true);

      // Navigate to home page
      navigate('/home');
    } catch (err) {
      console.error("Login Error:", err);
      // Handle login error (show message to user)
      alert(err.response?.data?.message || "Login failed");
    }
  }
  return (
    <div className={`absolute bg-white h-5/6 w-4/6  left-56 top-16  rounded-xl  flex felx-row overflow-hidden z-50`}>
      <div className='w-1/2 flex flex-col justify-center items-center h-full rounded-xl bg-gradient-to-bl from-violet-800 via-fuchsia-800 to-pink-900 '>
        <div className="font-bold flex justify-center w-full text-white text-5xl">
          Welcome Back
        </div>
        <div className="font-bold flex justify-center w-full text-white  text-5xl">
          To
        </div>
        <div className="font-bold flex  justify-center w-full text-white  text-7xl">
          EQUITYELITE
        </div>
      </div>
      <div className='p-8 bg-white/40 h-full w-1/2'>
        <form onSubmit={funcTocallAfterSubmit}>
          <div className='h-8 w-full text-center bg-transparent font-extrabold text-pink-700 text-4xl pt-12'>Login</div>
          <div className='mt-24 bg-transparent text-left font-mono font-semibold text-lg text-black'>Email</div>
          <div>
            <input className='bg-transparent border-slate-900 border rounded-lg h-12 w-full
             focus:border-purple-600 pl-5 pr-5 focus:ring focus:ring-blue-700 focus:outline-none'
              type="email" value={email} onChange={newemailValue} placeholder="Enter the email"></input>
          </div>
          <div className='mt-6 bg-transparent text-left font-mono font-semibold text-lg text-black '>Password</div>
          <div>
            <input type="password" value={password} onChange={newpassvalue} placeholder="Enter the password" className='bg-transparent 
             focus:border-purple-600 pl-5 pr-5 focus:ring focus:ring-blue-700 focus:outline-none border-slate-900 border rounded-lg h-12 w-full' ></input>
          </div>
          <button type="submit" className='w-full h-12 mt-12 rounded-lg bg-green-600 text-white font-bold text-xl'>Login</button>
          <div className=' bg-transparent text-left font-mono font-semibold text-lg text-black'>New User?<Link to="/signup">signup</Link></div>
        </form>
        <div className="h-10 pt-5 flex justify-center text-xl mb-2">OR</div>
        <hr className="border-1 border-black" />
        <div className="flex justify-center h-20 ">
          <button className="bg-signinwithgoogle h-12 mt-2 w-60 bg-contain bg-center bg-no-repeat" onClick={loginwithgoogle}></button>
        </div>
      </div>
    </div>
  )
}
// isme to go to signup page agar maine sirf "signup" likha toh wo login/signup ho jayega lekin agar "/signup" likha toh wo localhost/signup hoga