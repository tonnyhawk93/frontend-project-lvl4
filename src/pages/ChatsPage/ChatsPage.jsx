import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Chats from '../../components/Chats';
import PageLayout from '../../components/PageLayout';
import fetchData from '../../thunks';
import { startSocketWatch } from '../../socket';

function ChatsPage({ socket }) {
  const dispatch = useDispatch();

  useEffect(() => {
    startSocketWatch(socket, dispatch);
    dispatch(fetchData());
  }, []);

  const channelsLoadingState = useSelector((state) => state.channels.loading);
  const [chatPageState, setChatPageState] = useState('initialization');

  useEffect(() => {
    setChatPageState(channelsLoadingState);
  }, [channelsLoadingState]);

  return (
    <PageLayout>
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        {chatPageState === 'loading' || chatPageState === 'initialization'
          ? (
            <div className="row h-100 d-flex justify-content-center align-items-center">
              <Spinner animation="border" variant="primary" />
            </div>
          )
          : <Chats socket={socket} />}
      </div>
    </PageLayout>
  );
}

export default ChatsPage;
