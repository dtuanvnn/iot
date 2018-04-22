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

import callApi from 'util/apiCaller'

class ReactTables extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      users: [],
      redirect: false
    }
    this.setRedirect = this.setRedirect.bind(this)
  }
  setRedirect = (key) => {
    this.setState({
      redirect: key
    })
  }
  componentDidMount() {
  	callApi('api/user').then(res => {
  		var data = res.map((user,key) => {
        user['actions'] = (
          <div className="actions-right">
            {/* <IconButton
              onClick={this.setRedirect(user._id)}
              color="infoNoBackground"
              customClass="edit">
              <Dvr />
            </IconButton> */}
            <Link to={"profile/"+user._id}>
            <Dvr />
            </Link>
          </div>
        )

        if (user['name'] === undefined) {
          user['name'] = "Abc"
        }
        return user
      })
      console.log(data)
  		this.setState({users: data})
  	})
  }
  render(){
    const {users} = this.state
    if (this.state.redirect) {
      let url = "/users/" + this.state.redirect
      return <Redirect to={url} />
    }
    return (
      <GridContainer>
        <ItemGrid xs={12}>
          <IconCard
            icon={Assignment}
            title="React Table"
            content={
              <ReactTable
                data={users}
                filterable
                columns={[
                  {
                    Header: "Name",
                    accessor: "name",
                  },
                  {
                    Header: "Email",
                    accessor: "email"
                  },
                  {
                    Header: "Phone Number",
                    accessor: "phoneNumber"
                  },
                  {
                    Header: "Last Access",
                    accessor: "lastAccess"
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

export default ReactTables;



// WEBPACK FOOTER //
// ./src/views/Tables/ReactTables.jsx