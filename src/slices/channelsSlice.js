import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchData } from '../thunks/index.js';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({ loading: 'idle', currentChannelId: null, error: null });

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChanels: channelsAdapter.addMany
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, {payload}) => {
        channelsAdapter.addMany(state, payload.entities.channels || {});
        state.currentChannelId = payload.result.currentChannelId;
        state.loading = 'idle';
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error;
      });
  },
});

export const { addChanels } = channelsSlice.actions;

export const selectors = channelsAdapter.getSelectors((state) => state.channels);

export default channelsSlice.reducer;