import React, { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { getUserName } from '../../../../helpers';

filter.add(filter.getDictionary('ru'));

function ChatForm({ currentChannelId, socket }) {
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const [disabled, setDisabled] = useState(false);

  const validationSchema = yup.object({
    messageText: yup
      .string(t('chats.sendMessageForm.errors.required'))
      .required(t('chats.sendMessageForm.errors.required')),
  });

  const onSubmit = useCallback(async (values, { setErrors, resetForm }) => {
    setDisabled(true);
    const message = {
      text: filter.clean(values.messageText),
      author: getUserName(),
      chanelId: currentChannelId,
    };

    socket.emit('newMessage', message, () => {
      setDisabled(false);
      resetForm();
      inputRef.current.focus();
    });

    setTimeout(() => {
      if (inputRef.current && inputRef.current.disabled) {
        setDisabled(false);
        inputRef.current.focus();
        setErrors({ netError: t('chats.sendMessageForm.errors.netError') });
      }
    }, 3000);
  }, [currentChannelId]);

  const formik = useFormik({
    initialValues: {
      messageText: '',
    },
    validationSchema,
    onSubmit,
  });
  return (
    <div className="mt-auto px-5 py-3">
      <form className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
        <div className="input-group has-validation">
          <input
            className="border-0 p-0 ps-2 form-control"
            placeholder={t('chats.sendMessageForm.sendMessagePlaceholder')}
            aria-label="Новое сообщение"
            id="messageText"
            name="messageText"
            value={formik.values.messageText}
            onChange={formik.handleChange}
            ref={inputRef}
            disabled={disabled}
            required
          />
          <button type="submit" className="btn btn-group-vertical" disabled={disabled}>
            <ArrowRightSquare color="black" size={20} />
            <span className="visually-hidden">Отправить</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatForm;
