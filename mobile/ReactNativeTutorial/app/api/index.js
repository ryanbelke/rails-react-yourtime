import _ from 'lodash/fp';
import { normalize } from 'normalizr';
import { commentSchema, commentsSchema } from './schemas';

// You can use localhost for development, but only on iOS. Android emulator is considered
// a standalone machine with it's own localhost. Workaround is to specify the actual
// IP address of your PC.
// const API_URL = __DEV__ ? 'http://localhost:3000/' : 'http://www.reactrails.com/';
const API_URL = 'https://www.reactrails.com/';

const apiRequest = async (url, method, payload) => {
  let options = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Auth': 'tutorial_secret',
    },
  };
  if (payload) options = { ...options, body: JSON.stringify(payload) };
  const response = await fetch(`${API_URL}${url}`, options);
  return await response.json();
};

const getRequest = async (url) => apiRequest(url, 'GET');
const postRequest = async (url, payload) => apiRequest(url, 'POST', payload);

export const fetchComments = async () => {
  const response = await getRequest('comments.json');
  const camelizedResponse = _.mapKeys(_.camelCase, response);
  return normalize(camelizedResponse, { comments: commentsSchema });
};

export const postComment = async (payload) => {
  const response = await postRequest('comments.json', { comment: payload });
  const camelizedResponse = _.mapKeys(_.camelCase, response);
  return normalize(camelizedResponse, commentSchema);
};
