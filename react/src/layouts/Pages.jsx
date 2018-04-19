import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import { withStyles } from "material-ui";

import pageRoutes from "routes/pages.jsx"
import Footer from "components/Footer/Footer.jsx";

import pagesStyle from "assets/jss/material-dashboard-react/layouts/pagesStyle.jsx";
import bgImage from "assets/img/register.jpeg";

const switchRoutes = (
  <Switch>
    {pageRoutes.map((prop, key) => {
      if (prop.redirect) {
        return <Redirect from={prop.path} to={prop.pathTo} key={key} />
      }
      return <Route path={prop.path} component={prop.component} key={key} />
    })}
  </Switch>
)

class Pages extends React.Component {
	render() {
		const { classes, ...rest } = this.props
		return (
			<div>
				<div className={classes.wrapper} ref="wrapper">
					<div className={classes.fullPage}>
						{switchRoutes}
						<Footer white />
						<div className={classes.fullPageBackground}
							style={{ backgroundImage: "url("+ bgImage + ")" }} />
					</div>
				</div>
			</div>
		)
	}
}

Pages.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(pagesStyle)(Pages)