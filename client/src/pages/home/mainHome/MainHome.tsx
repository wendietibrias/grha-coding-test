import "./style.scss";
import { useNavigate, Outlet } from "react-router-dom";
import { Sidebar,Navbar } from "../../../components";
import useAuth,{ IUseAuth } from "../../../hooks/useAuth";
import { useEffect } from "react";

const MainHome = () => {
    const { token,user,onLogout } = useAuth() as IUseAuth;
    const navigate = useNavigate();
 
    useEffect(() => {
        if(!token) {
          navigate("/auth");
        } 

        if((user?.exp && user.exp * 1000 < new Date().getTime())) {
            onLogout();
        }
    
    }, [token])

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