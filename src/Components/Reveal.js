import React, { Component } from "react";
import cx from "classnames";
export default class Reveal extends Component {
render() {
  let customStyle = {};

if (this.props.customWidth) {
customStyle = {
width: this.props.customWidth
};
}

if (this.props.customStyle) {
Object.assign(customStyle, this.props.customStyle);
}

return (
<div className={"w3-modal  " + this.props.openCls}>
<div className={cx("w3-modal-content", (this.props.customClass)? this.props.customClass : "")}
style={customStyle}>
{this.props.children}
</div>
</div>
);
}
}