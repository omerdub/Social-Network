import { useLocation, Navigate, Outlet, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../redux/authSlice";
import { Layout } from "../layout";

export const RequireAuth = ({ routes }) => {
    const token = useSelector(selectCurrentToken);
    const location = useLocation();


    if (token && routes.find(r => `/${r.path}` === location.pathname)?.isOnlyUnauthorized) {
        return <Navigate to="/" state={{ from: location }} replace />
    }

    if (!token && routes.find(r => `/${r.path}` === location.pathname)?.isOnlyAuthorized) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return (
        token ?
            <Layout />
            : <Navigate to="/login" state={{ from: location }} />
    )
};