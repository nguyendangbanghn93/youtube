import axios from 'axios'
const LOCAL_STORAGE_TOKEN_NAME = process.env.REACT_APP_LOCAL_STORAGE_TOKEN_NAME;
const LOCAL_STORAGE_USER = process.env.REACT_APP_LOCAL_STORAGE_USER;
export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
}
export const setAuth = (token, user) => {
    if (token && user) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, token);
        localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(user));
        setAuthToken(token)
    } else {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        localStorage.removeItem(LOCAL_STORAGE_USER);
        setAuthToken(null)
    }
}
export const getAuth = () => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME) || null;
    setAuthToken(token)
    let user;
    try {
        user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER));
    } catch (error) {
        user = null;
    }
    return { token, user }
}