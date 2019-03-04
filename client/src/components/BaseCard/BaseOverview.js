import React, { Component } from "react";
import BaseCardContainer from "../../containers/BaseCardContainer";

class BaseOverview extends Component {
  render() {
    return (
      <div>
        <div className="baseCardOverviewHeader"> <h2> Baser </h2></div>
        <BaseCardContainer />
      </div>
    );
  }
}

export default BaseOverview;
