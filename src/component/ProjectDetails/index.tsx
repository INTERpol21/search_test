import React, { useState } from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import { ProjectProps } from '../../store/types';

interface ProjectDetailsProps {
    project: ProjectProps;
    showModal: boolean;
    onCloseModal: () => void;
    onEdit: (editedProject: ProjectProps) => void; // добавили параметр с отредактированным проектом
    onDelete: (projectId: string) => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({   project,
                                                           showModal,
                                                           onCloseModal,
                                                           onEdit,
                                                           onDelete, }) => {
    const [editedProject, setEditedProject] = useState<ProjectProps>(project); // добавили состояние для отслеживания изменений
    const handleDelete = () => {
        onDelete(project.id.toString());
    };


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEditedProject({ ...editedProject, [name]: value }); // обновляем состояние с измененными полями проекта
    };

    return (
        <>
            <Button variant="btn btn-primary" onClick={onCloseModal}>
                Open Details
            </Button>

            <Modal show={showModal} onHide={onCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{project.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Owner: {project.owner.login}</p>
                    <p >Description: {project.description}</p>
                    <p>Stars: {project.stargazers_count}</p>
                    <p>Watchers: {project.watchers_count}</p>
                    <Form >
                        <input type="text" name="name" value={editedProject.name} onChange={handleChange} />
                        <input type="text" name="description" value={editedProject.description} onChange={handleChange} />
                        <input type="number" name="stargazers_count" value={editedProject.stargazers_count} onChange={handleChange} />
                        <input type="number" name="watchers_count" value={editedProject.watchers_count} onChange={handleChange} />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => onEdit(editedProject)}>
                        Edit
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                    <Button variant="primary" onClick={onCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ProjectDetails;
