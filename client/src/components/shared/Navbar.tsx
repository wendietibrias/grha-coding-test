import useAuth,{ IUseAuth } from "../../hooks/useAuth";
import useSidebar, { IUseSidebar } from "../../hooks/useSidebar";

const Navbar = () => {
    const { user } = useAuth() as IUseAuth;
    const { isShowSidebar,openSidebar,closeSidebar } = useSidebar() as IUseSidebar;
     
    return (
        <nav className="navbar-container">
           <div className="user-info-container">
            <span className="avatar-user">{user?.name?.charAt(0)}</span>
            <div className="user-info">
              <h5>{user?.name}</h5>
              <h6>{user?.email}</h6>
            </div>
           </div>
           <button onClick={()=>{
             if(isShowSidebar) {
                return closeSidebar();
             }

             return openSidebar();
           }} className="menu-burger">
            {isShowSidebar ? (
              <i className="ri-close-line"></i>
            ) : (
              <i className="ri-menu-2-line"></i>
            )}
          </button>
        </nav>
    )
}

export default Navbar;