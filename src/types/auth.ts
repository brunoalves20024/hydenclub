import { Model } from './index';

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  users: User[];
  getUsers: () => User[];
  deleteUser: (userId: string) => void;
  updateModelProfile: (modelId: string, updates: Partial<Model>) => void;
  deleteModelProfile: (modelId: string) => void;
  addModelProfile: (model: Model) => void;
}