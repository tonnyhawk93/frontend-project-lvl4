import React from "react";
import NavPanel from "../../components/NavPanel";
import ChatPanel from "../../components/ChatPanel";
import { useDispatch, useSelector } from "react-redux";
import { selectors as channelSelectors, setCurrentChannelId} from "../../slices/channelsSlice.js";
import { selectors as messageSelectors } from "../../slices/messagesSlice.js";


const Chats = () => {
    const currentChannelId = useSelector(state => state.channels.currentChannelId);
    const dispatch = useDispatch();
    const handleChangeCurrentChannelId = (id) => {
        dispatch(setCurrentChannelId(id))
    };
    const channels = useSelector(state => Object.values(channelSelectors.selectEntities(state)));
    const messages = useSelector(state => Object.values(messageSelectors.selectEntities(state)));
    const currentChannel = useSelector(state => channelSelectors.selectById(state, currentChannelId));

    return (
        <div className="row h-100 bg-white flex-md-row">
            <NavPanel 
                items={channels} 
                currentItemId={currentChannelId} 
                initialChannel={currentChannel}
                selectCurrentItemId={handleChangeCurrentChannelId}
            />
            <ChatPanel 
                messages={messages.filter(message => message.chanelId === currentChannelId)}
                channelName={currentChannel?.name}
                currentChannelId={currentChannelId}
            />
        </div>
    )
}

export default Chats;

