import { Link,useLocation } from "react-router-dom";
import useAuth, { IUseAuth } from "../../hooks/useAuth";
import useSidebar, { IUseSidebar } from "../../hooks/useSidebar";

const Sidebar = () => {
    const { pathname } = useLocation();
    const { onLogout } = useAuth() as IUseAuth;

    const { isShowSidebar } = useSidebar() as IUseSidebar;

    return (
        <aside className={`sidebar ${isShowSidebar && 'active'}`}>
            <header>
                <Link className="company-logo" to="/">
                   <i className="ri-book-open-line"></i>
                   <h4>E-LIBRARY</h4>
                </Link>
            </header>
            <div className="sidebar-links-container">
                <Link to="/" className={`sidebar-link-item ${pathname === "/" && 'active'}`}>
                   <i className="ri-book-2-line"></i>
                   <span>Books</span>
                </Link> 
                <Link to="/book/create" className={`sidebar-link-item ${pathname === "/book/create" && 'active'}`}>
                   <i className="ri-add-circle-line"></i>
                   <span>Add book</span>
                </Link>
                <Link to="/category" className={`sidebar-link-item ${pathname === "/category" && 'active'}`}>
                   <i className="ri-file-text-line"></i>
                   <span>Categories</span>
                </Link>
                <button onClick={()=> onLogout()} className="logout-button">
                  <i className="ri-logout-circle-r-line"></i>
                  Logout
                </button>
            </div>
        </aside>
    )
}

export default Sidebar;