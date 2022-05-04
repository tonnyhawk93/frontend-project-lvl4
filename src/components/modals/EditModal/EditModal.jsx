import React, {useEffect, useRef, useCallback, useState} from 'react';
import { Modal, Button } from 'react-bootstrap';
import cn from 'classnames';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import {useFormik} from 'formik';

import socket from '../../../socket';
import { selectors as channelSelectors } from "../../../slices/channelsSlice.js";

const EditModal = ({show, handleClose, editedChannelId}) => {
    const [loading, setLoading] = useState(false);
    const currentChannel = useSelector(state => channelSelectors.selectById(state, editedChannelId));
    const channels = useSelector(state => Object.values(channelSelectors.selectEntities(state)));
    const names = channels.map(({name}) => name);
    const inputRef = useRef(null);

    const validationSchema = yup.object({
        channelName: yup
          .string('Enter your username')
          .required('Это поле обязательное')
          .notOneOf(names, 'Такое имя уже существует')
      });

    const onSubmit = useCallback((values, {resetForm}) => {
        setLoading(true);
        const channel = {
            id: editedChannelId,
            name: values.channelName,
        }

        socket.emit("renameChannel", channel, () => {
            handleClose();
            resetForm();
            setLoading(false);
        })
    }, [editedChannelId, handleClose])

    const formik = useFormik({
        initialValues: {
            channelName: '',
        },
        validationSchema,
        onSubmit,
    })

    useEffect(() => {
        if (show) {
            inputRef.current.value = currentChannel.name;
            inputRef.current.select();
        }
    }, [show]);
    
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton={!loading}>
            <Modal.Title>Переименовать канал</Modal.Title>
            </Modal.Header>
            <form onSubmit={formik.handleSubmit}>
                <Modal.Body>
                    <div className="form-group">
                        <input
                            id="channelName"
                            name="channelName"
                            className={cn("form-control", {"is-invalid": formik.touched.channelName && formik.errors.channelName})}
                            value={formik.values.channelName}
                            onChange={formik.handleChange}
                            required
                            disabled={loading}
                            ref={inputRef}
                        />
                        {formik.touched.channelName && formik.errors.channelName && (
                            <div className="invalid-feedback">{formik.errors.channelName}</div>
                        )}
                    </div>
                </Modal.Body> 
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} disabled={loading}>
                        Отменить
                    </Button>
                    <Button variant="primary" type="submit" disabled={loading}>
                        Отправить
                    </Button>
                </Modal.Footer>      
            </form>
        </Modal>
    )
}

export default EditModal;