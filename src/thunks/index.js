import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { normalize, schema } from 'normalizr';
import { getToken } from '../helpers/index.js';

import routes from '../routes.js';

const normalizeData = (data) => {
  const channelSchema = new schema.Entity('channels');
  const messageSchema = new schema.Entity('messages');

  const normalized = normalize(data, {
    channels: [channelSchema],
    messages: [messageSchema],
  });

  return normalized;
};

const fetchData = createAsyncThunk(
  'channels/fetchData',
  async () => {
    const token = getToken();
    const { data } = await axios.get(routes.dataPath(), {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return normalizeData(data);
  },
);

export default fetchData;
