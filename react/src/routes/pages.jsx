import LoginPage from "views/Pages/LoginPage.jsx";

// @material-ui/icons
import Fingerprint from "@material-ui/icons/Fingerprint";

const pagesRoutes = [
  {
    path: "/pages/login",
    name: "Login Page",
    short: "Login",
    mini: "LP",
    icon: Fingerprint,
    component: LoginPage
  },
  {
    redirect: true,
    path: "/pages",
    pathTo: "/pages/login",
    name: "Login Page"
  }
]

export default pagesRoutes