import './App.css';
import {BrowserRouter, Route} from "react-router-dom";

import {Table} from "./Table";

function App() {

  return (
    <BrowserRouter>
      <Route exact path={'/'} component={Table} />
    </BrowserRouter>
  );
}

export default App;
