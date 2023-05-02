import { Property, ValueProperty } from "./Property";

export type AddPropertyModalProps = {
  visible: boolean;
  onCancel: () => void;
  onAddProperty: (property: ValueProperty) => void;
  onEditProperty: (guid: string, property: Property) => void;
  propertyToEdit?: Property | null | undefined;
  modalMode: string;
};
