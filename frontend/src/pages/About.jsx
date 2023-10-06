import React from 'react';
import Layout from '../components/Layout';
import about from '../images/about.avif';

const About = () => {
  return (
    <Layout title={"About us! Ecommerce"}>
  <div className="flex flex-col md:flex-row">
    <img src={about} alt="about us" className="w-full md:w-1/2" />
    <h1 className="md:w-1/2 p-4 md:p-8">
      We're passionate about delivering quality products that enhance your lifestyle. With a wide range of products that cater to your diverse needs, we strive to provide a seamless online shopping experience.
    </h1>
  </div>
</Layout>
  );
};

Layout.defaultProps = {
  title: "Ecommerce App - Shop now",
  description: "MERN stack project",
  keywords: "React, Node, Express, MongoDB",
  author: "Irfan"
};

export default About;
