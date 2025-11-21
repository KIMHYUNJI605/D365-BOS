import React from 'react';

export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  INVENTORY = 'INVENTORY',
  CUSTOMERS = 'CUSTOMERS',
  RESERVATIONS = 'RESERVATIONS',
  SETTINGS = 'SETTINGS'
}

export enum CarStatus {
  AVAILABLE = 'Available',
  PENDING = 'Pending',
  SOLD = 'Sold',
  MAINTENANCE = 'Maintenance'
}

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  vin: string;
  mileage: number;
  status: CarStatus;
  color: string;
  description: string;
  imageUrl: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'Lead' | 'Active' | 'Customer' | 'Inactive';
  lastContact: string;
  notes: string;
}

export interface SaleRecord {
  id: string;
  carId: string;
  customerId: string;
  date: string;
  amount: number;
}

export interface KPIData {
  totalInventoryValue: number;
  activeCars: number;
  monthlySales: number;
  pendingLeads: number;
}

export interface Reservation {
  id: string;
  dealerCode: string;
  dealerName: string;
  date: string;
  vehicle: string;
  customerName: string;
  phoneNumber: string;
  email: string;
  recommender: string;
  salesConsultant: string;
  status: string;
}

export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ElementType;
  children?: MenuItem[];
}
