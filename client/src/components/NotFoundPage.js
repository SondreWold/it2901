import React, { Component } from "react";
import { Link } from "react-router-dom";

class NotFoundPage extends Component {
  render() {
    return (
      <div>
        <p>Gratulerer, du har oppdaget en feil! Bra jobba!</p>
        <center>
          <Link to="/">Gå tilbake til forsiden.</Link>
        </center>
      </div>
    );
  }
}

export default NotFoundPage;
