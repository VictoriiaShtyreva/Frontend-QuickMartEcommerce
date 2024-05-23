export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    name: string;
    avatar: string;
  };
}

export interface ReviewState {
  reviews: Review[];
  loading: boolean;
  error: string | null;
  total: number;
}

export interface ReviewCreate {
  userId: string;
  productId: string;
  rating: number;
  content: string;
}

export interface ReviewUpdate {
  userId: string;
  rating: number;
  content: string;
}
