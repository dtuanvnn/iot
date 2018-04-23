import React from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Tabs,
  Tab
} from "material-ui";

import { Tasks, Table } from "components";

import tasksCardStyle from "assets/jss/material-dashboard-react/tasksCardStyle";

class TasksCard extends React.Component {
  state = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          classes={{
            root: classes.cardHeader,
            title: classes.cardTitle,
            content: classes.cardHeaderContent
          }}
          title="Filter user login:"
          action={
            <Tabs
              classes={{
                flexContainer: classes.tabsContainer,
                indicator: classes.displayNone
              }}
              value={this.state.value}
              onChange={this.handleChange}
              textColor="inherit"
            >
              <Tab
                classes={{
                  root: classes.root,
                  wrapper: classes.tabWrapper,
                  // labelIcon: classes.labelIcon,
                  label: classes.label,
                  textColorInheritSelected: classes.textColorInheritSelected
                }}
                // icon={<BugReport className={classes.tabIcon} />}
                label={"24 hours"}
              />
              <Tab
                classes={{
                  root: classes.root,
                  wrapper: classes.tabWrapper,
                  // labelIcon: classes.labelIcon,
                  label: classes.label,
                  textColorInheritSelected: classes.textColorInheritSelected
                }}
                // icon={<Code className={classes.tabIcon} />}
                label={"48 hours"}
              />
              <Tab
                classes={{
                  root: classes.root,
                  wrapper: classes.tabWrapper,
                  // labelIcon: classes.labelIcon,
                  label: classes.label,
                  textColorInheritSelected: classes.textColorInheritSelected
                }}
                // icon={<Cloud className={classes.tabIcon} />}
                label={"1 week"}
              />
            </Tabs>
          }
        />
        <CardContent>
          {this.state.value === 0 && (
            <Table
              tableHeaderColor="warning"
              tableHead={["ID", "Name", "Salary", "Country"]}
              tableData={[
                ["1", "Dakota Rice", "$36,738", "Niger"],
                ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                ["4", "Philip Chaney", "$38,735", "Korea, South"]
              ]}
            />
          )}
          {this.state.value === 1 && (
            <Table
              tableHeaderColor="warning"
              tableHead={["ID", "Name", "Salary", "Country"]}
              tableData={[
                ["1", "Dakota Rice", "$36,738", "Niger"],
                ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                ["4", "Philip Chaney", "$38,735", "Korea, South"]
              ]}
            />
          )}
          {this.state.value === 2 && (
            <Table
              tableHeaderColor="warning"
              tableHead={["ID", "Name", "Salary", "Country"]}
              tableData={[
              ]}
            />
          )}
        </CardContent>
      </Card>
    );
  }
}

TasksCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(tasksCardStyle)(TasksCard);
