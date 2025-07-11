import {
  IconHome,
  IconHomeFilled,
  IconSquareRoundedPlus,
  IconSquareRoundedPlusFilled,
  IconBellRinging,
  IconBellRingingFilled,
  IconLogout,
} from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;

  // Active style helper
const isActive = (route) => path === route;

  return (
    <aside className="w-20   p-5 flex flex-col items-center gap-5 h-screen border-r border-r-gray-200">
      {/* Logo */}
      <div className="rounded-full text-white bg-red-500 h-8 w-8 flex items-center justify-center shadow-md">
        <span className="font-bold text-xl">P</span>
      </div>

      {/* Navigation Icons */}
      <nav className="flex flex-col items-center space-y-12 mt-10">
        <Link to="/home" title="Home">
         {isActive("/home") ? (
          <IconHomeFilled size={30} strokeWidth={1.5} />
        ) : (
          <IconHome size={30} strokeWidth={1.5} />
        )}
        </Link>
        <Link to="/create" title="Create">
           {isActive("/create") ? (
          <IconSquareRoundedPlusFilled size={30} strokeWidth={1.5} />
        ) : (
          <IconSquareRoundedPlus size={30} strokeWidth={1.5} />
        )}
        </Link>
        <Link to="/notifications" title="Notifications">
             {isActive("/notifications") ? (
          <IconBellRingingFilled size={30} strokeWidth={1.5} />
        ) : (
          <IconBellRinging size={30} strokeWidth={1.5} />
        )}
        </Link>
        <Link to="/logout" title="Logout">
          <IconLogout
            size={30}
            strokeWidth={1.5}

          />
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
