import React, { useState } from "react";

import { Button, Form, Select, Input } from "antd";
import { Sheet } from "../../types";

import "./style.scss";

const URL_REG = /^(https?:)?\/\//;

export interface FilterFormProps {
  onChange: (value: { selected?: string }) => any;
  sheetList: Sheet[];
}

const FilterForm = (props: FilterFormProps) => {
  const { onChange, sheetList } = props;

  const [selectedSheet, setSelectedSheet] = useState<string>();

  const [inputValues, setInputValues] = useState<{ [name: string]: string }>({
    searchKeywords: "",
    url: "",
  });

  const handleSelectSheet = (e) => {
    setSelectedSheet(e);
    onChange({
      selected: e,
    });
  };

  const handleClickGoogle = () => {
    const q = encodeURIComponent(inputValues.searchKeywords.trim());
    window.open(
      `https://www.google.com/search?safe=active&q=${q}+musicxml&oq=${q}+musicxml`
    );
  };

  const handleInputChange = (key, event) => {
    setInputValues((e) => ({ ...e, [key]: event.target.value.trim() }));
  };

  const handleClickLoadUrl = () => {
    setSelectedSheet(undefined);
    onChange({
      selected: inputValues.url,
    });
  };

  return (
    <Form layout="inline" className="filter-form">
      <Form.Item label="曲谱">
        <Select
          style={{ width: 200 }}
          value={selectedSheet}
          onChange={handleSelectSheet}
        >
          {sheetList.map((e) => (
            <Select.Option key={e.url} value={e.url}>
              {e.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Google">
        <Input
          value={inputValues.searchKeywords}
          style={{ width: 200 }}
          onChange={handleInputChange.bind(null, "searchKeywords")}
        />
        <Button
          className="google-search-btn"
          onClick={handleClickGoogle}
          disabled={inputValues.searchKeywords.length === 0}
        >
          搜索
        </Button>
      </Form.Item>
      <Form.Item label="URL">
        <Input
          value={inputValues.url}
          style={{ width: 200 }}
          onChange={handleInputChange.bind(null, "url")}
        />
        <Button
          className="google-search-btn"
          onClick={handleClickLoadUrl}
          disabled={!URL_REG.test(inputValues.url)}
        >
          加载
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FilterForm;
