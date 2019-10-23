import React from "react";
import KS_logo from "./KS_logo.png";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Reply from "./reply.png";
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
    fontSize: "0.9rem",
    fontWeight: "bold"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  logo3: {
    width: "2rem",
    height: "2rem",
    position: "absolute",
    top: "0.1rem",
    right: "11rem",
    padding: "0.2rem"
  },
  button: {
    color: "#A11010",
    borderColor: "#A11010",
    fontWeight: "bold",
    fontSize: "0.6rem",
    position: "absolute",
    top: "0.5rem",
    left: "9rem",
    padding: "0.2rem",
    width: "4rem"
  }
};
const Header = ({ classes, location, history, logout }) => {
  const { pathname } = location;
  if (pathname !== "/login") {
    return (
      <div className={classes.position}>
        <Toolbar>
          {pathname !== "/cars" && (
            <div>
              <img
                className={classes.logo3}
                alt="logo"
                src={Reply}
                onClick={() => {
                  history.go(-1);
                  return false;
                }}
              />
            </div>
          )}
          <div className={classes.container}>
            <div>
              <img
                className={classes.logo1}
                onClick={() => {
                  history.push("cars");
                  return false;
                }}
                alt="logo"
                src={KS_logo}
              />
            </div>
            <Typography variant="h2" className={classes.grow}>
              KamSafer
            </Typography>
          </div>
          <Button
            variant="outlined"
            className={classes.button}
            onClick={() => logout(history)}
          >
            Log out
          </Button>
        </Toolbar>
      </div>
    );
  }
  return null;
};
export default withStyles(styles)(Header);
