import React, { useState } from "react";
import { Row, Col, Layout } from "antd";

const { Header, Content } = Layout;

type Props = {
  images: string[];
};

const ImageGallery: React.FC<Props> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <Row gutter={[16, 16]}>
      <Col span={6}>
        {images.map((image, index) => (
          <div
            key={index}
            style={{ cursor: "pointer" }}
            onClick={() => handleThumbnailClick(index)}
          >
            <img
              style={{
                width: "100%",
                height: "80px",
                objectFit: "cover",
                opacity: activeIndex === index ? 1 : 0.6,
              }}
              src={image}
            />
          </div>
        ))}
      </Col>
      <Col span={18}>
        <img
          style={{
            width: "100%",
            height: "500px",
            objectFit: "cover",
          }}
          src={images[activeIndex]}
        />
      </Col>
    </Row>
  );
};

export default ImageGallery;
