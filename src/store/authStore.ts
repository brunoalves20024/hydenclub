import { create } from 'zustand';
import { AuthState, LoginCredentials, RegisterCredentials, User } from '../types/auth';
import { Model } from '../types';
import { models as initialModels } from '../data/models';

// Simulated database
let USERS: Record<string, User & { password: string }> = {
  admin: {
    id: '1',
    username: 'admin',
    email: 'admin@hydenclub.com',
    password: 'admin123',
    role: 'admin',
    createdAt: new Date()
  }
};

let MODELS = [...initialModels];

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  users: Object.values(USERS),

  login: async (credentials: LoginCredentials) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const user = Object.values(USERS).find(u => 
      u.username === credentials.username && 
      u.password === credentials.password
    );

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = user;
    set({ user: userWithoutPassword, isAuthenticated: true });
  },

  register: async (credentials: RegisterCredentials) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    if (Object.values(USERS).some(u => u.username === credentials.username)) {
      throw new Error('Username already exists');
    }

    if (Object.values(USERS).some(u => u.email === credentials.email)) {
      throw new Error('Email already exists');
    }

    const newUser: User & { password: string } = {
      id: Date.now().toString(),
      ...credentials,
      role: 'user',
      createdAt: new Date()
    };

    USERS[newUser.id] = newUser;

    const { password: _, ...userWithoutPassword } = newUser;
    set({ user: userWithoutPassword, isAuthenticated: true });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  getUsers: () => Object.values(USERS).map(({ password: _, ...user }) => user),

  deleteUser: (userId: string) => {
    const { [userId]: _, ...remainingUsers } = USERS;
    USERS = remainingUsers;
    set({ users: Object.values(USERS) });
  },

  updateModelProfile: (modelId: string, updates: Partial<Model>) => {
    MODELS = MODELS.map(model => 
      model.id === modelId ? { ...model, ...updates } : model
    );
  },

  deleteModelProfile: (modelId: string) => {
    MODELS = MODELS.filter(model => model.id !== modelId);
  },

  addModelProfile: (model: Model) => {
    MODELS = [...MODELS, model];
  }
}));