import http from './http';

export const signUp = async (user) => {
  try {
    await http.post('/users', user);
  } catch (err) {
    if (err.response) {
      let message = 'Something went wrong. Please contact us';
      const { error } = err.response.data;
      if (error.details && error.details.messages) {
        // Email error
        if (error.details.messages.email) {
          message = error.details.messages.email[0];
          if (message === 'is invalid') message = `Email ${message}`;
        }
      }
      throw Error(message);
    }
  }
};

export const login = async (email, password) => {
  try {
    await http.post('/users/login', { email, password });
  } catch (err) {
    if (err.response) {
      let message = 'Something went wrong. Please contact us';
      const { error } = err.response.data;
      switch (error.code) {
        case 'LOGIN_FAILED':
          message = 'Wrong email or password';
          break;
        case 'LOGIN_FAILED_EMAIL_NOT_VERIFIED':
          message = 'Email is not verified';
          break;
        default:
      }
      throw Error(message);
    }
  }
};

export const logout = async () => {
  try {
    await http.post('/users/logout');
  } catch (err) {
    throw err;
  }
};

export const reset = async (email) => {
  try {
    await http.post('/users/reset', { email });
  } catch (err) {
    if (err.response) {
      let message = 'Something went wrong. Please contact us';
      const { error } = err.response.data;
      switch (error.code) {
        case 'EMAIL_NOT_FOUND':
          message = 'Email is not found';
          break;
        case 'RESET_FAILED_EMAIL_NOT_VERIFIED':
          message = error.message;
          break;
        default:
      }
      throw Error(message);
    }
  }
};

export const resetPassword = async (newPassword, authQuery) => {
  try {
    await http.post(`/users/reset-password${authQuery}`, { newPassword });
  } catch (err) {
    if (err.response) {
      let message = 'Something went wrong. Please contact us';
      const { error } = err.response.data;
      switch (error.code) {
        case 'USER_NOT_FOUND':
          message = 'User is not found';
          break;
        default:
      }
      throw Error(message);
    }
  }
};
