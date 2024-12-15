import axiosInstance from '@/api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import { AxiosInstance } from './Helper';
// import 'react-toastify/dist/ReactToastify.css'
// import { toast } from 'react-toastify';



const initialState = {
    // redirect_to: null,
    Products: [],
    showProducts: [],
    updateProducts:[]
}



export const createProduct = createAsyncThunk(
    "createProduct",
    async (formData) => {
        let response = await axiosInstance.post(`/product/create`, formData);
        let result = response?.data;
        return result;
    }
)



export const allProducts = createAsyncThunk(
    "allProducts",
    async () => {
        let response = await axiosInstance.post(`/product/list`);
        let result = response?.data;
        return result;
    }
)




export const showProductFn = createAsyncThunk(
    "showProduct",
    async (id) => {
        let response = await axiosInstance.get(`/product/detail/${id}`);
        let result = response?.data;
        return result;
    }
)

export const updateProductsFn = createAsyncThunk(
    "updateProducts",
    async (formData) => {
        let response = await axiosInstance.post(`/product/update`,formData);
        let result = response?.data;
        return result;
    }
)

export const deleteProductFn = createAsyncThunk(
    "deletePost",
    async (id) => {
        const formData = new FormData();
        formData.append('id', id);
        let response = await axiosInstance.post(`/product/remove`,formData);
        let result = response?.data;
        return result;
    }
);




export const cmsSlice = createSlice({
    name: "CMS",
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
            .addCase(createProduct.pending, (state, { payload }) => { })
            .addCase(createProduct.fulfilled, (state, { payload }) => {
                // if (payload?.status === true) {
                //     state.redirect_to = "/Login";
                //     localStorage.setItem("reg_token", payload?.token);
                //     toast(payload?.message);
                // }
                // else {
                    // toast(payload?.message);
                // }
            })
            .addCase(createProduct.rejected, (state, { payload }) => { })

            .addCase(allProducts.pending, (state, { payload }) => { })
            .addCase(allProducts.fulfilled, (state, { payload }) => {
                if (payload?.status === 200) {
                    state.Products = payload?.data;
                    // state.redirect_to = "/Datalist";
                    // sessionStorage.setItem("first_name", payload?.data?.first_name);
                    // sessionStorage.setItem("last_name", payload?.data?.last_name);
                    // sessionStorage.setItem("profile_img", payload?.data?.profile_pic);
                    // localStorage.setItem("log_token", payload?.token);
                    // toast(payload?.message);
                }
                else {
                    // toast(payload?.message);
                }
            })
            .addCase(allProducts.rejected, (state, { payload }) => { })
    


            .addCase(updateProductsFn.pending, (state, { payload }) => { })
            .addCase(updateProductsFn.fulfilled, (state, { payload }) => {
                if (payload?.status === 200) {
                    state.Products = payload?.data;
                   
                }
                else {
                    // toast(payload?.message);
                }
            })
            .addCase(updateProductsFn.rejected, (state, { payload }) => { })


                .addCase(showProductFn.pending, (state, { payload }) => { })
                .addCase(showProductFn.fulfilled, (state, { payload }) => {
                    if (payload?.status === 200) {
                        state.showProducts = payload?.data;
                    //     state.redirect_to = "/Login";
                    //     localStorage.setItem("reg_token", payload?.token);
                    //     toast(payload?.message);
                    }
                    else {
                        // toast(payload?.message);
                    }
                })
                .addCase(showProductFn.rejected, (state, { payload }) => { })


                .addCase(deleteProductFn.pending, (state, { payload }) => { })
                .addCase(deleteProductFn.fulfilled, (state, { payload }) => {
                    if (payload?.status === 200) {
                        state.showProducts = payload?.data;
                    //     state.redirect_to = "/Login";
                    //     localStorage.setItem("reg_token", payload?.token);
                    //     toast(payload?.message);
                    }
                    else {
                        // toast(payload?.message);
                    }
                })
                .addCase(deleteProductFn.rejected, (state, { payload }) => { })
        }
})

export const { } = cmsSlice.actions;