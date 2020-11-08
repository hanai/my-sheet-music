import React, { useEffect, useState } from "react";
import "./App.css";

import { Select, Layout, Form } from "antd";
import "antd/dist/antd.css";

import SheetDisplay from "./components/sheet-display";

const { Header, Footer, Content } = Layout;

function App() {
  const [selectedSheet, setSelectedSheet] = useState<string>();
  const [sheetContent, setSheetContent] = useState<string>();
  const handleSelectSheet = (e) => {
    setSelectedSheet(e);
  };

  const sheets = [
    {
      name: "Ode to Joy",
      url: "sheets/Ode to Joy.musicxml",
    },
  ];

  useEffect(() => {
    if (selectedSheet) {
      fetch(selectedSheet, {})
        .then((res) => res.text())
        .then(setSheetContent);
    }
  }, [selectedSheet]);

  const formItemLayout = {};

  return (
    <div className="App">
      <Header></Header>
      <Content style={{ padding: "0 50px" }}>
        <Form layout="inline" {...formItemLayout}>
          <Form.Item label="曲谱">
            <Select
              style={{ width: 120 }}
              value={selectedSheet}
              onChange={handleSelectSheet}
            >
              {sheets.map((e) => (
                <Select.Option key={e.url} value={e.url}>
                  {e.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
        <SheetDisplay sheetContent={sheetContent} />
      </Content>
      <Footer style={{ textAlign: "center" }}>Hanai ©2020</Footer>
    </div>
  );
}

export default App;
