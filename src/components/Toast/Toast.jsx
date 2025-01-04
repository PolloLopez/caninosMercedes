import React from "react";
import PropTypes from "prop-types";
import "./Toast.css";

const Toast = ({ message, type, onClose }) => {
  return (
    <div className={`toast toast-${type}`} onClick={onClose}>
      <p>{message}</p>
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error", "info"]).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Toast;
