export type Property = {
  _id?: string | undefined;
  guid: string;
  title?: string | undefined;
  about?: string | undefined;
  description?: string | undefined;
  price?: number | undefined;
  address?: string | undefined;
  amenities: string[] | undefined;
  pictures: string[];
  owner: {
    name?: string;
    age?: number | undefined;
    gender?: string | undefined;
    phone?: string | undefined;
    email?: string | undefined;
  };
  comments?: {
    id?: number;
    text: string;
    author: string;
    datetime?: string | undefined;
  }[];
  status?: string;
  latitude?: string;
  longitude?: string;
  tags?: string[];
};

export type ValueProperty = Property & {
  pictures?: string;
};
