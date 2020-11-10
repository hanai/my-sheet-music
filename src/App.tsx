import React, { useEffect, useState } from "react";
import "./App.css";

import { Layout } from "antd";
import "antd/dist/antd.css";

import SheetDisplay from "./components/sheet-display";
import FilterForm from "./components/filter-form";

const { Header, Footer, Content } = Layout;

function App() {
  const [sheetContent, setSheetContent] = useState<string>();

  const sheetList = [
    {
      name: "Ode to Joy",
      url: "sheets/Ode to Joy.musicxml",
    },
  ];

  const handleFilterChange = (v) => {
    if (v.selected) {
      fetch(v.selected, {})
        .then((res) => res.text())
        .then(setSheetContent);
    }
  };

  return (
    <div className="App">
      <Header></Header>
      <Content style={{ padding: "0 50px" }}>
        <FilterForm onChange={handleFilterChange} sheetList={sheetList} />
        <SheetDisplay sheetContent={sheetContent} />
      </Content>
      <Footer style={{ textAlign: "center" }}>Hanai ©2020</Footer>
    </div>
  );
}

export default App;
