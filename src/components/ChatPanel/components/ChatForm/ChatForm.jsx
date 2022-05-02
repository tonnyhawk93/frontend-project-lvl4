import React from 'react';
import { ArrowRightSquare } from 'react-bootstrap-icons';

const ChatForm = () => {

    return (
        <div className='mt-auto px-5 py-3'>
            <form className='py-1 border rounded-2'>
                <div className='input-group has-validation'>
                    <input className='border-0 p-0 ps-2 form-control' placeholder="Введите сообщение..."/>
                    <button type='submit' className='btn btn-group-vertical'>
                        <ArrowRightSquare color="black" size={20}/>
                    </button>
                </div>
            </form>
        </div>
    )
};

export default ChatForm;