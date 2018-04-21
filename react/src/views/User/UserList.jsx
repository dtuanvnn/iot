import React from "react";
import { Grid } from "material-ui";

import { RegularCard, Table, ItemGrid } from "components";
import { Switch, BrowserRouter, Route } from 'react-router-dom'

import Profile from "views/User/Profile"

function UserList({ ...props }) {
	const {
    users
  } = props;
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

export default UserList;