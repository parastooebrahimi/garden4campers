import create from "zustand";
const data = require("../data.json");
const users = require("../user.json");
import { combine, devtools } from "zustand/middleware";

export type User = {
  username: string;
  password: string;
  role: string;
};

export type StorePropsType = {
  setUsers: any;
  setCurrentUser: any;
  setLoading: any;
  setError: any;
  login: any;
  logout: any;
  properties: {
    price: number;
    amenities: string[];
    _id?: string;
    guid: string;
    pictures: string[];
    status?: string;
    owner: {
      name: string;
      age?: number;
      gender?: string;
      phone?: string;
      email?: string;
    };
    address?: string;
    about?: string;
    latitude?: any;
    longitude?: any;
    tags?: string[];
    comments?: {
      id?: number;
      text: string;
      author: string;
      datetime?: string | undefined;
    }[];
  }[];
  comment: string;
  setComment: (comment: string) => void;
  users: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
};

const InitialState: StorePropsType = {
  properties: data,
  users: users,
  currentUser: null,
  loading: false,
  error: null,
  setUsers: undefined,
  setCurrentUser: undefined,
  setLoading: undefined,
  setError: undefined,
  login: undefined,
  logout: undefined,
  comment: "",
  setComment: () => {},
};

export type StoreActionsPropsType = {
  setProperties: (properties: StorePropsType["properties"]) => void;
  setUsers: (users: StorePropsType["users"]) => void;
  setCurrentUser: (currentUser: StorePropsType["currentUser"]) => void;
  setLoading: (loading: StorePropsType["loading"]) => void;
  setError: (error: StorePropsType["error"]) => void;
  login: (username: string, password: string, role: "user" | "admin") => void;
  logout: () => void;
  setComment: (comment: string) => void;
};

const StoreActions = (set: Function, get: Function): StoreActionsPropsType => ({
  setComment: (comment: string) => {
    set({ comment });
  },
  setProperties: (properties: StorePropsType["properties"]) => {
    set({ properties });
  },
  setUsers: (users: StorePropsType["users"]) => {
    set({ users });
  },
  setCurrentUser: (currentUser: StorePropsType["currentUser"]) => {
    set({ currentUser });
  },
  setLoading: (loading: StorePropsType["loading"]) => {
    set({ loading });
  },
  setError: (error: StorePropsType["error"]) => {
    set({ error });
  },
  login: async (username: string, password: string, role: string) => {
    // I do not use that
    set({ loading: true, error: null });
    const userExists = get().users.some(
      (user: { username: string; password: string; role: string }) =>
        user.username === username &&
        user.password === password &&
        user.role === role
    );

    if (userExists) {
      const currentUser = {
        username,
        password,
        role,
      };
      set({ currentUser, loading: false });
    } else {
      set({ error: "Invalid username or password", loading: false });
    }
  },
  logout: async () => {
    set({ currentUser: null });
  },
});

export type useStorePropsType = StorePropsType & StoreActionsPropsType;

export const useStore =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? create<useStorePropsType, [["zustand/devtools", useStorePropsType]]>(
        // @ts-ignore
        devtools(combine(InitialState, StoreActions))
      )
    : create<useStorePropsType>(combine(InitialState, StoreActions));
