import IndexPage from "views/Index/Index.jsx";
import UserProfilePage from "views/User/Profile.jsx";
import UserListPage from "views/User/Lists.jsx";

// @material-ui/icons
import { Dashboard, PermIdentity } from "@material-ui/icons"

const appRoutes = [
  {
    path: "/user/list",
    navbarName: "IOT User List",
    icon: Dashboard,
    component: UserListPage
  },
  {
    path: "/user/profile",
    navbarName: "IOT User Profile",
    icon: PermIdentity,
    component: UserProfilePage
  },
  {
    redirect: true,
    path: "/user",
    pathTo: "/user/list"
  }
]

export default appRoutes;