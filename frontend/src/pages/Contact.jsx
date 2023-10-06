import React from 'react';
import Layout from '../components/Layout';
import image from '../images/contact.avif';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';


const Contact = () => {
  return (
    <Layout title={"Contact Us"}>
  <div className="flex flex-col md:flex-row items-center justify-center">
    {/* Left side with image */}
    <img src={image} alt="contact image" className="w-full md:w-1/2" />

    {/* Right side with heading and content */}
    <div className="w-full md:w-1/2 px-4 md:px-8 py-4">
      <h1 className="text-3xl font-semibold bg-black text-white p-2">
        <PhoneIcon className="mr-2" />
        Contact Us
      </h1>
      <p className="text-gray-600 mt-2">
        If you have any questions or need assistance, feel free to reach out to us!
      </p>
      <div className="flex items-center text-gray-600 mt-2">
        <PhoneIcon className="mr-2" />
        <span>03045571062</span>
      </div>
      <div className="flex items-center text-gray-600 mt-2">
        <EmailIcon className="mr-2" />
        <p className="bg-green-300 px-2 py-1 rounded">
          irfanghazlani786@gmail.com
        </p>
      </div>
    </div>
  </div>
</Layout>
  );
};
export default Contact
