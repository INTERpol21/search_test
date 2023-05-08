import React, {useState} from 'react';
import {AppDispatch, RootState} from '../../store/store.ts';
import {useDispatch, useSelector} from 'react-redux';
import {searchProjects} from '../../store/actions.ts';
import SearchBar from '../SearchBar';
import {Container, Row, Col, Alert} from 'react-bootstrap';
import {ProjectProps} from '../../store/types.ts';
import './index.scss';
import ProjectCard from '../ProjectCard';
import ProjectDetails from '../ProjectDetails';
import {deleteProject, editProject} from "../../store/reducer.ts";
import Pagination from "../../utils/Pagination";


const SearchPage: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();
    const {projects} = useSelector((state: RootState) => state.search);
    const [selectedProject, setSelectedProject] = useState<ProjectProps | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [cardsPerPage, setCardsPerPage] = useState<number>(12);

    // Logic for displaying cards
    const indexOfLastCard:number = currentPage * cardsPerPage;
    const indexOfFirstCard:number = indexOfLastCard - cardsPerPage;
    const currentCards:ProjectProps[] = projects.slice(indexOfFirstCard, indexOfLastCard);

    const [message, setMessage] = useState<string | null>(null);
    const showMessage = (msg: string) => {
        setMessage(msg);
        setTimeout(() => {
            setMessage(null);
        }, 3000); // скрыть сообщение через 3 секунды
    };

    const handleCardsPerPage = (num: number) => {
        setCurrentPage(1);
        setCardsPerPage(num);
    };


    const handleSearch = (searchTerm: string) => {
        dispatch(searchProjects(searchTerm));

    };
    const handleCloseModal = () => {
        setSelectedProject(null);

    };
    const handleEdit = (updatedProject: ProjectProps) => {
        dispatch(editProject(updatedProject));
        showMessage("Проект был изменен");
        setSelectedProject(null);
    };

    const handleDelete = (projectId: string) => {
        dispatch(deleteProject(projectId));
        showMessage("Проект был удален");
        setSelectedProject(null);
    };
    const handleOpenDetails = (project: ProjectProps) => {
        setSelectedProject(project);

    };


    return (
        <Container>
            {message && (
                <Alert variant="success" className="fixed-top" style={{ zIndex: 9999 }}>
                    {message}
                </Alert>
            )}
            <Row className="p-4"> <SearchBar onSearch={handleSearch}/> </Row>
            <div className="p-4">
                <Row className="card_box">
                    {currentCards.map((project: ProjectProps) => (
                        <Col className="p-0" key={project.id}> <ProjectCard
                            project={project}
                            onOpenDetails={() => handleOpenDetails(project)}
                        /> </Col>
                    ))}
                </Row>
            </div>

            <Pagination
                currentPage={currentPage}
                cardsPerPage={cardsPerPage}
                totalCards={projects.length}
                onPageChange={setCurrentPage}
                onCardsPerPageChange={handleCardsPerPage}
            /> {selectedProject && (
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
