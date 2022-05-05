import React, { useRef, useEffect } from 'react';

const renderMessage = ({ author, text, id }) => (
  <div className="text-break mb-2" key={id}>
    <b>{author}</b>
    {`: ${text}`}
  </div>
);

function MessagesBox({ messages }) {
  const boxRef = useRef(null);

  useEffect(() => {
    boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="chat-messages overflow-auto px-5" ref={boxRef}>
      {messages.map(renderMessage)}
    </div>
  );
}

export default MessagesBox;
