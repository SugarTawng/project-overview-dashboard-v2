import { Route } from "react-router-dom";
import PageWrapper from "../components/page_wrapper/page_wrapper";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import DonutLargeOutlinedIcon from "@mui/icons-material/DonutLargeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

import Dashboard from "../../features/dashboard/dashboard";
import SignIn from "../../features/auth/sign_in/sign_in";
import SignUp from "../../features/auth/sign_up/sign_up";
import Customer from "../../features/customers/customers";
import PaymentMethods from "../../features/paymentMethods/paymentMethods";
import PaymentProcesses from "../../features/paymentProcesses/paymentProcesses";
import Notifications from "../../features/notifications/notifications";

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
    path: "/customers",
    element: <Customer />,
    state: "customers",
    sidebarProps: {
      displayText: "Customer",
      icon: <PersonOutlineOutlinedIcon />,
    },
  },

  {
    path: "/payment-methods",
    element: <PaymentMethods />,
    state: "payment-methods",
    sidebarProps: {
      displayText: "Payment method",
      icon: <ReceiptLongOutlinedIcon />,
    },
  },

  {
    path: "/payment-processes",
    element: <PaymentProcesses />,
    state: "payment-processes",
    sidebarProps: {
      displayText: "Payment process",
      icon: <DonutLargeOutlinedIcon />,
    },
  },

  {
    path: "/notifications",
    element: <Notifications />,
    state: "notifications",
    sidebarProps: {
      displayText: "Notification",
      icon: <NotificationsOutlinedIcon />,
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
