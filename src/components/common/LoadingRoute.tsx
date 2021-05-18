import React from "react";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    top: 0,
    width: "100vw",
    height: "100%",
    position: "absolute",
    zIndex: 999999,
    backgroundColor: "#FFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  title: {
    fontFamily: "'Fredoka One', cursive",
    WebkitFontSmoothing: "antialiased",
    fontSize: 28,
    marginLeft: 9,
    textAlign: "center",
    color: "#199aff",
    width: "100%",
  },
  animationStart: {
    marginLeft: 3,
  },
}));

interface Props {
  message?: string;
  transparent?: boolean;
  fullScreen?: boolean;
}

const LoadingRoute = ({
  message = "Loading",
  transparent,
  fullScreen,
}: Props) => {
  const classes = useStyles();
  const routeStyle = Object.assign(
    {},
    transparent && { backgroundColor: "#ffffff8a" },
    fullScreen && { height: "100vh" }
  )
  return (
    <div
      style={routeStyle as any}
      className={classes.root}
    >
      <div>
        <Typography className={classes.title + " loading-paragraph"}>
          {message}
          <span className={classes.animationStart}>.</span>
          <span>.</span>
          <span>.</span>
        </Typography>
      </div>
    </div>
  );
};

export default LoadingRoute;
