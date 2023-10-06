import React,{useState} from 'react'
import Layout from '../../components/Layout'
import { message} from 'antd' // Import the message component
// import 'antd/dist/antd.css'; // Import Ant Design CSS
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Register = () => {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [answer , setAnswer] = useState("")
  const navigate = useNavigate()



  // form submit
  const handleSubmit =  async(e) =>{
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/api/v1/auth/register`,{
        name,
        email,
        password,
        address,
        phone,
        answer
      });
      if(res.data.success){
        message.success("User Register Success");
        navigate('/login')

      } else{
        message.error("User Not Register Please Login First")
      }
     
      
    } catch (error) {
      console.log(error);
      console.log("Something went wrong");
      
    }
   
  }
  return (
    <Layout title = {"Register Ecommer App"}>
    <h1 className='flex items-center justify-center mt-3 font-mono text-2xl'>Register Here</h1>
   <form className="flex flex-col w-full max-w-md flex-center justify-center  items-center m-auto mt-5" onSubmit={handleSubmit}>
    <input type="text" 
    name="name" 
    placeholder="Your name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    required
    className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 sm:w-64" />
    <input 
    type="email" 
    name="email" 
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="Your email" 
    required
    className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 sm:w-64" />
    <input 
    type="password" 
    name="password" 
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Your password" 
    required
    className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 sm:w-64" />
    <input 
    type="text" 
    name="address" 
    value={address}
    onChange={(e) => setAddress(e.target.value)}
    placeholder="Your address" 
    required
    className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 sm:w-64" />
    <input 
    type="text" 
    name="phone" 
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    placeholder="Your phone number" 
    required
    className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 sm:w-64" />
    <input 
    type="text" 
    name="answer" 
    value={answer}
    onChange={(e) => setAnswer(e.target.value)}
    placeholder="Who is Your Favorite Crictor" 
    required
    className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 sm:w-64" />
    <button type="submit" className=" bg-black text-white text-sm rounded-lg py-2 px-4 hover:bg-blue-700 sm:w-full">
      Register
    </button>
  </form>
    
  </Layout>
  )
}

export default Register
