import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";
import { AddPropertyModalProps } from "../models/AddPropertyModalProps";

const AddPropertyModal: React.FC<AddPropertyModalProps> = ({
  visible,
  onCancel,
  onAddProperty,
  onEditProperty,
  propertyToEdit,
  modalMode,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (modalMode === "edit") {
      form.setFieldsValue(propertyToEdit);
    } else {
      form.resetFields();
    }
  }, [visible, modalMode]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      setLoading(true);
      if (modalMode === "edit") {
        if (propertyToEdit && propertyToEdit.guid) {
          onEditProperty(propertyToEdit?.guid, values);
        }
      } else {
        onAddProperty(values);
      }
      setLoading(false);
      form.resetFields();
    });
  };

  return (
    <Modal
      open={visible}
      title={propertyToEdit ? "Edit Property" : "Add Property"}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleSubmit}
        >
          {modalMode === "edit" ? "Update" : "Add"}
        </Button>,
      ]}
    >
      <Form form={form}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter a title" }]}
        >
          <Input placeholder="Enter a title for the property" />
        </Form.Item>
        <Form.Item
          name="about"
          label="About"
          rules={[{ required: true, message: "Please enter some information" }]}
        >
          <Input.TextArea placeholder="Enter some information about the property" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <Input.TextArea placeholder="Enter a description for the property" />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please enter a price" }]}
        >
          <Input type="number" placeholder="Enter a price for the property" />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: "Please enter an address" }]}
        >
          <Input placeholder="Enter an address for the property" />
        </Form.Item>
        <Form.Item
          name="pictures"
          label="Pictures"
          rules={[
            { required: true, message: "Please enter at least one picture" },
          ]}
        >
          <Input.TextArea placeholder="Enter URLs of pictures separated by commas" />
        </Form.Item>
        <Form.Item
          name="amenities"
          label="Amenities"
          rules={[
            { required: true, message: "Please enter at least one amenity" },
          ]}
        >
          <Input.TextArea placeholder="Enter amenities separated by commas" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPropertyModal;
