import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import { withStyles } from "material-ui";

import userRoutes from "routes/users.jsx"
import Footer from "components/Footer/Footer.jsx";

import appStyle from "assets/jss/material-dashboard-react/appStyle.jsx";
import bgImage from "assets/img/register.jpeg";

const switchRoutes = (
  <Switch>
    {userRoutes.map((prop, key) => {
      if (prop.redirect) {
        return <Redirect from={prop.path} to={prop.pathTo} key={key} />
      }
      return <Route path={prop.path} component={prop.component} key={key} />
    })}
  </Switch>
)

class User extends React.Component {
	render() {
		const { classes, ...rest } = this.props
		return (
			<div>
				{switchRoutes}
			</div>
		)
	}
}

User.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(appStyle)(User)