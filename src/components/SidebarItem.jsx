//icons
import DashboardIcon from "../assets/images/Dashboard Images/dashboardIcon_light.svg";
import DashboardIconDark from "../assets/images/Dashboard Images/dashboardIcon_light.svg";
// import AnnIcon from "../assets/images/Dashboard Images/megaphone_svgrepo.com.svg";
import GroupIcon from "../assets/images/Dashboard Images/group_svgrepo.com.svg";
// import TimeIcon from "../assets/images/Dashboard Images/calendar_svgrepo.com.svg";
// import MoneyIcon from "../assets/images/Dashboard Images/money-bag_svgrepo.com.svg";
// import MessageIcon from "../assets/images/Dashboard Images/message-text-1_svgrepo.com.svg";
// import SettingsIcon from "../assets/images/Dashboard Images/settings_svgrepo.com.svg";

const SidebarItems = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: DashboardIcon,
    iconDark: DashboardIconDark,
  },
  {
    name: "Users Management",
    icon: GroupIcon,
    iconDark: GroupIcon,
    submenu: [
      {
        name: "Manage Users",
        path: "/admin/users-manage",
      },
      {
        name: "Manage Tutors",
        path: "/admin/tutors-manage",
      },
    ],
  },
];

export default SidebarItems;
