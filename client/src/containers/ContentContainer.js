import React from "react";
import { connect } from "react-redux";
import { getBases } from "../actions/contentActions";

class contentContainer extends React.Component {
  componentDidMount() {
    this.props.getBases();
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBases: url => dispatch(getBases())
  };
};

const mapStateToProps = state => ({
  bases: state.content.bases,
  loading: state.content.loading,
  error: state.content.error
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(contentContainer);
