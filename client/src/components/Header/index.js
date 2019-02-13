import React from "react";
import KS_logo from "./KS_logo.png";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Reply from "./Reply.png";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  position: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#FCE5E9",
    width: "100vw"
  },

  logo1: {
    width: "3rem",
    height: "3rem"
  },
  grow: {
    color: "#A11010",
    fontSize: "2rem",
    fontWeight: "bold"
  },

  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  logo3: {
    width: "2rem",
    height: "2rem"
  },
  button: {
    color: "#A11010",
    borderColor: "#A11010",
    fontWeight: "bold",
    fontSize: "0.5rem",
    position: "absolute",
    top: "10px",
    left: "200px",
    padding: "0rem"
  }
};
const Header = ({ classes, location }) => {
  const { pathname } = location;
  return (
    <div className={classes.position}>
      <Toolbar>
        {!pathname === "/cars" && (
          <div>
            <img className={classes.logo3} alt="logo" src={Reply} />
          </div>
        )}
        <div className={classes.container}>
          <div>
            <img className={classes.logo1} alt="logo" src={KS_logo} />
          </div>
          <Typography variant="h2" className={classes.grow}>
            KamSafer
          </Typography>
        </div>
        <Button variant="outlined" className={classes.button}>
          Log out
        </Button>
      </Toolbar>
    </div>
  );
};
export default withStyles(styles)(Header);
