import React from "react";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button'

export default function Home() {
  return (
    <div>
      <h1>Welcome to Africa's Top Market Place</h1>

      {/* <Link to= "/Login">
      <Button size = "larger" variant="contained">Login</Button>
      </Link> */}
      <Button to= "/Login" component={Link} size = "large" variant="contained">Login</Button>

      {/* <Link to = "/Signup">
      <Button variant="contained">Signup</Button>
      </Link> */}
      <Button to= "/Signup" component={Link} size = "large" variant="contained">Signup</Button>
    </div>
  );
}
