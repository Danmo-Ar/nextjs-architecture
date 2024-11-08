import { API_URL } from "@/src/constants";
import Axios from "axios";

// import { store } from "@/store";
// import { authSliceActions } from "@/store/reducers/auth/auth.slice";

export const axios = Axios.create({
	baseURL: API_URL,
});

axios.interceptors.response.use(
	(response) => {
		return response.data;
	},
	(error) => {
		// const message = error.response?.data?.message || error.message;

		return Promise.reject(error);
	},
);
