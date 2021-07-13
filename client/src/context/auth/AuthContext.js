import { createContext, useReducer, useEffect, useContext ,useMemo} from "react";
import { authReducer } from "./authReducer";
import axios from "axios";
import { SET_AUTH } from "./constants";
import { setAuth, getAuth } from "../../utils/authUtil";

export const AuthContext = createContext();
// eslint-disable-next-line react-hooks/rules-of-hooks
export const authContext = () => useContext(AuthContext);
const API_URL = process.env.REACT_APP_API_URL;

const AuthContextProvider = ({ children }) => {
    const { user } = getAuth();
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: user ? true : false,
        user: user,
    });
    const authActions = useMemo(() => ({
        loadUser: async () => {
            try {
                const response = await axios.get(`${API_URL}/auth`);
                if (response.data.success) {
                    dispatch({
                        type: SET_AUTH,
                        payload: { isAuthenticated: true, user: response.data.user },
                    });
                    setAuth(response.data.token, response.data.user)
                }
            } catch (error) {
                console.log('error', error);
                setAuth(null);
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
                if (response.data.success)
                    setAuth(response.data.token, response.data.user)
                await authActions.loadUser();
                return response.data;
            } catch (error) {
                console.log("error", error);
                setAuth(null);
                if (error.response.data) {
                    return error.response.data;
                } else {
                    return { success: false, message: error.message };
                }
            }

        },
        registerUser: async ({ username, email, password }) => {
            try {
                const response = await axios.post(`${API_URL}/auth/register`, {
                    username,
                    email,
                    password,
                });
                if (response.data.success)
                    setAuth(response.data.token, response.data.user)
                await authActions.loadUser();
                return response.data;
            } catch (error) {
                console.log("error", error);
                setAuth(null);
                if (error.response.data) {
                    return error.response.data;
                } else {
                    return { success: false, message: error.message };
                }
            }
        },
        logoutUser: async () => {
            const response = await axios.post(`${API_URL}/auth/logout`);
            setAuth(null);
            dispatch({
                type: SET_AUTH,
                payload: { isAuthenticated: false, user: null },
            });
        },
        logoutUserAllDevice: async () => {
            const response = await axios.post(`${API_URL}/auth/logout-all`);
            setAuth(null);
            // localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
            dispatch({
                type: SET_AUTH,
                payload: { isAuthenticated: false, user: null },
            });
        },
    }), []);
    useEffect(() => {
        const loadUser = async () => {
            await authActions.loadUser();
        };
        loadUser();
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
