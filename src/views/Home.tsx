import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Carousel, Card, Row, Col, Button } from "antd";
import { useProperties } from "../utiles/useProperties";
import FilterModal from "./FilterModal";
import AddPropertyModal from "./AddPropertyModal";
import { useCurrentUser } from "../utiles/useUserStore";
import { Property, ValueProperty } from "../models/Property";

const { Content } = Layout;

const Home: React.FC = () => {
  const [filterVisible, setFilterVisible] = useState<boolean>(false);
  const propertiesData = useProperties();
  const [properties, setProperties] = useState<Property[]>(propertiesData);
  const [addPropertyVisible, setAddPropertyVisible] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<string>("");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  const handlePropertyClick = (property: Property): void => {
    navigate(`/properties/${property.guid}`);
  };

  function handleFilterChange({ priceRange, selectedAmenities }: any) {
    const filteredProperties = propertiesData.filter((property) => {
      const priceInRange =
        property.price >= priceRange[0] && property.price <= priceRange[1];
      const amenitiesSelected = selectedAmenities.every((amenity: string) =>
        property.amenities.includes(amenity)
      );
      return priceInRange && amenitiesSelected;
    });
    setProperties(filteredProperties);
  }

  const handleAddProperty = (values: ValueProperty): void => {
    const imgs = values?.pictures.split(",");
    const newProperty = {
      _id: String(properties.length + 1),
      guid: Math.random().toString(36).substr(2, 9),
      title: values.title,
      about: values.about,
      description: values.description,
      address: values.address,
      price: values.price,
      amenities: values.amenities,
      pictures: imgs,
      owner: {
        name: currentUser?.username || "Admin",
      },
      comments: [],
      status: "active",
    };
    setProperties([...properties, newProperty]);
    setAddPropertyVisible(false);
  };

  const handleEditProperty = (guid: string, values: Property): void => {
    const propertyToEdit = properties.find(
      (property) => property.guid === guid
    );
    if (propertyToEdit) {
      const updatedProperty = { ...propertyToEdit, ...values };
      const updatedProperties = properties.map((property: Property) =>
        property.guid === guid ? updatedProperty : property
      );
      setProperties(updatedProperties);
    }
  };

  const handleDelete = (guid: string): void => {
    const updatedList = properties.filter((property) => property.guid !== guid);
    setProperties(updatedList);
  };

  return (
    <Content style={{ padding: "0 50px" }}>
      <div className="site-layout-content">
        <h1>Properties</h1>
        <div style={{ margin: "16px", display: "flex" }}>
          <Button onClick={() => setFilterVisible(true)}>Filter</Button>
          {currentUser?.role === "admin" && (
            <Button
              onClick={() => {
                setModalMode("add");
                setAddPropertyVisible(true);
              }}
            >
              Add Property
            </Button>
          )}
        </div>
        <Row gutter={[16, 16]}>
          {properties?.map((property: Property, index: number) => (
            <Col xs={24} sm={12} md={6} key={property?._id}>
              <Card
                title={property.about}
                cover={
                  <Carousel dots={true}>
                    {property?.pictures?.map((image) => (
                      <div key={index}>
                        <img src={image} />
                      </div>
                    ))}
                  </Carousel>
                }
                actions={[
                  <Button
                    onClick={() => handlePropertyClick(property)}
                    type="primary"
                    key="details"
                  >
                    Details
                  </Button>,
                  currentUser?.role === "admin" && (
                    <Button
                      onClick={() => {
                        setModalMode("edit");
                        setAddPropertyVisible(true);
                        setSelectedProperty(property);
                      }}
                      type="dashed"
                      key="edit"
                    >
                      Edit
                    </Button>
                  ),
                  currentUser?.role === "admin" && (
                    <Button
                      onClick={() => handleDelete(property.guid)}
                      type="default"
                      key="delete"
                    >
                      Delete
                    </Button>
                  ),
                ]}
              >
                <Card.Meta
                  title={property.title}
                  description={property.description}
                />
              </Card>
            </Col>
          ))}
        </Row>
        <FilterModal
          visible={filterVisible}
          onCancel={() => setFilterVisible(false)}
          onApplyFilter={handleFilterChange}
        />
        <AddPropertyModal
          visible={addPropertyVisible}
          onCancel={() => setAddPropertyVisible(false)}
          onAddProperty={handleAddProperty}
          propertyToEdit={selectedProperty}
          onEditProperty={handleEditProperty}
          modalMode={modalMode}
        />
      </div>
    </Content>
  );
};

export default Home;
