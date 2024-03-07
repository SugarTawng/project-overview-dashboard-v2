import { Route } from "react-router-dom";
import PageWrapper from "../components/page_wrapper/page_wrapper";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";

import Dashboard from "../../features/dashboard/dashboard";
import SignIn from "../../features/auth/sign_in/sign_in";
import SignUp from "../../features/auth/sign_up/sign_up";

export const AppRoutes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
    state: "dashboard",
    sidebarProps: {
      displayText: "Dashboard",
      icon: <DashboardOutlinedIcon />,
    },
  },
  {
    path: "/sign-in",
    element: <SignIn />,
    state: "sign-in",
    sidebarProps: {
      displayText: "Sign In",
      icon: <LoginOutlinedIcon />,
    },
  },
  {
    path: "/sign-up",
    element: <SignUp />,
    state: "sign-up",
    sidebarProps: {
      displayText: "Sign Up",
      icon: <PersonAddOutlinedIcon />,
    },
  },
];

export const GenerateRoute = () => {
  return AppRoutes.map((route, index) => (
    <Route
      index
      path={route.path}
      element={<PageWrapper state={route.state}>{route.element}</PageWrapper>}
      key={index}
    />
  ));
};
