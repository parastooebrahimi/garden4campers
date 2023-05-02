import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Comment from "../components/Comment";
import { Layout, Row, Col, Rate, Avatar, Button, Input } from "antd";
import { useProperties } from "../utiles/useProperties";
import ImageGallery from "../components/ImageGallery";
import { useCurrentUser } from "../utiles/useUserStore";
import { Comment as CommentModel } from "../models/Comment";
import { monthYearFormat } from "../utiles/datetime";
import { Property } from "../models/Property";

const { Content } = Layout;

const PropertyDetails: React.FC = () => {
  const { guid } = useParams<{ guid: string }>();
  const properties = useProperties();
  const property = properties.find((p: Property) => p.guid === guid);
  const [newComment, setNewComment] = useState<string>("");
  const [comments, setComments] = useState<CommentModel[]>([]);

  useEffect(() => {
    if (property?.comments) {
      setComments([...property.comments]);
    }
  }, [property?.guid]);

  const currentUser = useCurrentUser();

  if (!property) {
    return null;
  }

  return (
    <Content style={{ padding: "50px" }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12}>
          <div style={{ position: "relative" }}>
            <ImageGallery images={property.pictures} />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              marginBottom: "16px",
            }}
          >
            <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>
              {property.about}
            </h2>
            <p style={{ fontSize: "16px" }}>{property.address}</p>
            <p style={{ fontSize: "16px", marginBottom: "24px" }}>
              {property.about}
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <h3 style={{ marginRight: "30px" }}>Owner Information</h3>
                <Avatar size="large" src={""} style={{ marginRight: "16px" }} />
                <div>
                  <h4 style={{ marginBottom: 0 }}>{property.owner.name}</h4>
                  <p style={{ fontSize: "14px" }}>{property.owner.email}</p>
                  <p style={{ fontSize: "14px" }}>{property.owner.phone}</p>
                </div>
              </div>
              <div style={{ marginTop: 10, display: "flex" }}>
                <h3 style={{ marginRight: "16px" }}>Reviews</h3>
                <Rate style={{ marginTop: 15 }} disabled defaultValue={4} />
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>{property.comments && <h2>Comments</h2>}</Row>
      <Row style={{ display: "flex", flexDirection: "column" }}>
        {comments.map((comment: CommentModel, index: number) => (
          <Comment
            key={index}
            author={comment.author}
            avatar={<Avatar src={comment.avatar} />}
            content={comment.text}
            datetime={comment.datetime}
          />
        ))}
      </Row>
      <Row style={{ marginTop: 20 }}>
        <Col xs={24} sm={24} md={12}>
          {currentUser && (
            <div>
              <Input.TextArea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment"
                rows={4}
              />
              <Button
                style={{ margin: 10 }}
                type="primary"
                onClick={() => {
                  const newCommentDetails = {
                    author: currentUser.username,
                    text: newComment,
                    datetime: monthYearFormat(new Date().toLocaleString()),
                  };
                  newComment && setComments([...comments, newCommentDetails]);
                  setNewComment("");
                }}
              >
                Add Comment
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Content>
  );
};

export default PropertyDetails;
