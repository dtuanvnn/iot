import React, { PropTypes, Component } from 'react';
import { Grid } from "material-ui";
import { RegularCard, Table, ItemGrid } from "components";
import { API } from 'util/apiCaller'

class Lists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
  	API('api/user').then(res => {
  		var data = res.map(user => Object.keys(user).map(function(key) {
        return user[key]
      }))
      var users = data.map(val => val.shift())
  		this.setState({users: data})
  	})
  }
  
  render() {
  	const {users} = this.state
    return (
    	<div>
    <Grid>
	    <ItemGrid xs={12} sm={12} md={12}>
        <RegularCard
          cardTitle="Simple Table"
          cardSubtitle="Here is a subtitle for this table"
          content={
            <Table
              tableHeaderColor="primary"
              tableHead={["Name", "Email", "Phone Number", "Last Access"]}
              tableData={users}
            />
          }
        />
      </ItemGrid>
    </Grid>
    </div>
    )
	}
}

export default Lists;