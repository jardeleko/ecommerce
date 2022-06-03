import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import publicRequest from "../request/publicMethods";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    await publicRequest.post("/auth/login", user).then((res) => {
        dispatch(loginSuccess(res.data));
    }).catch(() => {
        dispatch(loginFailure());
    })
}
