import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/Home.scss'; // Add your styles here
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="container py-5">
      {/* Hero Section */}
      <section className="hero text-center mb-5" data-aos="fade-up" data-aos-duration="1000">
  <h1 className="display-3 text-primary">Hi!</h1>
  <p className="lead">
    I'm a software engineer passionate about building interactive web applications and solving real-world problems.
  </p>
  <Link to="/projects" className="btn btn-primary">See My Work</Link>
</section>


      {/* Education Section */}
      <section className="mb-5" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="text-secondary">Education</h2>
        <p><strong>Purdue University</strong> | Indianapolis, IN</p>
        <p><strong>Bachelor of Science - Computer Information Technology</strong> | Expected May 2024</p>
        <ul className="list-unstyled">
          <li>Dean’s List 2021-2024</li>
          <li>Awarded Jaguar Transfer Excellence & Scholarship</li>
          <li>Tau Alpha Pi - National Honor Society for top 4% of Engineering Students</li>
        </ul>
      </section>

      {/* Professional Experience */}
      <section className="mb-5" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="text-secondary">Professional Experience</h2>

        <div className="mb-4">
          <h3>Software Engineering Intern - Visinsure</h3>
          <p>Aug 2023 - Dec 2023</p>
          <ul className="list-unstyled">
            <li>Implemented OpenAPI specifications to streamline communication between front-end and back-end systems.</li>
            <li>Utilized Docker to manage MySQL databases, reducing deployment time by 25%.</li>
            <li>Designed responsive UI components using Figma and Tailwind CSS, enhancing the user experience and speeding up iteration cycles.</li>
            <li>Collaborated with cross-functional teams to define API contracts, leading to a 30% improvement in system stability.</li>
          </ul>
        </div>

        <div>
          <h3>Software Engineering Intern - Aeyesafe</h3>
          <p>Aug 2022 - Dec 2022</p>
          <ul className="list-unstyled">
            <li>Developed functions to analyze health data from MongoDB and PostgreSQL, enabling real-time alerts.</li>
            <li>Created a sensor data processing library to improve monitoring efficiency.</li>
            <li>Implemented interactive data visualizations on health reports, simplifying decision-making for users.</li>
            <li>Optimized system performance, reducing API response times by 15%.</li>
          </ul>
        </div>
      </section>

      {/* Skills Section */}
      <section data-aos="fade-up" data-aos-duration="1000">
        <h2 className="text-secondary">Technical Skills</h2>
        <ul className="list-unstyled">
          <li><strong>Languages:</strong> JavaScript, HTML, CSS, SQL, Kotlin, Python, C#</li>
          <li><strong>Frameworks:</strong> React.js, Express.js, Node.js, Vue.js, Django, ASP.NET MVC</li>
          <li><strong>Tools:</strong> Git, Docker, Figma, MySQL, PostgreSQL, MongoDB, Postman, Google Cloud Platform</li>
        </ul>
      </section>

      {/* Footer Section */}
      <footer className="text-center py-4">
        <p>&copy; 2025 Hannah Newton | All Rights Reserved</p>
        <div>
          <a href="https://github.com/your-link" target="_blank" className="text-secondary mx-3">GitHub</a>
          <a href="https://www.linkedin.com/in/your-link" target="_blank" className="text-secondary mx-3">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;