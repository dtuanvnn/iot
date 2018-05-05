import React from "react";
import PropTypes from "prop-types";
import cx from "classnames"
import { Switch, Redirect } from "react-router-dom";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";
import AddAlert from "@material-ui/icons/AddAlert";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { withStyles } from "material-ui";
import { Header, Footer, Sidebar } from "components";
import appRoutes from "routes/app.jsx"
import appStyle from "assets/jss/material-dashboard-react/appStyle.jsx";
import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";
import PrivateRoute from "../routes/private-route";

const switchRoutes = (
  <Switch>
    {appRoutes.map((prop, key) => {
      if (prop.redirect) {
        return <Redirect from={prop.path} to={prop.pathTo} key={key} />
      }
      if (prop.collapse)
        return prop.views.map((prop, key) => {
          return (
            <PrivateRoute path={prop.path} component={prop.component} key={key} />
          );
        });
      return <PrivateRoute path={prop.path} component={prop.component} key={key} />
    })}
  </Switch>
)

let ps;
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      mobileOpen: false,
      miniActive: false,
      image: image,
      color: "blue",
      bgColor: "black",
      hasImage: true,
      fixedClasses: "dropdown show",
    }
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  }
  componentDidMount() {
    /* this.notify("tl")
    this.notify("tl")
    this.notify("tl") */
    if(navigator.platform.indexOf('Win') > -1){
      // eslint-disable-next-line
      ps = new PerfectScrollbar(this.refs.mainPanel);
    }
  }
  componentDidUpdate() {
    this.refs.mainPanel.scrollTop = 0;
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  sidebarMinimize() {
    this.setState({ miniActive: !this.state.miniActive });
  }
  notify(place) {
    var color = Math.floor(Math.random() * 5 + 1);
    var type;
    switch (color) {
      case 1:
        type = "primary";
        break;
      case 2:
        type = "success";
        break;
      case 3:
        type = "danger";
        break;
      case 4:
        type = "warning";
        break;
      case 5:
        type = "info";
        break;
      default:
        break;
    }
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            Welcome to <b>IOT Management Tool</b> - made for a better life.
          </div>
        </div>
      ),
      type: type
    };
    this.refs.notificationAlert.notificationAlert(options);
  }
  render() {
    const { classes, ...rest } = this.props;
    const mainPanel =
      classes.mainPanel +
      " " +
      cx({
        [classes.mainPanelSidebarMini]: this.state.miniActive,
        [classes.mainPanelWithPerfectScrollbar]: navigator.platform.indexOf("Win") > -1
      });
    return (
      <div className={classes.wrapper}>
        <NotificationAlert ref="notificationAlert" />
        <Sidebar
          routes={appRoutes}
          logoText={"IOT"}
          logo={logo}
          image={this.state.image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          miniActive={this.state.miniActive}
          color={this.state.color}
          bgColor={this.state.bgColor}
          {...rest}
        />
        <div className={mainPanel} ref="mainPanel">
          <Header
            sidebarMinimize={this.sidebarMinimize.bind(this)}
            miniActive={this.state.miniActive}
            routes={appRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(appStyle)(App);