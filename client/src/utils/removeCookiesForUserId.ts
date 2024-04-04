import Cookies from 'js-cookie';

const removeCookiesForUserId = () => {
  return Cookies.remove('userId');
};

export default removeCookiesForUserId;
