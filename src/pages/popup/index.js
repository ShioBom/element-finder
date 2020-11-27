/* globals chrome */

import React, { useState } from "react";
import { Button, Col, Row, Input, Form } from "antd";
import { toggle, close } from "@/common";
import styles from "./index.less";

function Popup() {
  const [val, setval] = useState("https://www.baidu.com/");

  const open = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
      toggle(tab[0]);
    });
  };
  const onClose = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
      close(tab[0]);
    });
  };

  const openWindow = () => {
    chrome.windows.create({ url: val, type: "panel" }, (window) => {});
  };

  const openTab = () => {
    chrome.tabs.create({ url: val }, (tab) => {});
    // chrome.devtools.panels.create("自定义tab", "", "panel.html", () => {});
  };
  return (
    <div className={styles.popup}>
      <Button
        style={{ marginRight: 10 }}
        type="primary"
        onClick={() => {
          open();
        }}
      >
        开启抓取
      </Button>
      <Button
        onClick={() => {
          onClose();
        }}
      >
        关闭抓取
      </Button>
      <Form>
        <Form.Item label="地址">
          <Input
            value={val}
            onChange={(e) => {
              setval(e.target.value);
            }}
          />
        </Form.Item>
      </Form>

      <Row>
        <Col span={12}>
          <Button
            onClick={() => {
              openWindow();
            }}
          >
            新窗口
          </Button>
        </Col>
        <Col span={12}>
          <Button
            onClick={() => {
              openTab();
            }}
          >
            新tab
          </Button>
        </Col>
      </Row>
    </div>
  );
}
export default Popup;
