import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import grey from "@material-ui/core/colors/grey";
import Button from "@material-ui/core/Button";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#A11010",
      dark: "red"
    },
    typography: {
      useNextVariants: true
    }
  }
});

const styles = theme => ({
  root: {
    flexGrow: 1,
    color: green[600],
    "&$checked": {
      color: green[500]
    },
    margin: 10
  },
  formControl: {
    margin: theme.spacing.unit * 3,
    direction: "row"
  },
  group: {
    margin: `${theme.spacing.unit}px `,
    flexDirection: "row"
  },
  startEnd: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: "10px"
  },

  Purpose: {
    float: "left",
    direction: "row"
  },
  margin: {
    margin: theme.spacing.unit
  },
  narrow: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 100
  },
  normal: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  Addbtn: {
    backgroundColor: red[900],
    margin: "50px",
    color: grey[50],
    width: 150,
    height: 40,
    fontSize: 20
  }
});

class RadioButtonsGroup extends React.Component {
  state = {
    value: "personal"
  };
  componentDidMount() {
    this.props.getlastkm();
  }
  submit = () => {
    const { history } = this.props;
    history.push("/confirm");
  };
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <div className={classes.root}>
            <FormControl
              flexDirection="row"
              component="fieldset"
              className={classes.formControl}
              onSubmit={this.props.submit}
            >
              <FormLabel component="legend" className="Purpose">
                Purpose
              </FormLabel>
              <RadioGroup
                aria-label="Purpose"
                name="purpose"
                className={classes.group}
                value={this.props.purpose}
                onChange={this.props.handleChange("purpose")}
              >
                <FormControlLabel
                  value="Business"
                  control={<Radio color="primary" />}
                  label="Business"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="Personal"
                  control={<Radio color="primary" />}
                  label="Personal"
                  labelPlacement="start"
                />
              </RadioGroup>
              <div className={classes.startEnd}>
                <TextField
                  disabled
                  className={classes.norrow}
                  id="text1"
                  type="text"
                  name="start_km"
                  margin="normal"
                  color="secondary"
                  label="Start KM"
                  value={this.props.start_km ? this.props.start_km : 0}
                  onChange={this.props.handleChange("start_km")}
                />

                <TextField
                  className={classes.narrow}
                  id="text2"
                  inputProps={{ step: "0.01" }}
                  pattern="[0-9]*"
                  type="tel"
                  inputMode="numeric"
                  name="end_km"
                  label="End Km"
                  margin="normal"
                  value={this.props.end_km}
                  onChange={this.props.handleChange("end_km")}
                />
              </div>
              <TextField
                disabled
                className={classes.normal}
                id="text3"
                name="total"
                type="text"
                label="Total"
                value={
                  this.props.end_km > this.props.start_km
                    ? this.props.end_km - this.props.start_km
                    : 0
                }
                onChange={this.props.handleChange("total")}
              />
              <TextField
                className={classes.normal}
                id="text4"
                type="text"
                label="Driver"
                name="driver_name"
                value={
                  this.props.driver_name === null ? "" : this.props.driver_name
                }
                onChange={this.props.handleChange("driver_name")}
              />
              <TextField
                className={classes.normal}
                id="text5"
                type="text"
                label="Note"
                name="note"
                value={this.props.note}
                onChange={this.props.handleChange("note")}
              />
              {this.state.failed && <span>Data incorrect</span>}
              <Button
                onClick={this.submit}
                variant="raised"
                type="submit"
                className={classes.Addbtn}
              >
                Add
              </Button>
            </FormControl>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
RadioButtonsGroup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RadioButtonsGroup);
