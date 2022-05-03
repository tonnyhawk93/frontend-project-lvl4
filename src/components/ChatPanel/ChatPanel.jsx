import React from 'react';
import ChatHeader from './components/ChatHeader';
import MessagesBox from "./components/MessagesBox";
import ChatForm from './components/ChatForm';

const ChatPanel = ({channelName, messages, currentChannelId}) => {
    return (
        <div className='col p-0 h-100'>
            <div className='d-flex flex-column h-100'>
                <ChatHeader channelName={channelName} messagesCount={messages.length}/>
                <MessagesBox messages={messages} />
                <ChatForm currentChannelId={currentChannelId}/>
            </div>
        </div>
    )
}

export default ChatPanel;