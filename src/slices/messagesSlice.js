/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import fetchData from '../thunks/index.js';
import { removeChannel } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        messagesAdapter.addMany(state, payload.entities.messages || {});
        state.loading = 'idle';
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error;
      })
      .addCase(removeChannel, (state, { payload: id }) => {
        const resuleEntities = Object.values(state.entities).filter((e) => e.id !== id);
        messagesAdapter.setAll(state, resuleEntities);
      });
  },
});

export const { addMessages, addMessage } = messagesSlice.actions;

export const selectors = messagesAdapter.getSelectors((state) => state.messages);

export default messagesSlice.reducer;
