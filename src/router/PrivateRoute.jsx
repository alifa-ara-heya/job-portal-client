import { useContext } from "react";
import AuthContext from "../context/AuthContext/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    // console.log(location); //pathname:"/jobs/675a06e62ab05c80ab8d102b"

    if (loading) {
        return <span className="loading loading-dots loading-lg"></span>
    }
    if (user) {
        return children;
    }

    return (
        <Navigate to='/sign-in' state={location?.pathname}></Navigate>
    );
};

export default PrivateRoute;