import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Button.scss";
import { Button } from "../input/Button";
import { useCssBreakpoints } from "react-use-css-breakpoints";



export function Button({ primary, secondary, cta, children, ...rest }) {
  const className = classNames({
    [styles.primaryButton]: primary,
    [styles.secondaryButton]: secondary,
    [styles.ctaButton]: cta
  });

  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
}

Button.propTypes = {
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  cta: PropTypes.bool,
  children: PropTypes.node
};
