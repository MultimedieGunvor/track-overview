import { Outlet } from "react-router-dom";
import Header from "./Header";

// in App.js, we nested all the routes as children inside a "Layout" route
const Layout = () => {
    return (
      <div>
        <Header />
        <div className="content">
          {/* "Outlet" swaps between the child routes */}
          <Outlet />
        </div>
      </div>
    );
};
  
export default Layout;