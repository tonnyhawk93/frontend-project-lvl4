import React, {useState} from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';
import socket from '../../../socket/index.js';

const DeleteModal = ({show, handleClose, editedChannelId}) => {
    const [loading, setLoading] = useState(false);
    const {t} = useTranslation();

    const handleSubmit = () => {
        setLoading(true);
        socket.emit('removeChannel', {id: editedChannelId}, () => {
            handleClose();
            setLoading(false);
            toast.success(t('toasts.deleteMessage'));
        });
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton={!loading}>
            <Modal.Title>{t('modal.deleteModal.title')}</Modal.Title>
            </Modal.Header>
                <Modal.Body>{t('modal.deleteModal.text')}</Modal.Body> 
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} disabled={loading}>
                        {t('modal.deleteModal.rejectButton')}
                    </Button>
                    <Button variant="danger" type="submit" onClick={handleSubmit} disabled={loading}>
                        {t('modal.deleteModal.submitButton')}
                    </Button>
                </Modal.Footer>    
        </Modal>
    )
}

export default DeleteModal;