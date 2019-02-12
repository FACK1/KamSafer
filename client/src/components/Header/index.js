import React from "react";
import KS_logo from "./KS_logo.png";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Logout from "./Logout.png";
import Reply from "./Reply.png";
import { withStyles } from "@material-ui/core/styles";

const styles =
{
  position:
  {
    display:"flex",
    justifyContent:"center",
    backgroundColor:"#FCE5E9",
    width:"100vw",
  },

  logo1:
  {
    width:"3rem",
    height:"3rem",
  },
  grow:
  {
    color:"#A11010",
    fontSize:"2rem",
    fontWeight:"bold"
  },

  container:
  {
    display: "flex",
    flexDirection:"column",
    alignItems: "center"
  },

  logo3:
  {
    width:"2rem",
    height:"2rem",
  },
  logo2:
  {

  alignSelf:"flex-end",
    width:"2.5rem",
    height:"2.5rem",
  }

};
const Header = ({classes,location}) => {
  const {pathname}=location
  return (
    <div className={classes.position}>

       <Toolbar >
        {!pathname==="/cars" &&  <div>
         <img  className={classes.logo3} alt="logo" src={Reply}/>
       </div>}
       <div className={classes.container}>
        <div>
          <img  className={classes.logo1} alt="logo" src={KS_logo}/>
        </div>
        <Typography  variant="h2"  className={classes.grow}>
          KamSafer
        </Typography >
        </div>
        <div>
          <img  className={classes.logo2} alt="logo" src={Logout}/>
        </div>

         </Toolbar>

     </div>
  );
};
export default withStyles(styles)(Header);
