import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import cn from 'classnames';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';

import { selectors as channelSelectors } from '../../../slices/channelsSlice.js';

function AddModal({ show, handleClose, socket }) {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const channels = useSelector((state) => Object.values(channelSelectors.selectEntities(state)));
  const names = channels.map(({ name }) => name);

  const validationSchema = yup.object({
    channelName: yup
      .string(t('modal.addModal.errors.required'))
      .required(t('modal.addModal.errors.required'))
      .notOneOf(names, t('modal.addModal.errors.alredyExist')),
  });

  const onSubmit = (values, { resetForm }) => {
    setLoading(true);
    const channel = {
      name: values.channelName,
    };

    socket.emit('newChannel', channel, () => {
      handleClose();
      resetForm();
      setLoading(false);
      toast.success(t('toasts.addMessage'), {
        theme: 'light',
      });
    });
  };

  useEffect(() => {
    if (show) {
      inputRef.current.focus();
    }
  }, [show]);

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema,
    onSubmit,
  });
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton={!loading}>
        <Modal.Title>{t('modal.addModal.title')}</Modal.Title>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <div className="form-group">
            <input
              id="channelName"
              name="channelName"
              value={formik.values.channelName}
              onChange={formik.handleChange}
              className={cn('form-control', { 'is-invalid': formik.touched.channelName && formik.errors.channelName })}
              disabled={loading}
              required
              ref={inputRef}
            />
            {formik.touched.channelName && formik.errors.channelName && (
            <div className="invalid-feedback">{formik.errors.channelName}</div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={loading}>
            {t('modal.addModal.rejectButton')}
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {t('modal.addModal.submitButton')}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default AddModal;
