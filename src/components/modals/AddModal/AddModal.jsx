import React, {useState} from 'react';
import { Modal, Button } from 'react-bootstrap';
import cn from 'classnames';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import {useFormik} from 'formik';

import { selectors as channelSelectors} from "../../../slices/channelsSlice.js";
import socket from '../../../socket';

const AddModal = ({show, handleClose}) => {
    const [loading, setLoading] = useState(false);
    const channels = useSelector(state => Object.values(channelSelectors.selectEntities(state)));
    const names = channels.map(({name}) => name);

    const validationSchema = yup.object({
        channelName: yup
          .string('Enter your username')
          .required('Это поле обязательное')
          .notOneOf(names, 'Такое имя уже существует')
      });

    const onSubmit = (values, {resetForm}) => {
        setLoading(true);
        const channel = {
            name: values.channelName,
        }

        socket.emit("newChannel", channel, () => {
            handleClose();
            resetForm();
            setLoading(false);
        })
    }

    const formik = useFormik({
        initialValues: {
            channelName: '',
        },
        validationSchema,
        onSubmit,
    })
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton={!loading}>
            <Modal.Title>Добавить канал</Modal.Title>
            </Modal.Header>
            <form onSubmit={formik.handleSubmit}>
                <Modal.Body>
                    <div className="form-group">
                        <input
                            id="channelName"
                            name="channelName"
                            value={formik.values.channelName}
                            onChange={formik.handleChange}
                            className={cn("form-control", {"is-invalid": formik.touched.channelName && formik.errors.channelName})}
                            disabled={loading}
                            required
                            autoFocus
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

export default AddModal;