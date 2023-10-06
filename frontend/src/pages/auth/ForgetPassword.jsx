import React,{useState} from 'react'
import Layout from '../../components/Layout'
import { message} from 'antd' // Import the message component
// import 'antd/dist/antd.css'; // Import Ant Design CSS
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


const ForgetPassword = () => {
  
  const [email, setEmail] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  
 
  const navigate = useNavigate();
  



  // form submit
  const handleSubmit =  async(e) =>{
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/v1/auth/forget-password`, {
        email: email,
        newPassword: newpassword,
        answer: answer,
      });
      // console.log('Response:', response);

      const data = response.data
      if (data.success) {
       
        message.success("Password Reset Successfully");
        navigate('/login')

      
        

      } else{
        message.error("User Not Login  Please Register First")
      }
     
      
    } catch (error) {
      console.log(error);
      console.log("Something went wrong");
      
    }
  }
  return (
    <Layout title = {"Register Ecommer App"}>
    <h1 className='flex items-center justify-center mt-3 font-mono text-2xl'>Reset Password</h1>
   <form className="flex flex-col w-full max-w-md flex-center justify-center  items-center m-auto mt-5" onSubmit={handleSubmit}>
   
    <input 
    type="email" 
    name="email" 
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="Your email" 
    required
    className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 m-10" />
   <input 
  type="password" // Change this to "password"
  name="newpassword" 
  value={newpassword}
  onChange={(e) => setNewPassword(e.target.value)}
  placeholder="Enter New password" 
  required
  className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
/>

     <input 
    type="text" 
    name="answer" 
    value={answer}
    onChange={(e) => setAnswer(e.target.value)}
    placeholder="Who is your Favorite Cricter" 
    required
    className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
   
    
    <button type="submit" className=" bg-black text-white text-sm rounded-lg py-2 px-4 hover:bg-blue-700">Reset Password</button>
    {/* <button type="submit" className=" bg-black text-white text-sm rounded-lg py-2 px-4 hover:bg-blue-700 mt-4" onClick={() => {navigate('/forget-pasword')}}>Forgot Password</button> */}
  </form>
    
  </Layout>
  )
}

export default ForgetPassword
