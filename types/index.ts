export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  membershipNumber?: string;
}

export interface TrainingLocation {
  id: string;
  name: string;
  documentUrl: string;
  lastUpdated: string;
}

export interface Document {
  id: string;
  name: string;
  documentUrl: string;
  category: string;
  lastUpdated: string;
}

export interface ProductSize {
  name: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  sizes: ProductSize[];
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface Order {
  id: string;
  name: string;
  membershipNumber: string;
  items: CartItem[];
  totalPrice: number;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface GalaDocument {
  id: string;
  name: string;
  documentUrl: string;
  type: 'flyer' | 'heatSheet' | 'entries' | 'rules' | 'absenteeList';
}

export interface Gala {
  id: string;
  name: string;
  date: string;
  location: string;
  registrationLink: string;
  documents: GalaDocument[];
}

export interface VolunteerRole {
  id: string;
  name: string;
  formLink: string;
}