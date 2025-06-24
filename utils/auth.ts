import { User, UserRole } from '@/types';

// Mock user data - in a real app this would come from a backend
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    membershipNumber: 'ADM001',
  },
  {
    id: '2',
    name: 'Club Member',
    email: 'member@example.com',
    role: 'user',
    membershipNumber: 'MEM001',
  }
];

let currentUser: User | null = null;

// Simulated authentication functions
// In a real app, these would connect to a backend service

export const getCurrentUser = (): User | null => {
  // In a real app, this would check local storage or a token
  return currentUser;
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

export const hasRole = (role: UserRole): boolean => {
  const user = getCurrentUser();
  return user !== null && user.role === role;
};

export const isAdmin = (): boolean => {
  return hasRole('admin');
};

export const login = (email: string, password: string): Promise<User> => {
  // Mock login function
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(u => u.email === email);
      if (user && password === 'password') {
        currentUser = user;
        resolve(user);
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};

export const logout = (): Promise<void> => {
  // Mock logout function
  return new Promise((resolve) => {
    setTimeout(() => {
      currentUser = null;
      resolve();
    }, 500);
  });
};