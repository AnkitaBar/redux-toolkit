import axiosInstance from '@/api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import { AxiosInstance } from './Helper';
// import 'react-toastify/dist/ReactToastify.css'
// import { toast } from 'react-toastify';



const initialState = {
    // redirect_to: null,
    userProfile: [],
}



export const registration = createAsyncThunk(
    "register",
    async (formData) => {
        let response = await axiosInstance.post(`/user/signup`, formData);
        let result = response?.data;
        return result;
    }
)



export const login = createAsyncThunk(
    "login",
    async (formData) => {
        let response = await axiosInstance.post(`/user/signin`, formData);
        let result = response?.data;
        return result;
    }
)

export const getProfile = createAsyncThunk(
    "getprofile",
    async () => {
        let response = await axiosInstance.get(`/user/profile-details`);
        let result = response?.data;
        return result;
    }
)




export const authSlice = createSlice({
    name: "Authentication",
    initialState,
    reducers: {
        // reset_redirect: (state, { payload }) => {
        //     state.redirect_to = payload;
        // },

        // logout: () => {
        //     localStorage.removeItem("create_title")
        //     localStorage.removeItem("update_title")

        //     sessionStorage.removeItem("first_name");
        //     sessionStorage.removeItem("last_name");
        //     sessionStorage.removeItem("profile_img");

        //     localStorage.removeItem("log_token");
        //     localStorage.removeItem("reg_token");
        //     toast("Logout Succesfull");
        // },

        // back_to_reg: () => {
        //     localStorage.removeItem("reg_token");
        // }
    },
    extraReducers: (dev) => {
        dev
            .addCase(registration.pending, (state, { payload }) => { })
            .addCase(registration.fulfilled, (state, { payload }) => {
                // if (payload?.status === 200) {
                //     state.redirect_to = "/Login";
                //     localStorage.setItem("reg_token", payload?.token);
                //     toast(payload?.message);
                // }
                // else {
                //     toast(payload?.message);
                // }
            })
            .addCase(registration.rejected, (state, { payload }) => { })

            .addCase(login.pending, (state, { payload }) => { })
            .addCase(login.fulfilled, (state, { payload }) => {
                if (payload?.status === 200) {
                    // state.redirect_to = "/Datalist";
                    // sessionStorage.setItem("first_name", payload?.data?.first_name);
                    // sessionStorage.setItem("last_name", payload?.data?.last_name);
                    // sessionStorage.setItem("profile_img", payload?.data?.profile_pic);
                    localStorage.setItem("token", payload?.token);
                    // toast(payload?.message);
                }
                else {
                    // toast(payload?.message);
                }
            })
            
            .addCase(login.rejected, (state, { payload }) => { })

            .addCase(getProfile.pending, (state, { payload }) => { })
            .addCase(getProfile.fulfilled, (state, { payload }) => {
                if (payload?.status === 200) {
                    state.userProfile = payload?.data;
                    // state.redirect_to = "/Datalist";
                    // sessionStorage.setItem("first_name", payload?.data?.first_name);
                    // sessionStorage.setItem("last_name", payload?.data?.last_name);
                    // sessionStorage.setItem("profile_img", payload?.data?.profile_pic);
                    // localStorage.setItem("token", payload?.token);
                    // toast(payload?.message);
                }
                else {
                    // toast(payload?.message);
                }
            })
            .addCase(getProfile.rejected, (state, { payload }) => { })
    }
})

export const { } = authSlice.actions;