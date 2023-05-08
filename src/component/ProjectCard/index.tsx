import React,{useState} from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ProjectProps } from '../../store/types';
import './index.scss';

interface ProjectCardProps {
    project: ProjectProps;
    onOpenDetails: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project,onOpenDetails   }) => {
    const [, setShowModal] = useState(false);
    const handleShowDetails = () => {
        setShowModal(true);
        onOpenDetails();
    };

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>
                        <Link target="_blank" to={`https://github.com/${project.owner.login}/${project.name}`}>
                            {project.name}
                        </Link>
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        <Link target="_blank" to={`https://github.com/${project.owner.login}`}>
                            {project.owner.login}
                        </Link>
                    </Card.Subtitle>
                    <Card.Text className="project-description">{project.description}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                        <Button variant="btn btn-primary" onClick={handleShowDetails}>
                            View Details
                        </Button>
                        <div>
                            <i className="bi bi-star-fill"></i> {project.stargazers_count}
                        </div>
                        <div>
                            <i className="bi bi-eye-fill"></i> {project.watchers_count}
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
};

export default ProjectCard;