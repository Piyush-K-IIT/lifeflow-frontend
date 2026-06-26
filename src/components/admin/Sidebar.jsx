import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  Activity,
  FileBarChart2,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();

  const menu = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      path: "/admin-dashboard",
    },
    {
      title: "Users",
      icon: <Users size={18} />,
      path: "/admin/users",
    },
    {
      title: "Hospitals",
      icon: <Building2 size={18} />,
      path: "/admin/hospitals",
    },
    {
      title: "Blood Requests",
      icon: <Activity size={18} />,
      path: "/admin/requests",
    },
    {
      title: "Reports",
      icon: <FileBarChart2 size={18} />,
      path: "/admin/reports",
    },
    {
      title: "Notifications",
      icon: <Bell size={18} />,
      path: "/admin/notifications",
    },
    {
      title: "Settings",
      icon: <Settings size={18} />,
      path: "/admin/settings",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="w-52 h-screen bg-white border-r border-gray-200 shadow-sm flex flex-col sticky top-0">

      {/* Sidebar Header */}
      <div className="px-5 py-6 border-b border-gray-200">
        <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
          Admin Panel
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-4 px-3">

        {menu.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-200 ${
                isActive
                  ? "bg-red-50 text-red-600 border border-red-200 shadow-sm"
                  : "text-gray-600 hover:bg-red-50 hover:text-red-600"
              }`
            }
          >
            {item.icon}

            <span className="font-medium text-[15px]">
              {item.title}
            </span>
          </NavLink>
        ))}

      </nav>

      {/* Footer */}
      <div className="border-t border-gray-200 p-5">

        <div className="mb-5">

          <p className="text-xs text-gray-500">
            Logged in as
          </p>

          <p className="font-semibold text-base text-gray-800 mt-1">
            Administrator
          </p>

          <div className="flex items-center gap-2 mt-2">

            <div className="w-2 h-2 rounded-full bg-green-500"></div>

            <span className="text-sm text-gray-600">
              Online
            </span>

          </div>

        </div>

        <button
          onClick={handleLogout}
          className="
            w-full
            flex
            items-center
            justify-center
            gap-2
            py-3
            rounded-xl
            border
            border-red-500
            text-red-600
            hover:bg-red-50
            transition-all
            font-semibold
          "
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;