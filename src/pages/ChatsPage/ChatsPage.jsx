import React, {useState, useEffect} from "react";
import Chats from "../../components/Chats";
import {Spinner} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { selectors as channelSelectors } from "../../slices/channelsSlice.js";
import { selectors as messageSelectors } from "../../slices/messagesSlice.js";
import { fetchData } from "../../thunks";
import { startSocketWatch } from "../../socket";

const ChatsPage = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        startSocketWatch(dispatch);
        dispatch(fetchData());
    }, []);

    const channelsLoadingState = useSelector(state => state.channels.loading);
    const [chatPageState, setChatPageState] = useState('initialization');

    useEffect(() => {
        setChatPageState(channelsLoadingState);
    }, [channelsLoadingState]);

    return (
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
            {chatPageState === 'loading' || chatPageState === 'initialization'? 
                <div className='row h-100 d-flex justify-content-center align-items-center'>
                    <Spinner animation="border" variant="primary" />
                </div> :
                <Chats />
            }
        </div>
    )
}

export default ChatsPage;

