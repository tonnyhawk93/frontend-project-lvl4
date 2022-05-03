import React, {useCallback, useEffect, useRef, useState} from 'react';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useFormik } from "formik";
import * as yup from 'yup';
import { io } from "socket.io-client";

import {getUserName} from '../../../../helpers';

const socket = io();

const validationSchema = yup.object({
    messageText: yup
      .string('Enter your username')
      .required('message is required'),
  });

const ChatForm = ({currentChannelId}) => {
    const inputRef = useRef(null);
    const [disabled, setDisabled] = useState(false);
    const onSubmit = useCallback(async (values, { setSubmitting, setErrors, resetForm}) => {
        setDisabled(true);
        const message = {
            text: values.messageText,
            author: getUserName(),
            chanelId: currentChannelId,
        }

        socket.emit('newMessage', message, () => {
            setDisabled(false);
            resetForm();
            inputRef.current.focus();
        });

        setTimeout(() => {
            if (inputRef.current.disabled) {
                setDisabled(false);
                inputRef.current.focus();
                setErrors({netError : 'Упс! Что-то пошло не так...'})
            }
        }, 3000)
    }, [currentChannelId]);

    const formik = useFormik({
        initialValues: {
          messageText: '',
        },
        validationSchema,
        onSubmit,
    });
    return (
        <div className='mt-auto px-5 py-3'>
            <form className='py-1 border rounded-2' onSubmit={formik.handleSubmit}>
                <div className='input-group has-validation'>
                    <input 
                        className='border-0 p-0 ps-2 form-control' 
                        placeholder="Введите сообщение..."
                        id="messageText"
                        name="messageText"
                        value={formik.values.messageText}
                        onChange={formik.handleChange}
                        autoFocus={true} 
                        ref={inputRef}
                        disabled={disabled}
                        required
                    />
                    <button type='submit' className='btn btn-group-vertical' disabled={disabled}>
                        <ArrowRightSquare color="black" size={20}/>
                    </button>
                </div>
            </form>
        </div>
    )
};

export default ChatForm;