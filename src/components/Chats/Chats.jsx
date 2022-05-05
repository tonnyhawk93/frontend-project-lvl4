import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavPanel from '../NavPanel';
import ChatPanel from '../ChatPanel';
import { selectors as channelSelectors, setCurrentChannelId } from '../../slices/channelsSlice.js';
import { selectors as messageSelectors } from '../../slices/messagesSlice.js';

function Chats({ socket }) {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const dispatch = useDispatch();
  const handleChangeCurrentChannelId = (id) => {
    dispatch(setCurrentChannelId(id));
  };
  const { selectById, selectEntities } = channelSelectors;
  const channels = useSelector((state) => Object.values(selectEntities(state)));
  const messages = useSelector((state) => Object.values(messageSelectors.selectEntities(state)));
  const currentChannel = useSelector((state) => selectById(state, currentChannelId));

  return (
    <div className="row h-100 bg-white flex-md-row">
      <NavPanel
        items={channels}
        currentItemId={currentChannelId}
        initialChannel={currentChannel}
        selectCurrentItemId={handleChangeCurrentChannelId}
        socket={socket}
      />
      <ChatPanel
        messages={messages.filter((message) => message.chanelId === currentChannelId)}
        channelName={currentChannel?.name}
        currentChannelId={currentChannelId}
        socket={socket}
      />
    </div>
  );
}

export default Chats;
