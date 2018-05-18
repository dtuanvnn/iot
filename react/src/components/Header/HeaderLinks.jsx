import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Manager, Target, Popper } from "react-popper";
import {
  withStyles,
  IconButton,
  MenuItem,
  MenuList,
  Grow,
  Paper,
  ClickAwayListener,
  Hidden,
  Tooltip,
  Badge
} from "material-ui";
import { Person, Notifications, Dashboard, Search } from "@material-ui/icons";

import { CustomInput, IconButton as SearchButton } from "components";
import SweetAlert from "react-bootstrap-sweetalert";
import { Redirect } from "react-router-dom"
import { API } from 'util/apiCaller'
import { connect } from "react-redux"
import { fetchLogout } from "actions/logout.jsx"
import {
  REQUEST_LOGOUT,
  RECEIVE_LOGOUT,
  FAILED_LOGOUT
} from "actions/logout.jsx"

import headerLinksStyle from "assets/jss/material-dashboard-react/headerLinksStyle";

class HeaderLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      dashboard: false,
      logout: false,
      alert: null
    }
    this.successAlert = this.successAlert.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }
  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleClose = () => {
    this.setState({ open: false });
  }
  handleDashboad = () => {
    this.setState({ dashboard: true });
  }
  handleLogout = () => {
    const { dispatch } = this.props
    dispatch(fetchLogout())

    /* API('logout', this.props.token).then(res => {
  		localStorage.clear()
      this.setState({ logout: true });
  	}) */
  }
  successAlert = () => {
    this.setState({
      alert: (
        <SweetAlert
          success
          style={{ display: "block", marginTop: "-100px" }}
          title="You logged out"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
        >
          Click on the button to redirect to login page.
        </SweetAlert>
      )
    })
  }
  errorAlert = (logoutMessage) => {
    this.setState({
      alert: (
        <SweetAlert
          danger
          style={{ display: "block", marginTop: "-100px" }}
          title="Error"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
        >
          {logoutMessage}
        </SweetAlert>
      )
    })
  }
  hideAlert() {
    this.setState({
      alert: null,
      logout: true
    });
  }
  componentWillMount = () => {
    this.setState({dashboard: false, logout: false})
  }
  render() {
    const { classes, isFetching, logoutType, logoutMessage } = this.props;
    const { open, dashboard, alert, logout } = this.state;
    if (dashboard) {
      this.setState({dashboard: false})
      return <Redirect to={"/home"} />
    }
    if (logout) {
      localStorage.clear()
      this.setState({logout: false})
      return <Redirect to={"/pages/login"} />
    }
    if (alert === null && isFetching) {
      /* if (logoutType === FAILED_LOGOUT) {
        this.errorAlert(logoutMessage)
      } */
      /* if (logoutType === RECEIVE_LOGOUT) {
        this.successAlert()
      } */
      this.successAlert()
    }
    return (
      <div>
        {alert}
        {/* <CustomInput
          formControlProps={{
            className: classes.margin + " " + classes.search
          }}
          inputProps={{
            placeholder: "Search",
            inputProps: {
              "aria-label": "Search"
            }
          }}
        /> */}
        {/* <SearchButton
          color="white"
          aria-label="edit"
          customClass={classes.margin + " " + classes.searchButton}
        >
          <Search className={classes.searchIcon} />
        </SearchButton> */}
        <Tooltip
          id="tooltip-top"
          title="Dashboard"
          placement="bottom"
          classes={{ tooltip: classes.tooltip }}
        >
          <IconButton
            color="inherit"
            aria-label="Dashboard"
            className={classes.buttonLink}
            onClick={this.handleDashboad}
          >
            <Dashboard className={classes.links} />
            <Hidden mdUp>
              <p className={classes.linkText}>Dashboard</p>
            </Hidden>
          </IconButton>
        </Tooltip>
        <Manager style={{ display: "inline-block" }}>
          <Target>
            {/* <Badge
              badgeContent={5}
              primary={true}
              badgeStyle={classes.notifications}
            > */}
            <IconButton
              color="inherit"
              aria-label="Notifications"
              aria-owns={open ? "menu-list" : null}
              aria-haspopup="true"
              onClick={this.handleClick}
              className={classes.buttonLink}
            >
              <Notifications className={classes.links} />
              {<span className={classes.notifications}>5</span>}
              <Hidden mdUp>
                <p onClick={this.handleClick} className={classes.linkText}>
                  Notification
                </p>
              </Hidden>
            </IconButton>
            
            {/* </Badge> */}
          </Target>
          <Popper
            placement="bottom-start"
            eventsEnabled={open}
            className={
              classNames({ [classes.popperClose]: !open }) +
              " " +
              classes.pooperResponsive
            }
          >
            <ClickAwayListener onClickAway={this.handleClose}>
              <Grow
                in={open}
                id="menu-list"
                style={{ transformOrigin: "0 0 0" }}
              >
                <Paper className={classes.dropdown}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={this.handleClose}
                      className={classes.dropdownItem}
                    >
                      Mike John responded to your email
                    </MenuItem>
                    <MenuItem
                      onClick={this.handleClose}
                      className={classes.dropdownItem}
                    >
                      You have 5 new tasks
                    </MenuItem>
                    <MenuItem
                      onClick={this.handleClose}
                      className={classes.dropdownItem}
                    >
                      You're now friend with Andrew
                    </MenuItem>
                    <MenuItem
                      onClick={this.handleClose}
                      className={classes.dropdownItem}
                    >
                      Another Notification
                    </MenuItem>
                    <MenuItem
                      onClick={this.handleClose}
                      className={classes.dropdownItem}
                    >
                      Another One
                    </MenuItem>
                  </MenuList>
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>
        </Manager>
        <Tooltip
          id="tooltip-top"
          title="Logout"
          placement="bottom"
          classes={{ tooltip: classes.tooltip }}
        >
          <IconButton
            color="inherit"
            aria-label="Person"
            className={classes.buttonLink}
            onClick={this.handleLogout}
          >
            <Person className={classes.links} />
            <Hidden mdUp>
              <p className={classes.linkText}>Profile</p>
            </Hidden>
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

HeaderLinks.propTypes = {
  classes: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  logoutType: PropTypes.string.isRequired,
  logoutMessage: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateTOProps = (state) => {
  const {loggedIn, loggedOut} = state
  return  {
    token: loggedIn.token,
    isFetching: loggedOut.isFetching,
    logoutType: loggedOut.type,
    logoutMessage: loggedOut.message
  }
}
export default connect(mapStateTOProps)(withStyles(headerLinksStyle)(HeaderLinks));
