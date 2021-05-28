import jwt_decode from 'jwt-decode';

export const ACTIVE_USER = () => jwt_decode(localStorage.getItem('token'));
