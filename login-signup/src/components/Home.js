import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";

export default function Home() {
  return (
    <div>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="flex-end"
        style = {{height: '400px'}}
      >
        <Grid
          container
          spacing={3}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <h1>Welcome to Africa's Top Market Place</h1>
        </Grid>
        <Grid>
          <Button to="/Login" component={Link} size="large" variant="contained">
            Login
          </Button>
        </Grid>
        <Grid>
          <Button
            to="/Signup"
            component={Link}
            size="large"
            variant="contained"
          >
            Signup
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
