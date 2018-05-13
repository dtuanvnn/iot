import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// react component plugin for creating a beautiful datetime dropdown picker
import Datetime from "react-datetime";
// material-ui components
import { withStyles, FormControl } from "material-ui";

// @material-ui/icons
import Timeline from "@material-ui/icons/Timeline";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/ItemGrid.jsx";
import ChartCard from "components/Cards/ChartCard.jsx";
import IconCard from "components/Cards/IconCard.jsx";
import { Button } from "components"
import {
  dailySalesChart
} from "variables/charts.jsx";

import { API } from 'util/apiCaller'
import chartsStyle from "assets/jss/material-dashboard-react/views/chartsStyle.jsx";

class SensorCharts extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      sensors: [],
      airHumData: {
        labels: [],
        series: [[]]
      },
      pages: null,
      loading: true
    }
    this.fetchData = this.fetchData.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleStartDate = this.handleStartDate.bind(this)
    this.handleEndDate = this.handleEndDate.bind(this)
    this.isValidDate = this.isValidDate.bind(this)
  }
  handleStartDate = (date) => {
    this.setState({startDate: date._d})
  }
  handleEndDate = (date) => {
    this.setState({endDate: date._d})
  }
  isValidDate = (date) => {
    return date.isSameOrAfter(this.state.startDate)
  }
  handleClick = () => {
    let isValid = this.state.startDate && this.state.endDate
    if (!isValid) {
      return
    }
    this.fetchData()
  }
  fetchData() {
    // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
    // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
    this.setState({ loading: true });
    // Request the data however you want.  Here, we'll use our mocked service we created earlier
    let id = undefined
    if (this.props.location.state && this.props.location.state.userid) {
      id = this.props.location.state.userid
    } else {
      id = localStorage.getItem('userid')
    }
    let params = "startDate="+this.state.startDate.valueOf()
    params += "&endDate="+this.state.endDate.valueOf()
    params += id ? ("&id="+id) : ""
    let url = "api/history/sensor/filter" + (params ? ("?"+params) : "")
    API(url).then(res => {
      var airHumData = {labels: [], series: [[]]}
      res.data.forEach((sensor, key) => {
        airHumData.labels.push(sensor.utc.toString())
        airHumData.series[0].push(sensor.airHum)
      })

  		this.setState({
        sensors: res.data,
        airHumData: airHumData,
        loading: false
      })
  	})
  }
  render() {
    const { classes } = this.props
    const { sensors, loading, airHumData }  = this.state
    return (
      <div>
        <GridContainer>
        <ItemGrid xs={12} sm={12} md={12} lg={12}>
            <table style={{marginBottom: 20}}>
              <tbody>
                <tr>
                <td style={{paddingRight: 10}}>
                  <FormControl fullWidth>
                    <Datetime
                      timeFormat={false}
                      closeOnSelect={true}
                      inputProps={{ placeholder: "Từ ngày" }}
                      onChange={this.handleStartDate}
                    />
                  </FormControl>
                </td>
                <td style={{paddingLeft: 10}}>
                  <FormControl fullWidth>
                    <Datetime
                      timeFormat={false}
                      closeOnSelect={true}
                      inputProps={{ placeholder: "Đến ngày" }}
                      onChange={this.handleEndDate}
                      isValidDate={this.isValidDate}
                    />
                  </FormControl>
                </td>
                <td style={{paddingLeft: 10}}>
                  <Button color="primary" onClick={this.handleClick}>Lọc</Button>
                </td>
                </tr>
              </tbody>
            </table>
          </ItemGrid>
        </GridContainer>
        <GridContainer>
          <ItemGrid xs={12} sm={12} md={12}>
            <IconCard
              icon={Timeline}
              title="Coloured Line Chart "
              category="- Rounded"
              iconColor="blue"
              content={
                <ChartistGraph
                  data={airHumData}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              }
            />
          </ItemGrid>
          {/* <ItemGrid xs={12} sm={12} md={6}>
            <IconCard
              icon={Timeline}
              iconColor="rose"
              title="Multiple Bars Chart "
              category="- Bar Chart"
              content={
                <ChartistGraph
                  data={multipleBarsChart.data}
                  type="Bar"
                  options={multipleBarsChart.options}
                  listener={multipleBarsChart.animation}
                />
              }
            />
          </ItemGrid> */}
        </GridContainer>
        {/* <GridContainer>
          <ItemGrid xs={12} sm={12} md={7}>
            <IconCard
              icon={Timeline}
              title="Coloured Lines Chart "
              category="- Rounded"
              iconColor="blue"
              content={
                <ChartistGraph
                  data={colouredLinesChart.data}
                  type="Line"
                  options={colouredLinesChart.options}
                  listener={colouredLinesChart.animation}
                />
              }
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={5}>
            <IconCard
              icon={Timeline}
              iconColor="red"
              title="Pie Chart"
              content={
                <ChartistGraph
                  data={pieChart.data}
                  type="Pie"
                  options={pieChart.options}
                />
              }
              footer={
                <div>
                  <h6 className={classes.legendTitle}>Legend</h6>
                  <i className={"fas fa-circle " + classes.info} /> Apple{` `}
                  <i
                    className={"fas fa-circle " + classes.warning}
                  /> Samsung{` `}
                  <i className={"fas fa-circle " + classes.danger} /> Windows
                  Phone{` `}
                </div>
              }
            />
          </ItemGrid>
        </GridContainer> */}
      </div>
    );
  }
}

export default withStyles(chartsStyle)(SensorCharts);



// WEBPACK FOOTER //
// ./src/views/Charts/Charts.jsx