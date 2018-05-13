import React from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";
import { Redirect, Link } from "react-router-dom"
// @material-ui/icons
import { Assignment, Dvr, Favorite, Close } from "@material-ui/icons"
// core components
import GridContainer from "components/Grid/GridContainer.jsx"
import ItemGrid from "components/Grid/ItemGrid.jsx"
import IconCard from "components/Cards/IconCard.jsx"
import IconButton from "components/CustomButtons/IconButton.jsx"

import { API } from 'util/apiCaller'

class SensorHistory extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      sensors: [],
      pages: null,
      loading: true,
      redirect: false
    }
    this.setRedirect = this.setRedirect.bind(this)
    this.fetchData = this.fetchData.bind(this)
  }
  setRedirect = (key) => {
    this.setState({redirect: key})
  }
  fetchData(state, instance) {
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
    let params = "pageSize="+state.pageSize
    params += "&page="+state.page
    params += id ? ("&id="+id) : ""
    let url = "api/history/sensor" + (params ? ("?"+params) : "")
    API(url).then(res => {
  		this.setState({
        sensors: res.data,
        pages: res.pages,
        loading: false
      })
  	})
  }
  componentDidMount() {
    
  }
  render(){
    const {sensors, pages, loading, redirect} = this.state
    return (
      <GridContainer>
        <ItemGrid xs={12}>
          <IconCard
            icon={Assignment}
            title="Notification History Table"
            content={
              <ReactTable
                manual
                data={sensors}
                filterable
                pages={pages} // Display the total number of pages
                loading={loading} // Display the loading overlay when we need it
                onFetchData={this.fetchData} // Request new data when things change
                columns={[
                  {
                    Header: "Time",
                    accessor: "utc",
                  },
                  {
                    Header: "Nhiệt độ không khí",
                    accessor: "airTemp"
                  },
                  {
                    Header: "Độ ẩm không khí",
                    accessor: "airHum"
                  },
                  {
                    Header: "Nhiệt độ đất",
                    accessor: "soilTemp"
                  },
                  {
                    Header: "Độ ẩm đất",
                    accessor: "soilHum"
                  },
                  {
                    Header: "Electric Negative",
                    accessor: "elecNeg"
                  },
                  {
                    Header: "Action",
                    accessor: "actions",
                    sortable: false,
                    filterable: false,
                  }
                ]}
                defaultPageSize={10}
                showPaginationTop
                showPaginationBottom={false}
                className="-striped -highlight"
              />
            }
          />
        </ItemGrid>
      </GridContainer>
    );
  }
}

export default SensorHistory;