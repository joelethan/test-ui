import React from "react";
import PropTypes, { any } from "prop-types";

function Fieldset({ title, children, ...props }) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <fieldset {...props}>
      <legend>{title}</legend>
      {children}
    </fieldset>
  );
}
Fieldset.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([any]).isRequired,
};
export default Fieldset;
