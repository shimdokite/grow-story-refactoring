import Cookies from 'js-cookie';

const setCookiesByUserId = (userId: string) => {
  return Cookies.set('userId', userId, { expires: 1 });
};

export default setCookiesByUserId;
