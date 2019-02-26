import React from "react";
import NavBar from '../components/Navigation/NavBar'
import NavigationHeader from '../components/Navigation/NavigationHeader'
import '../components/Navigation/Navigation.css'

/* 
    * Need to get the name of the kindergarten from the db
    * Pass it down to NavigationHeader as props
*/

class NavigationContainer extends React.Component {
 s
  render() {
    return (
        <div className="NavgationContainer">
            <NavigationHeader/>
            <NavBar/>
        </div>
    ) 
  }
}

export default NavigationContainer;