import React from "react";
import PropTypes from "prop-types";

function Container({
  children,
  className = "",
  padding = "p-4",
  margin = "m-0",
  flex = true,
}) {
  return (
    <div
      className={`h-screen ${
        flex ? "flex items-center justify-center" : ""
      } ${padding} ${margin} ${className}`}
      style={{ width: "98.9vw" }}
    >
      {children}
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  padding: PropTypes.string,
  margin: PropTypes.string,
  flex: PropTypes.bool,
};

export default Container;
