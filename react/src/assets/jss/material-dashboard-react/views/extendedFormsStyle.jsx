// ##############################
// // // ExtendedForms view styles
// #############################

import customSelectStyle from "./customSelectStyle.jsx";
import customCheckboxRadioSwitch from "./customCheckboxRadioSwitch.jsx";

const extendedFormsStyle = {
  label: {
    cursor: "pointer",
    paddingLeft: "0",
    color: "rgba(0, 0, 0, 0.26)",
    fontSize: "14px",
    lineHeight: "1.428571429",
    fontWeight: "400",
    display: "inline-flex"
  },
  ...customCheckboxRadioSwitch,
  ...customSelectStyle
};

export default extendedFormsStyle;



// WEBPACK FOOTER //
// ./src/assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx