import { useStore } from "../store/store";

export const useProperties = () => {
  return useStore((state) => state.properties);
};
