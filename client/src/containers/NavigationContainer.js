import React from "react";
import { connect } from "react-redux";
import NavBar from "../components/Navigation/NavBar";
import NavigationHeader from "../components/Navigation/NavigationHeader";
import { getName } from "../actions/navigationAction";
import "../components/Navigation/Navigation.css";

class NavigationContainer extends React.Component {
  componentDidMount() {
    this.props.getName();
  }

  render() {
    return (
      <div className="NavgationContainer">
        <NavigationHeader pageHeader={this.props.pageHeader} />
        <NavBar />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getName: () => dispatch(getName())
  };
};

const mapStateToProps = state => ({
  pageHeader: state.pageNameHeader.name
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationContainer);
