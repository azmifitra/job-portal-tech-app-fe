export const url = 'http://localhost:3000';

export const setHeaders = () => {
  const headers = {
    headers: {
      'x-auth-token': localStorage.getItem('access_token'),
    },
  };

  return headers;
};
