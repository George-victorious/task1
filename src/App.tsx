import {BrowserRouter, Route} from "react-router-dom";
import {Table} from "./Table";
import {UserList as Users} from "./UserList";
import HeaderComponent from "./Header";

function App() {
  return (
    <>
      <BrowserRouter>
        <Route path={"/"} component={HeaderComponent} />

        <Route exact path={"/"} component={Table} />
        <Route exact path={"/users"} component={Users} />
      </BrowserRouter>
    </>
  );
}

export default App;
