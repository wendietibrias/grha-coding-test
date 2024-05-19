import "./style.scss";
import useAuth,{ IUseAuth } from "../../../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const MainAuth = () => {
    const { token } = useAuth() as IUseAuth;

    if(token){
       return <Navigate to="/"/> 
    }

    return (
        <section className="main-auth-container">
            <Outlet/>
        </section>
    )
}

export default MainAuth;