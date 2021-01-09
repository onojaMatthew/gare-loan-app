import EmailVerified from './onboarding/EmailVerified';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Loan from './loan/Loan';
import Register from './onboarding/Register';
import Prepage from './onboarding/Prepage';

const styles = {
  home: {
    textAlign: "center",
    marginTop: "20%",
    fontSize: "50px"
  }
}

function App() {
  return (
    <div>
       <BrowserRouter>
        <Switch>
          <Route exact path="/" render={(props) => <div style={styles.home}>
            <h3>hello React App</h3>
          </div>} />
          <Route exact path="/verify_email/:token" render={(props) => <EmailVerified {...props} />} />
          <Route exact path="/verified" render={(props) => <div>
            <h1>Your email has been verified successfully</h1>
          </div>} />
          <Route exact path="/gare_bookings/loan" render={(props) => <Prepage {...props} />} />
          <Route exact path="/gare_bookings" render={(props) => <Loan />} />
          <Route exact path="/register" render={(props) => <Register />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
