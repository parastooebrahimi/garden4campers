export type FilterModalProps = {
  visible: boolean;
  onCancel: () => void;
  onApplyFilter: (filters: {
    priceRange: number[];
    selectedAmenities: string[];
  }) => void;
};
