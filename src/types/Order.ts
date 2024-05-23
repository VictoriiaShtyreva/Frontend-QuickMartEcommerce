export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  totalPrice: number;
  orderItems: OrderItem[];
  shippingAddress?: Address;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderState {
  orders: Order[];
  filteredOrders: Order[];
  total: number;
  loading: boolean;
  error: string | null;
}

export interface OrderCreateDto {
  userId: string;
  orderItems: OrderItemCreateDto[];
  shippingAddress?: Address;
}

export interface OrderUpdateDto {
  status?: OrderStatus;
  orderItems?: OrderItemUpdateDto[];
  shippingAddress?: Address;
}

export interface OrderStatusUpdateDto {
  newStatus: OrderStatus;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productSnapshot: ProductSnapshot;
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItemCreateDto {
  productId: string;
  quantity: number;
}

export interface OrderItemUpdateDto {
  itemId: string;
  quantity?: number;
}

export interface Address {
  addressLine?: string;
  city?: string;
  postalCode?: string;
  country?: string;
}

export interface ProductSnapshot {
  productId: string;
  title?: string;
  price: number;
  description?: string;
  imageUrls?: string[];
}

export enum OrderStatus {
  Pending = "Pending",
  Completed = "Completed",
  Shipped = "Shipped",
  Cancelled = "Cancelled",
  Processing = "Processing",
}
