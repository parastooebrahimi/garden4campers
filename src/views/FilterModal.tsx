import React, { useState } from "react";
import { Modal, Button, Slider, Checkbox } from "antd";
import { FILTER_OPTION, FILTER_VALUES } from "../constants/filter";
import { FilterModalProps } from "../models/FilterModalProps";
import { CheckboxValueType } from "antd/es/checkbox/Group";

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onCancel,
  onApplyFilter,
}) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 9000]);
  const [amenities, setAmenities] = useState<string[]>([]);

  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value);
  };

  const handleAmenitiesChange = (checkedValues: CheckboxValueType[]) => {
    setAmenities(checkedValues as string[]);
  };

  const handleApplyClick = () => {
    const filters = {
      priceRange: priceRange,
      selectedAmenities: amenities,
    };
    if (priceRange && priceRange.length === 2) {
      onApplyFilter(filters);
    }
  };

  return (
    <Modal
      width={600}
      open={visible}
      title="Filter Properties"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="apply" type="primary" onClick={handleApplyClick}>
          Apply
        </Button>,
      ]}
    >
      <div>
        <h4>Price Range:</h4>
        <Slider
          range
          min={0}
          max={1000}
          onChange={handlePriceChange}
          tipFormatter={(value) => `$${value}`}
        />
      </div>
      <div>
        <h4>Amenities:</h4>
        <Checkbox.Group onChange={handleAmenitiesChange} style={{ margin: 10 }}>
          <Checkbox value={FILTER_VALUES.WIFI}>{FILTER_OPTION.WIFI}</Checkbox>
          <Checkbox value={FILTER_VALUES.PARKING}>
            {FILTER_OPTION.PARKING}
          </Checkbox>
          <Checkbox value={FILTER_VALUES.POOL}>{FILTER_OPTION.POOL}</Checkbox>
          <Checkbox value={FILTER_VALUES.GYM}>{FILTER_OPTION.GYM}</Checkbox>
        </Checkbox.Group>
      </div>
    </Modal>
  );
};

export default FilterModal;
