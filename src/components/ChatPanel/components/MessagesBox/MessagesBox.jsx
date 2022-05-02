import React from 'react';

const renderMessage = ({autor, text}) => (
    <div className='text-break mb-2'>
        <b>{autor}</b> : {text}
    </div>
)

const MessagesBox = ({messages}) => {

    return (
        <div className='chat-messages overflow-auto px-5'>
            {messages.map(renderMessage)}
        </div>
    )
}

export default MessagesBox;