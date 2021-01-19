// import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import './App.css';
import HomePage from "./components/homePage";
import Login from "./components/login";
import { ThemeProvider } from "@material-ui/core/styles";
import {theme} from "./constants";
import history from "./history";
const initialState = window.__WML_REDUX_INITIAL_STATE__;
const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
const checkAuth = () => {
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");
  const pathName = window.location.pathname;
  if(!pathName.includes("login") && !pathName.includes("registration")){
    if(!username || !password){
      history.push("/login");
    }
  }
}
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Router history={history}>
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/registration" component={Login} />
                <Route path="/" component={HomePage} />
              </Switch>
            </Router>
        </div>
        </ThemeProvider>
    </Provider>

  );
}

export default App;
checkAuth();
