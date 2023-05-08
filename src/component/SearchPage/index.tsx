import React, { useState } from 'react';
import { AppDispatch, RootState } from '../../store/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import { searchProjects } from '../../store/actions.ts';
import SearchBar from '../SearchBar';
import { Container, Row, Col } from 'react-bootstrap';
import { ProjectProps } from '../../store/types.ts';
import './index.scss';
import ProjectCard from '../ProjectCard';
import ProjectDetails from '../ProjectDetails';
import { deleteProject, editProject } from "../../store/reducer.ts";

const SearchPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { projects } = useSelector((state: RootState) => state.search);

    const [selectedProject, setSelectedProject] = useState<ProjectProps | null>(null);

    const handleSearch = (searchTerm: string) => {
        dispatch(searchProjects(searchTerm));
    };

    const handleCloseModal = () => {
        setSelectedProject(null);
    };

    const handleEdit = (updatedProject: ProjectProps) => {
        dispatch(editProject(updatedProject));
        setSelectedProject(null);
    };

    const handleDelete = (projectId: string) => {
        dispatch(deleteProject(projectId));
        setSelectedProject(null);
    };

    const handleOpenDetails = (project: ProjectProps) => {
        setSelectedProject(project);
    };

    return (
        <Container>
            <Row className="p-4">
                <SearchBar onSearch={handleSearch} />
            </Row>
            <div className="p-4">
                <Row className="card_box">
                    {projects.map((project: ProjectProps) => (
                        <Col className="p-0" key={project.id}>
                            <ProjectCard
                                project={project}
                                onOpenDetails={() => handleOpenDetails(project)}
                            />
                        </Col>
                    ))}
                </Row>
            </div>
            {selectedProject && (
                <ProjectDetails
                    project={selectedProject}
                    showModal={true}
                    onCloseModal={handleCloseModal}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}
        </Container>
    );
};

export default SearchPage;
