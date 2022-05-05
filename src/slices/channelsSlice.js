/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import fetchData from '../thunks/index.js';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({ loading: 'initialization', currentChannelId: null, error: null });

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    removeChannel: (state, { payload: id }) => {
      if (id === state.currentChannelId) {
        state.currentChannelId = state.defaultChannelId;
      }
      channelsAdapter.removeOne(state, id);
    },
    renameChannel: channelsAdapter.upsertOne,
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        channelsAdapter.addMany(state, payload.entities.channels || {});
        state.currentChannelId = payload.result.currentChannelId;
        state.defaultChannelId = payload.result.currentChannelId;
        state.loading = 'idle';
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error;
      });
  },
});

export const {
  addChannels, addChannel, removeChannel, renameChannel, setCurrentChannelId,
} = channelsSlice.actions;

export const selectors = channelsAdapter.getSelectors((state) => state.channels);

export default channelsSlice.reducer;
