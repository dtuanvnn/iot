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

class DeviceList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      devices: [],
      redirect: false
    }
    this.setRedirect = this.setRedirect.bind(this)
  }
  setRedirect = (key) => {
    this.setState({redirect: key})
  }
  componentDidMount() {
    let id = undefined
    if (this.props.location.state && this.props.location.state.userid) {
      id = this.props.location.state.userid
    } else {
      id = localStorage.getItem('userid')
    }
    let url = "api/device" + (id ? ("?id=" + id) : "")
  	API(url).then(res => {
  		var data = res.map((device,key) => {
        device['actions'] = (
          <div className="actions-right">
            {/* <IconButton
              onClick={this.setRedirect(user._id)}
              color="infoNoBackground"
              customClass="edit">
              <Dvr />
            </IconButton> */}
            <Link to={{ pathname: "profile/", state: { deviceid: device._id}}}>
            <Dvr />
            </Link>
          </div>
        )
        return device
      })
  		this.setState({devices: data})
  	})
  }
  render(){
    const {devices, redirect} = this.state
    return (
      <GridContainer>
        <ItemGrid xs={12}>
          <IconCard
            icon={Assignment}
            title="Devices table"
            content={
              <ReactTable
                data={devices}
                filterable
                columns={[
                  {
                    Header: "Name",
                    accessor: "name",
                  },
                  {
                    Header: "Type",
                    accessor: "type"
                  },
                  {
                    Header: "Relay",
                    accessor: "relay"
                  },
                  {
                    Header: "Status",
                    accessor: "status"
                  },
                  {
                    Header: "Enable",
                    accessor: "enable"
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

export default DeviceList;



// WEBPACK FOOTER //
// ./src/views/Tables/ReactTables.jsx