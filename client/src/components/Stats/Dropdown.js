import React from "react";
import Select from "react-select";
import "./graph.css";

let options = [
  { value: "7", label: "Siste 7 dager" },
  { value: "30", label: "Siste 30 dager" }
];

class Dropdown extends React.Component {
  handleChange = selectedOption => {
    this.props.changeSelected(selectedOption);

    if (selectedOption.value === "7") {
      this.props.calculateGraphData("week");
    }
    if (selectedOption.value === "30") {
      this.props.calculateGraphData("month");
    }
  };

  render() {
    return (
      <div className="dropdown">
        <Select
          value={this.props.selected}
          onChange={this.handleChange}
          options={options}
          isSearchable={false}
          isMulti={false}
        />
      </div>
    );
  }
}

export default Dropdown;
