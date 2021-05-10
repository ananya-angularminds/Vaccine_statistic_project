import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Home from "./component/Home";
import NeewEntry from "./component/NewEntry";
import MainComponent from "./MainComponent";

function App() {
  return (
    <div className="App">
      <MainComponent>
        <BrowserRouter>
          <Route exact path="/" component={Home} />
          <Route path="/createuser" component={NeewEntry} />
        </BrowserRouter>
      </MainComponent>
    </div>
  );
}

export default App;
