import React, { useEffect, useState } from 'react';
import './Projects.scss';
import projectsJson from '../../assets/projects.json';
import { Link } from 'react-router-dom';
import 'animate.css';

function Projects() {
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    
    const animationSpeed = 800; 

    const interval = setInterval(() => {
      if (projectsJson.length > visibleProjects.length) {
        setVisibleProjects((prevProjects) => [
          ...prevProjects,
          projectsJson[prevProjects.length],
        ]);
        setIsAnimating(true);
      } else {
        clearInterval(interval);
      }
    }, animationSpeed);

    return () => clearInterval(interval);
  }, [visibleProjects]);

  return (
    <div>
      <h3>Mes projets</h3>

      <section className='projet'>
        <div className='projets_card'>
          {visibleProjects.map((project) => (
            <div
              className={`column animate__animated ${
                isAnimating ? 'animate__fadeIn' : ''
              }`}
              key={project.id}
            >
              <Link to={project.githubUrl}>
                <img src={project.cover} alt='projets' />
              </Link>
              <div className='projets_card_descriptions'>
                <h4 className='projet_description'>{project.title}</h4>
                <p>{project.descriptions}</p>
                <div>
                  <b>Compétences :</b> {project.compétences.join(', ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Projects;
