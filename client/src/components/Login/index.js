import React, { Component } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import KS_logo from "./KS_logo.png";
import Mercy from "./Mercy .png";
import { withStyles } from "@material-ui/core/styles";
import { loginHelper } from "../../utils/loginHelper";
import { authentication } from "../../utils/authentication";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#A11010"
    },
    typography: {
      useNextVariants: true
    }
  }
});

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    width: "100px",
    height: "100px",
    backgroundColor: "#FCE5E9"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  KSLogo: {
    width: "70px",
    height: "70px"
  },
  grow: {
    color: "#A11010",
    fontSize: "2rem",
    fontWeight: "bold",
    marginTop:"10px"
  },

  Mercy: {
    width: "180px",
    height: "40px",
    marginTop: "50px",
    marginBottom: "15px"
  }
});

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      failed: false
    };
  }
  componentDidMount() {
    const { history } = this.props;
    authentication()
      .then(result => {
        if (result.auth) {
          history.push("/cars");
        }
      })
      .catch(error => {
        console.log("An error has occurred please try again");
      });

  }


  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    const { history } = this.props;
    const { username, password } = this.state;
    event.preventDefault();
    loginHelper({ username, password })
      .then(result => {
        if (result.logged) {
          history.push("/cars");
        } else {
          this.setState({
            failed: true
          });
        }
      })
      .catch(error => {
        console.log("An error has occurred please try again");
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <img src={KS_logo} className={classes.KSLogo} />
            </Avatar>
            <Typography variant="h2" className={classes.grow}>
              KamSafer
            </Typography>
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input
                  id="username"
                  name="username"
                  required="true"
                  value={this.state.username}
                  onChange={this.handleInputChange}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  name="password"
                  type="Password"
                  required="true"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
              </FormControl>
              <Button
                onClick={this.handleSubmit}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Log in
              </Button>
            </form>
            <img className={classes.Mercy} alt="logo" src={Mercy} />
          </Paper>
        </main>
      </MuiThemeProvider>
  );
  }
}
Login.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Login);
