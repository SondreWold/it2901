import React from "react";
import Select from "react-select";
import "./graph.css";

let options = [
  { value: "7", label: "Siste 7 dager" },
  { value: "30", label: "Siste 30 dager" },
  { value: "365", label: "Siste 365 dager" }
];

class Dropdown extends React.Component {
  handleChange = selectedOption => {
    this.props.changeSelected(selectedOption);
  };

  render() {
    return (
      <div className="dropdown">
        <Select
          value={this.props.selected}
          onChange={this.handleChange}
          options={options}
        />
      </div>
    );
  }
}

export default Dropdown;
