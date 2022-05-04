import React, {useState} from 'react';
import { Modal, Button } from 'react-bootstrap';
import socket from '../../../socket/index.js';

const DeleteModal = ({show, handleClose, editedChannelId}) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        setLoading(true);
        socket.emit('removeChannel', {id: editedChannelId}, () => {
            handleClose();
            setLoading(false);
        });
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton={!loading}>
            <Modal.Title>Удалить канал</Modal.Title>
            </Modal.Header>
                <Modal.Body>Уверены?</Modal.Body> 
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} disabled={loading}>
                        Отменить
                    </Button>
                    <Button variant="danger" type="submit" onClick={handleSubmit} disabled={loading}>
                        Удалить
                    </Button>
                </Modal.Footer>    
        </Modal>
    )
}

export default DeleteModal;