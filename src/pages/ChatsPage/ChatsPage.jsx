import React, {useState, useEffect} from "react";
import NavPanel from "../../components/NavPanel";
import ChatPanel from "../../components/ChatPanel";
import {Spinner} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { selectors as channelSelectors } from "../../slices/channelsSlice.js";
import { addMessage, selectors as messageSelectors } from "../../slices/messagesSlice.js";
import { fetchData } from "../../thunks";
import socket from "../../socket";

const ChatsPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchData());
    }, []);

    useEffect(() => {
        socket.on("newMessage", (message) => {
            dispatch(addMessage(message));
          });
    }, []);

    const initialChannelId = useSelector(state => state.channels.currentChannelId)
    const [currentChannelId, setCurrentChannelId] = useState(initialChannelId);
    const [chatPageState, setChatPageState] = useState(null);
    const channelsLoadingState = useSelector(state => state.channels.loading);

    useEffect(() => {
        setCurrentChannelId(initialChannelId);
    }, [initialChannelId]);

    useEffect(() => {
        setChatPageState(channelsLoadingState);
    }, [channelsLoadingState]);

    const channels = useSelector(state => Object.values(channelSelectors.selectEntities(state)));
    const messages = useSelector(state => Object.values(messageSelectors.selectEntities(state)));
    const currentChannel = useSelector(state => channelSelectors.selectById(state, currentChannelId));

    return (
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
            {chatPageState === 'loading' ? 
                <div className='row h-100 d-flex justify-content-center align-items-center'>
                    <Spinner animation="border" variant="primary" />
                </div> :
                <div className="row h-100 bg-white flex-md-row">
                    <NavPanel 
                    items={channels} 
                    currentItemId={currentChannelId} 
                    selectCurrentItemId={setCurrentChannelId}
                    />
                    <ChatPanel 
                        messages={messages.filter(message => message.chanelId === currentChannelId)}
                        channelName={currentChannel?.name}
                        currentChannelId={currentChannelId}
                    />
                </div>
            }
        </div>
    )
}

export default ChatsPage;

