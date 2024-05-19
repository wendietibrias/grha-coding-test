import "./style.scss";
import { Navigate, Outlet } from "react-router-dom";
import { Sidebar,Navbar } from "../../../components";
import useAuth,{ IUseAuth } from "../../../hooks/useAuth";

const MainHome = () => {
    const { token,user } = useAuth() as IUseAuth;

    if(!token || (user?.exp && user.exp * 1000 < new Date().getTime())) {
        return <Navigate to="/auth"/>
    }

    return (
        <section className="home-container">
            <Sidebar/>
            <div className="main-content">
                <Navbar/>
                <Outlet/>
            </div>
        </section>
    )
}

export default MainHome;