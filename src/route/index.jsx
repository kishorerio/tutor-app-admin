//Layout
import AdminLayout from "../components/AdminLayout";

// Pages
import { Login } from "../pages/Login/Login";
import DashboardPage from "../pages/Dashboard/Dashboard";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import UserManagement from "../pages/UserManagement";
import TutorManagement from "../pages/TutorManagement";

const publicRoutes = [
  { path: "/", component: <Login /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgotPassword /> },
];

const privateRoutes = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "users-manage",
        element: <UserManagement />,
      },
      {
        path: "tutors-manage",
        element: <TutorManagement />,
      },
    ],
  },
];

export { publicRoutes, privateRoutes };
