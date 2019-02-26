import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import ContentContainer from './ContentContainer';
import EmployeesContentContainer from './EmployeesContentContainer';
import SettingsContentContainer from './SettingsContentContainer';
import StatsContentContainer from './StatsContentContainer';

class DisplayContainer extends Component {

    render(){
        return(
            <div>
                <Route exact path="/" component={ContentContainer} />
                <Route exact path="/employees" component={EmployeesContentContainer} />
                <Route exact path="/stats" component={StatsContentContainer} />
                <Route exact path="/settings" component={SettingsContentContainer}/>
            </div>
        )
    }

}

export default DisplayContainer;