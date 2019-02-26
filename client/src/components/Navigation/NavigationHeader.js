import React, {Component} from 'react'
import { connect } from "react-redux";
import './Navigation.css';


class NavigationHeader extends Component {

    render() {
        return (
            <div className="NavigationHeader"> {this.props.name} </div>
        )
    }
}

const mapStateToProps = state => ({
    name: state.PageNameHeader.name
  });


  export default connect(
    mapStateToProps,
  )(NavigationHeader);