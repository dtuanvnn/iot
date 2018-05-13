import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux"

// react plugin for creating charts
import ChartistGraph from "react-chartist";
// react component plugin for creating a beautiful datetime dropdown picker
import Datetime from "react-datetime";
import {
  ContentCopy,
  Store,
  InfoOutline,
  Warning,
  DateRange,
  LocalOffer,
  Update,
  ArrowUpward,
  AccessTime,
  Accessibility
} from "@material-ui/icons";
import { withStyles, Grid, InputLabel, FormControl } from "material-ui";

import {
  StatsCard,
  ChartCard,
  TasksCard,
  RegularCard,
  Table,
  ItemGrid,
  IconCard,
  Button
} from "components";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts";

import dashboardStyle from "assets/jss/material-dashboard-react/dashboardStyle";

class Index extends React.Component {
  state = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const { classes, admin } = this.props
    return (
      <div>
        {admin > 0 ? (
        <RegularCard
         content={
          <Grid container>
          <ItemGrid xs={12} sm={12} md={12} lg={12}>
            <table style={{marginBottom: 20}}>
              <tr>
                <td style={{paddingRight: 10}}>
                  <FormControl fullWidth>
                    <Datetime
                      timeFormat={false}
                      inputProps={{ placeholder: "Từ ngày" }}
                    />
                  </FormControl>
                </td>
                <td style={{paddingLeft: 10}}>
                  <FormControl fullWidth>
                    <Datetime
                      timeFormat={false}
                      inputProps={{ placeholder: "Đến ngày" }}
                    />
                  </FormControl>
                </td>
                <td style={{paddingLeft: 10}}>
                  <Button color="primary">Lọc</Button>
                </td>
              </tr>
            </table>
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={6} lg={3}>
            <StatsCard
              icon={ContentCopy}
              iconColor="orange"
              title="Customers"
              subheader="Registered/Online"
              content="50"
              subcontent="50 / 10"
              description="10"
              /* small="GB" */
              statIcon={Warning}
              statIconColor="danger"
              statLink={{ text: "Get More Space...", href: "#pablo" }}
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={6} lg={3}>
            <StatsCard
              icon={Store}
              iconColor="green"
              title="Gateways"
              subheader="Sold/Online"
              subcontent="50 / 10"
              description="$34,245"
              statIcon={DateRange}
              statText="Last 24 Hours"
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={6} lg={3}>
            <StatsCard
              icon={InfoOutline}
              iconColor="red"
              title="Sensors"
              subheader="Sold/Online"
              subcontent="50 / 10"
              description="75"
              statIcon={LocalOffer}
              statText="Tracked from Github"
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={6} lg={3}>
            <StatsCard
              icon={Accessibility}
              iconColor="blue"
              title="Relays"
              subheader="Sold/Online"
              subcontent="50 / 10"
              description="+245"
              statIcon={Update}
              statText="Just Updated"
            />
          </ItemGrid>
          </Grid>
         } />
        ) : undefined}
        <Grid container>
          <ItemGrid xs={12} sm={12} md={4}>
            <ChartCard
              chart={
                <ChartistGraph
                  className="ct-chart"
                  data={dailySalesChart.data}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              }
              chartColor="green"
              title="Daily Sales"
              text={
                <span>
                  <span className={this.props.classes.successText}>
                    <ArrowUpward
                      className={this.props.classes.upArrowCardCategory}
                    />{" "}
                    55%
                  </span>{" "}
                  increase in today sales.
                </span>
              }
              statIcon={AccessTime}
              statText="updated 4 minutes ago"
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={4}>
            <ChartCard
              chart={
                <ChartistGraph
                  className="ct-chart"
                  data={emailsSubscriptionChart.data}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              }
              chartColor="orange"
              title="Email Subscriptions"
              text="Last Campaign Performance"
              statIcon={AccessTime}
              statText="campaign sent 2 days ago"
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={4}>
            <ChartCard
              chart={
                <ChartistGraph
                  className="ct-chart"
                  data={completedTasksChart.data}
                  type="Line"
                  options={completedTasksChart.options}
                  listener={completedTasksChart.animation}
                />
              }
              chartColor="red"
              title="Completed Tasks"
              text="Last Campaign Performance"
              statIcon={AccessTime}
              statText="campaign sent 2 days ago"
            />
          </ItemGrid>
        </Grid>
        {admin > 0 ? (<Grid container>
          <ItemGrid xs={12} sm={12} md={6}>
            <TasksCard />
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={6}>
            <RegularCard
              headerColor="orange"
              cardTitle="Khách hàng đăng ký mới"
              cardSubtitle={"Đến ngày "}
              content={
                <Table
                  tableHeaderColor="warning"
                  tableHead={["STT", "Tên", "Tỉnh/TP", "Quận/Huyện"]}
                  tableData={[
                    ["1", "Dakota Rice", "$36,738", "Niger"],
                    ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                    ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                    ["4", "Philip Chaney", "$38,735", "Korea, South"]
                  ]}
                />
              }
            />
          </ItemGrid>
        </Grid>) : undefined}
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
  admin: PropTypes.number.isRequired
};

export default connect(state => ({
  admin: state.loggedIn.admin
}))(withStyles(dashboardStyle)(Index));
