import React from "react";
import { Tooltip } from "antd";

const Comment = ({
  author,
  avatar,
  datetime,
  content,
  key,
}: {
  author: string;
  avatar?: React.ReactNode;
  datetime?: React.ReactNode;
  content: string;
  key: number;
}) => (
  <div
    key={key}
    style={{
      display: "flex",
      alignItems: "center",
      marginBottom: "16px",
      padding: "8px",
    }}
  >
    <div style={{ marginRight: "16px" }}>{avatar}</div>
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h4 style={{ marginRight: "8px", marginBottom: 0 }}>{author}</h4>
        <Tooltip title={datetime}>
          <span style={{ marginBottom: 0 }}>{datetime}</span>
        </Tooltip>
      </div>
      <p style={{ marginTop: "4px", marginBottom: 0 }}>{content}</p>
    </div>
  </div>
);

export default Comment;
