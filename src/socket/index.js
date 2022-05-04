import { io } from "socket.io-client";
import { addChannel, removeChannel, renameChannel, setCurrentChannelId } from "../slices/channelsSlice.js";
import { addMessage } from "../slices/messagesSlice.js";

const socket = io();

export const startSocketWatch = (dispatch) => {
    const socket = io();

    socket.on("newMessage", (message) => {
        dispatch(addMessage(message));
      });

    socket.on("newChannel", (channel) => {
        dispatch(addChannel(channel));
        dispatch(setCurrentChannelId(channel.id));
      });

    socket.on("removeChannel", ({id}) => {
        dispatch(removeChannel(id));
      });

    socket.on("renameChannel", (channel) => {
        dispatch(renameChannel(channel));
      });
};

export default socket;
