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
          <Route path="/">
            <ItemList />
          </Route>
          <Route path="/ItemList">
            <ItemList />
          </Route>
          <Route path="/ItemList/Detail/:id">
            <ItemDetail />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
