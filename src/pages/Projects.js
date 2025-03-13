// src/pages/Projects.js

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Projects = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center text-secondary mb-4">My Projects</h2>
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="project-card">
            <img src="https://via.placeholder.com/400x250" alt="Project 1" className="img-fluid" />
            <h4>Project Name 1</h4>
            <p>A brief description of the project.</p>
            <a href="https://github.com/your-repo-link" target="_blank" className="btn btn-primary">View Project</a>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="project-card">
            <img src="https://via.placeholder.com/400x250" alt="Project 2" className="img-fluid" />
            <h4>Project Name 2</h4>
            <p>A brief description of the project.</p>
            <a href="https://github.com/your-repo-link" target="_blank" className="btn btn-primary">View Project</a>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="project-card">
            <img src="https://via.placeholder.com/400x250" alt="Project 3" className="img-fluid" />
            <h4>Project Name 3</h4>
            <p>A brief description of the project.</p>
            <a href="https://github.com/your-repo-link" target="_blank" className="btn btn-primary">View Project</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;