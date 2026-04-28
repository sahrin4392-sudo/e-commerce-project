import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import type { CartItem } from '../types';

export type OrderStatus = 'Order Placed' | 'Processing' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  date: string;
  estimatedDelivery: string;
}

export const useOrderStore = defineStore('order', () => {
  const orders = ref<Order[]>([]);
  const currentTrackingId = ref<string | null>(null);

  // Initialize from local storage
  const savedOrders = localStorage.getItem('order_history');
  if (savedOrders) {
    try {
      orders.value = JSON.parse(savedOrders);
    } catch (e) {
      localStorage.removeItem('order_history');
    }
  }

  // Save to local storage whenever orders change
  watch(orders, (newOrders) => {
    localStorage.setItem('order_history', JSON.stringify(newOrders));
  }, { deep: true });

  const currentOrder = computed(() => {
    return orders.value.find(o => o.id === currentTrackingId.value) || null;
  });

  function createOrder(items: CartItem[], total: number) {
    const id = 'SAHR-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const now = new Date();
    const deliveryDate = new Date();
    deliveryDate.setDate(now.getDate() + 5);

    const newOrder: Order = {
      id,
      items: [...items],
      total,
      status: 'Order Placed',
      date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      estimatedDelivery: deliveryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    orders.value.unshift(newOrder);
    currentTrackingId.value = id;
    
    // Simulate order progress for demo purposes
    simulateProgress(id);
    
    return id;
  }

  function simulateProgress(orderId: string) {
    const statuses: OrderStatus[] = ['Order Placed', 'Processing', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];
    let currentIndex = 0;

    const interval = setInterval(() => {
      const order = orders.value.find(o => o.id === orderId);
      if (order && currentIndex < statuses.length - 1) {
        currentIndex++;
        order.status = statuses[currentIndex];
      } else {
        clearInterval(interval);
      }
    }, 15000); // Progress every 15 seconds for simulation
  }

  function trackOrder(id: string) {
    const exists = orders.value.some(o => o.id === id);
    if (exists) {
      currentTrackingId.value = id;
      return true;
    }
    return false;
  }

  return {
    orders,
    currentTrackingId,
    currentOrder,
    createOrder,
    trackOrder
  };
});
