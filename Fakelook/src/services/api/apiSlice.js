import { baseApiUrl } from '../../config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../../redux/authSlice';

const baseUrl = baseApiUrl + "auth";

const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().token;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
    rejectUnauthorized: false,
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.originalStatus === 401) {
        console.log('sending refresh token')
        // send refresh token to get new access token
        const refreshResult = await baseQuery('/refresh', api, extraOptions);
        console.log(refreshResult);
        if (refreshResult?.data) {
            const user = api.getState().auth.user;
            //store the new token
            api.dispatch(setCredentials({ ...refreshResult.data, user }));
            //retry the original query with new access token
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logOut());
        }
    }
    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({}),
});