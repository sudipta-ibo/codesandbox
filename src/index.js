import React, { useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Table, Badge, Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

const menu = (
  <Menu>
    <Menu.Item>Action 1</Menu.Item>
    <Menu.Item>Action 2</Menu.Item>
  </Menu>
);

function NestedTable() {
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const expandedRowRender = () => {
    const columns = [
      { title: "Date", dataIndex: "date", key: "date" },
      { title: "Name", dataIndex: "name", key: "name" },
      {
        title: "Status",
        key: "state",
        render: () => (
          <span>
            <Badge status="success" />
            Finished
          </span>
        )
      },
      { title: "Upgrade Status", dataIndex: "upgradeNum", key: "upgradeNum" },
      {
        title: "Action",
        dataIndex: "operation",
        key: "operation",
        render: () => (
          <span className="table-operation">
            <a>Pause</a>
            <a>Stop</a>
            <Dropdown overlay={menu}>
              <a>
                More <DownOutlined />
              </a>
            </Dropdown>
          </span>
        )
      }
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        date: "2014-12-24 23:12:00",
        name: "This is production name",
        upgradeNum: "Upgraded: 56"
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };
  const onExpand2 = async (record) => {
    console.log("pubished clicked");
    console.log(record.key);
    let keys = [];
    keys.push(record.key);
    console.log("expandedRowKeys ", expandedRowKeys);
    setExpandedRowKeys(keys);
    setLoading(true);
    console.log("loading ", loading);
    console.log("keys ", keys);
    console.log("expandedRowKeys ", expandedRowKeys);
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Platform", dataIndex: "platform", key: "platform" },
    { title: "Version", dataIndex: "version", key: "version" },
    { title: "Upgraded", dataIndex: "upgradeNum", key: "upgradeNum" },
    { title: "Creator", dataIndex: "creator", key: "creator" },
    { title: "Date", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "Action",
      key: "operation",
      render: (_, record) => <a onClick={() => onExpand2(record)}>Publish</a>
    }
  ];

  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i.toString(),
      name: "Screem",
      platform: "iOS",
      version: "10.3.4.5654",
      upgradeNum: 500,
      creator: "Jack",
      createdAt: "2014-12-24 23:12:00"
    });
  }
  const onExpand = async (expanded, record) => {};
  const expandable = {
    onExpand: onExpand,
    expandedRowRender: expandedRowRender,
    expandedRowKeys: expandedRowKeys
  };

  return (
    <Table
      scroll={{ x: 1300 }}
      className="components-table-demo-nested"
      columns={columns}
      expandable={expandable}
      dataSource={data}
    />
  );
}

ReactDOM.render(<NestedTable />, document.getElementById("container"));
