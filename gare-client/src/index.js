import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import EmailVerified from './components/onboarding/EmailVerified';

const styles = {
  home: {
    textAlign: "center",
    marginTop: "20%",
    fontSize: "50px"
  }
}
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={(props) => <div style={styles.home}>
          <h3>hello React App</h3>
        </div>} />
        <Route exact path="/verify_email/:token" render={(props) => <EmailVerified {...props} />} />
        <Route exact path="/verified" render={(props) => <div>
          <h1>Your email has been verified successfully</h1>
        </div>} />
      </Switch>
    </BrowserRouter>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
