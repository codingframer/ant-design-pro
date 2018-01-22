import { fetchTopology } from '../services/emulate';

export default {
  namespace: 'emulate',

  state: {
    data: {
      graph: {},
    },
    loading: true,
  },

  effects: {
    *fetch_graph({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(fetchTopology, payload);
      yield put({
        type: 'fetchTopology',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
  },

  reducers: {
    fetchTopology(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },

  subscriptions: {},
};
