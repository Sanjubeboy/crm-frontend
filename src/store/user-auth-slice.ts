import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { LoginData } from "../types/auth";
import { AppDispatch } from ".";
import { NavigateFunction } from "react-router-dom";

type UserAuth = {
    isAuthenticated: boolean,
    authToken: string,
    user:string,
    role:string
}

const initialState: UserAuth = {
  isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")!) || false,
  authToken: localStorage.getItem("authToken") || "",
  user: localStorage.getItem("user") || "",
  role: localStorage.getItem("role") || "",
}

const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers:{
        login(state, action:PayloadAction<UserAuth>){
            state.isAuthenticated = true
            state.authToken = action.payload.authToken
            state.user = action.payload.user
            localStorage.setItem('isAuthenticated', JSON.stringify(true))
            localStorage.setItem('authToken', action.payload.authToken)
            localStorage.setItem('user', action.payload.user)
            localStorage.setItem('role', action.payload.role)
        },
        logout(state){
            state = initialState
            localStorage.clear()
        }
    }
})

export const LoginUser = (
  apiBody: LoginData,
  role: string,
  navigate: NavigateFunction
) => {
  return (dispatch: AppDispatch) => {
    ;(async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/${role}/login`,
          apiBody
        )
        const { authToken, name } = res.data
        dispatch(
          userAuthActions.login({
            isAuthenticated: true,
            authToken,
            user: name,
            role: role,
          })
        )
        navigate("/")
      } catch (error) {
        console.log(error)
      }
    })()
  }
}

export const userAuthActions = userAuthSlice.actions

export default userAuthSlice