import {BrowserRouter, Route} from "react-router-dom";
import {Table} from "./Table";
import {UserList as Users} from "./UserList";
import HeaderComponent from "./Header";
import {Map} from "./Map";

function App() {
  return (
    <>
      <BrowserRouter>
        <Route path={"/"} component={HeaderComponent} />

        <Route exact path={"/"} component={() => <Table />} />
        <Route exact path={"/users"} component={() => <Users />} />
        <Route exact path={"/map"} component={() => <Map />} />
      </BrowserRouter>
    </>
  );
}

export default App;
