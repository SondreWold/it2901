import React, { Component } from "react";
import { connect } from "react-redux";
import { getBases } from "../actions/contentActions/contentBaseActions";
import { editBaseSettings } from "../actions/settingsActions/editBaseSettings"

import BaseCard from "../components/BaseCard/BaseCard";
import SettingsForm from "../components/Settings/SettingsForm"

import Colors from "../constants/Colors.js"
import "../components/Settings/Settings.css";

class SettingsContentContainer extends Component {
	componentDidMount(){
		this.props.getBases();
	}

  render() {
    return (
      <div class="settingsCardHolder">
    	 	{this.props.bases.map(base => 
    	 		<BaseCard title={base.name} color={Colors.paletteColors.primary}>
	    	 		<SettingsForm
	    	 			id={base.id}
	    	 			name={base.name}
	    	 			total_children={base.total_children}
	    	 			ratio={base.ratio}
	    	 			editBaseSettings={this.props.editBaseSettings}
	    	 		/>
    	 		</BaseCard>
    	 	)}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBases: () => dispatch(getBases())
    editBaseSettings: (name, total_children, ratio) => 
    	dispatch(editBaseSettings(name, total_children, ratio))
  };
};

const mapStateToProps = state => ({
  bases: state.contentBase.bases
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsContentContainer);