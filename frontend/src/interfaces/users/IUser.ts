export interface IUser {
  id: string;
  name: string;
  surname: string;
  age: number;
  email: string;
  photo: string | null;
  phone?: string | null;
  gender?: string | null;
  role: string;
  city: string;
  region: string;
  isVerified: boolean;
  isActive: boolean;
  isDeleted: boolean;
  ownerOf: {
      id: string
  } | null
}