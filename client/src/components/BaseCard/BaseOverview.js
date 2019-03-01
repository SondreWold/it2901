import React, { Component } from "react";
import BaseCardContainer from "../../containers/BaseCardContainer";

class BaseOverview extends Component {
  render() {
    return (
      <div>
        <div style={baser}>BASER</div>
        <BaseCardContainer />
      </div>
    );
  }
}

export default BaseOverview;

const baser = {
  textAlign: "center",
  marginTop: "50px"
};
