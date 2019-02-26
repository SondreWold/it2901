import React, { Component } from "react";
import BaseCardHolderContainer from "../containers/BaseCardContainer";

class BaseOverview extends Component {
  render() {
    return (
      <div>
        <div style={baser}>BASER</div>
        <BaseCardHolderContainer />
      </div>
    );
  }
}

export default BaseOverview;

const baser = {
  textAlign: "center",
  marginTop: "50px"
};
