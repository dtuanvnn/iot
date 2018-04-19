import IndexPage from "views/Index/Index.jsx";
import UserProfilePage from "views/User/Profile.jsx";
import UserListPage from "views/User/Lists.jsx";

// @material-ui/icons
import { Dashboard, PermIdentity } from "@material-ui/icons"

const appRoutes = [
  {
    path: "/home",
    sidebarName: "Home Page",
    navbarName: "IOT Home Page",
    icon: Dashboard,
    component: IndexPage
  },
  {
    path: "/profile",
    sidebarName: "User Profile",
    navbarName: "IOT User Profile",
    icon: PermIdentity,
    component: UserProfilePage
  },
  {
    path: "/users",
    sidebarName: "Users List",
    navbarName: "IOT Users List",
    icon: PermIdentity,
    component: UserListPage
  },
  {
    redirect: true,
    path: "/",
    pathTo: "/home"
  }
]

export default appRoutes;