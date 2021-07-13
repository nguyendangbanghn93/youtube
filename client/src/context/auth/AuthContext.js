import { createContext, useReducer, useEffect, useContext } from "react";
import { authReducer } from "./authReducer";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import { SET_AUTH, API_URL, LOCAL_STORAGE_TOKEN_NAME } from "./constants";

export const AuthContext = createContext();
// eslint-disable-next-line react-hooks/rules-of-hooks
export const authContext = () => useContext(AuthContext);
const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null,
    });
    const authActions = {
        loadUser: async () => {
            if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
                setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
            }

            try {
                const response = await axios.get(`${API_URL}/auth`);
                console.log('response', response);
                if (response.data.success) {
                    dispatch({
                        type: SET_AUTH,
                        payload: { isAuthenticated: true, user: response.data.user },
                    });
                }
            } catch (error) {
                console.log('error', error);
                localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
                setAuthToken(null);
                dispatch({
                    type: SET_AUTH,
                    payload: { isAuthenticated: false, user: null },
                });
            }
        },
        loginUser: async ({ email, password }) => {
            try {
                const response = await axios.post(`${API_URL}/auth/login`, {
                    email,
                    password,
                });
                console.log("response12345", response.data.token);

                if (response.data.success)
                    localStorage.setItem(
                        LOCAL_STORAGE_TOKEN_NAME,
                        response.data.token
                    );

                await authActions.loadUser();

                return response.data;
            } catch (error) {
                console.log("error", error.message);
                if (error.response.data) return error.response.data;
                else return { success: false, message: error.message };
            }
        },
        registerUser: async ({ username, email, password }) => {
            try {
                const response = await axios.post(`${API_URL}/auth/register`, {
                    username,
                    email,
                    password,
                });
                if (response.data.success) {
                    localStorage.setItem(
                        LOCAL_STORAGE_TOKEN_NAME,
                        response.data.token
                    );
                }
                await authActions.loadUser();
                return response.data;
            } catch (error) {
                if (error.response.data) return error.response.data;
                else return { success: false, message: error.message };
            }
        },
        logoutUser: () => {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
            dispatch({
                type: "SET_AUTH",
                payload: { isAuthenticated: false, user: null },
            });
        },
        logoutUserOnAllDevice: () => { },
    };
    useEffect(() => {
        authActions.loadUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const authContextData = { authActions, authState };

    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
