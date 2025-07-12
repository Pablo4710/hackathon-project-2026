import { ClothingItem, SwapRequest } from '../types';

export const mockItems: ClothingItem[] = [
  {
    id: '1',
    title: 'Vintage Levi\'s Denim Jacket',
    description: 'Classic blue denim jacket in excellent condition. Perfect for layering in spring and fall. No stains or tears.',
    category: 'Outerwear',
    type: 'Jacket',
    size: 'M',
    condition: 'Good',
    tags: ['vintage', 'denim', 'casual', 'unisex'],
    images: ['https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg'],
    uploaderId: '2',
    uploaderName: 'Sarah Chen',
    pointValue: 45,
    status: 'available',
    createdAt: '2024-01-15',
    approved: true
  },
  {
    id: '2',
    title: 'Floral Summer Dress',
    description: 'Beautiful midi dress with floral print. Worn only a few times. Perfect for summer events and casual outings.',
    category: 'Dresses',
    type: 'Midi Dress',
    size: 'S',
    condition: 'Like New',
    tags: ['floral', 'summer', 'midi', 'feminine'],
    images: ['https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg'],
    uploaderId: '3',
    uploaderName: 'Emma Rodriguez',
    pointValue: 35,
    status: 'available',
    createdAt: '2024-01-14',
    approved: true
  },
  {
    id: '3',
    title: 'Cozy Wool Sweater',
    description: 'Soft merino wool sweater in cream color. Very warm and comfortable. Minor pilling but overall great condition.',
    category: 'Tops',
    type: 'Sweater',
    size: 'L',
    condition: 'Good',
    tags: ['wool', 'warm', 'cozy', 'winter'],
    images: ['https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg'],
    uploaderId: '4',
    uploaderName: 'Alex Thompson',
    pointValue: 40,
    status: 'available',
    createdAt: '2024-01-13',
    approved: true
  },
  {
    id: '4',
    title: 'Designer Handbag',
    description: 'Authentic leather handbag from a premium brand. Barely used, comes with dust bag. Perfect for professional settings.',
    category: 'Accessories',
    type: 'Handbag',
    size: 'One Size',
    condition: 'Like New',
    tags: ['leather', 'designer', 'professional', 'luxury'],
    images: ['https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg'],
    uploaderId: '5',
    uploaderName: 'Julia Martinez',
    pointValue: 80,
    status: 'available',
    createdAt: '2024-01-12',
    approved: true
  },
  {
    id: '5',
    title: 'Athletic Running Shoes',
    description: 'High-quality running shoes with excellent cushioning. Used but well-maintained. Great for daily workouts.',
    category: 'Shoes',
    type: 'Sneakers',
    size: '9',
    condition: 'Good',
    tags: ['athletic', 'running', 'comfortable', 'sports'],
    images: ['https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg'],
    uploaderId: '6',
    uploaderName: 'Mike Johnson',
    pointValue: 30,
    status: 'available',
    createdAt: '2024-01-11',
    approved: true
  },
  {
    id: '6',
    title: 'Elegant Black Blazer',
    description: 'Professional black blazer perfect for work or formal events. Tailored fit with subtle texture.',
    category: 'Outerwear',
    type: 'Blazer',
    size: 'M',
    condition: 'Like New',
    tags: ['professional', 'formal', 'black', 'tailored'],
    images: ['https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg'],
    uploaderId: '7',
    uploaderName: 'Rachel Kim',
    pointValue: 55,
    status: 'available',
    createdAt: '2024-01-10',
    approved: true
  }
];

export const mockSwapRequests: SwapRequest[] = [
  {
    id: '1',
    fromUserId: '1',
    toUserId: '2',
    itemOffered: mockItems[2],
    itemRequested: mockItems[0],
    status: 'pending',
    createdAt: '2024-01-16',
    message: 'Hi! I love your denim jacket. Would you be interested in swapping for my wool sweater?'
  }
];