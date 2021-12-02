import { Fragment } from "react";
import classes from "./HighlightedQuote.module.css";

const HighlightedQuote = (props) => {
  return (
    <Fragment>
      <figure className={classes.quote}>
        <p>{props.text}</p>
        <figcaption>{props.author}</figcaption>
      </figure>
    </Fragment>
  );
};

export default HighlightedQuote;
