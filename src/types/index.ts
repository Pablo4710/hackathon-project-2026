export interface User {
  id: string;
  email: string;
  name: string;
  points: number;
  avatar?: string;
  isAdmin?: boolean;
}

export interface ClothingItem {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  size: string;
  condition: 'New' | 'Like New' | 'Good' | 'Fair';
  tags: string[];
  images: string[];
  uploaderId: string;
  uploaderName: string;
  uploaderAvatar?: string;
  pointValue: number;
  status: 'available' | 'pending' | 'swapped' | 'redeemed';
  createdAt: string;
  approved: boolean;
}

export interface SwapRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  itemOffered: ClothingItem;
  itemRequested: ClothingItem;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  createdAt: string;
  message?: string;
}

export type AuthUser = User | null;