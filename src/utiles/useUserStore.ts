import { useStore, StorePropsType, User } from "../store/store";

export const useUsers = () => {
  return useStore((state: StorePropsType) => state.users);
};

export const useCurrentUser = () => {
  return useStore((state: StorePropsType) => state.currentUser);
};

export const useIsLoading = () => {
  return useStore((state: StorePropsType) => state.loading);
};

export const useError = () => {
  return useStore((state: StorePropsType) => state.error);
};

export const useSetUsers = (): ((users: User[]) => void) => {
  return useStore((state: StorePropsType) => state.setUsers);
};

export const useSetCurrentUser = (): ((currentUser: User | null) => void) => {
  return useStore((state: StorePropsType) => state.setCurrentUser);
};

export const useSetLoading = (): ((loading: boolean) => void) => {
  return useStore((state: StorePropsType) => state.setLoading);
};

export const useSetError = (): ((error: string | null) => void) => {
  return useStore((state: StorePropsType) => state.setError);
};

export const useLogin = (): ((
  username: string,
  password: string,
  role: "user" | "admin"
) => void) => {
  return useStore((state: StorePropsType) => state.login);
};

export const useLogout = (): (() => void) => {
  return useStore((state: StorePropsType) => state.logout);
};
