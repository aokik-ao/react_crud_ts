import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { ItemDetail } from "./components/pages/ItemDetail";
import { ItemList } from "./components/pages/ItemList";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {/* <Route path="/">
            <ItemList />
          </Route> */}
          <Route exact path="/react_crud_ts/ItemList">
            <ItemList />
          </Route>
          <Route exact path="/react_crud_ts/ItemList/Detail">
            <ItemDetail />
          </Route>
          <Route path="*">
            <p>404です</p>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
