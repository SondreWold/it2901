import React, { Component } from "react";
import { connect } from "react-redux";
import { getBases } from "../actions/contentActions/contentBaseActions";
import { editBaseSettings } from "../actions/settingsActions/editBaseSettingsAction"

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
      <div className="settingsCardHolder">
    	 	{this.props.bases.map(base => 
    	 		<BaseCard title={base.name} color={Colors.paletteColors.primary} key={base.id}>
	    	 		<SettingsForm
	    	 			id={base.id}
	    	 			key={base.id}
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
    getBases: () => dispatch(getBases()),
    editBaseSettings: (id, name, total_children, ratio) => 
    	dispatch(editBaseSettings(id, name, total_children, ratio))
  };
};

const mapStateToProps = state => ({
  bases: state.contentBase.bases
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsContentContainer);