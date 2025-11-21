import { Car, CarStatus, Customer, KPIData, Reservation, MenuItem } from './types';
import { 
  Car as CarIcon, 
  Settings, 
  Users,
  Building2,
  Layers,
  Store,
  Network,
  Smartphone,
  Headset
} from 'lucide-react';

export const MOCK_CARS: Car[] = [
  {
    id: '1',
    make: 'Genesis',
    model: 'GV80',
    year: 2024,
    price: 75000,
    vin: 'KMTG80GEN2024001',
    mileage: 1200,
    status: CarStatus.AVAILABLE,
    color: 'Vik Black',
    description: 'Luxury SUV with premium leather interior and advanced safety features.',
    imageUrl: 'https://picsum.photos/400/300?random=1'
  },
  {
    id: '2',
    make: 'Hyundai',
    model: 'Ioniq 5',
    year: 2023,
    price: 48000,
    vin: 'KMHI5EV2023002',
    mileage: 15000,
    status: CarStatus.PENDING,
    color: 'Atlas White',
    description: 'Fully electric crossover with ultra-fast charging capability.',
    imageUrl: 'https://picsum.photos/400/300?random=2'
  },
  {
    id: '3',
    make: 'Kia',
    model: 'Sorento',
    year: 2022,
    price: 32000,
    vin: 'KNKSO2022003',
    mileage: 34000,
    status: CarStatus.SOLD,
    color: 'Gravity Gray',
    description: 'Versatile 3-row SUV perfect for families.',
    imageUrl: 'https://picsum.photos/400/300?random=3'
  },
  {
    id: '4',
    make: 'Mercedes-Benz',
    model: 'E-Class',
    year: 2021,
    price: 55000,
    vin: 'WDBE2021004',
    mileage: 28000,
    status: CarStatus.AVAILABLE,
    color: 'Obsidian Black',
    description: 'Elegant sedan delivering a smooth ride and cutting-edge technology.',
    imageUrl: 'https://picsum.photos/400/300?random=4'
  },
  {
    id: '5',
    make: 'BMW',
    model: 'X5',
    year: 2023,
    price: 68000,
    vin: 'WBAX52023005',
    mileage: 8000,
    status: CarStatus.AVAILABLE,
    color: 'Alpine White',
    description: 'Sport activity vehicle with dynamic handling and spacious interior.',
    imageUrl: 'https://picsum.photos/400/300?random=5'
  }
];

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 'c1',
    name: 'Kim Min-jun',
    email: 'minjun.k@example.com',
    phone: '010-1234-5678',
    status: 'Active',
    lastContact: '2023-10-25',
    notes: 'Interested in electric SUVs.'
  },
  {
    id: 'c2',
    name: 'Lee Ji-a',
    email: 'jia.lee@example.com',
    phone: '010-9876-5432',
    status: 'Lead',
    lastContact: '2023-10-26',
    notes: 'Looking for a budget sedan.'
  },
  {
    id: 'c3',
    name: 'Park Seo-joon',
    email: 'seo.park@example.com',
    phone: '010-5555-4444',
    status: 'Customer',
    lastContact: '2023-09-15',
    notes: 'Purchased Genesis GV80.'
  }
];

export const MOCK_KPI: KPIData = {
  totalInventoryValue: 278000,
  activeCars: 3,
  monthlySales: 12,
  pendingLeads: 5
};

export const SALES_DATA = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 2000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
  { name: 'Jul', sales: 3490 },
  { name: 'Aug', sales: 4200 },
  { name: 'Sep', sales: 3800 },
  { name: 'Oct', sales: 4500 },
];

export const MOCK_RESERVATIONS: Reservation[] = [
  {
    id: '1',
    dealerCode: 'DLR-001',
    dealerName: 'Hyundai Downtown',
    date: '2023-11-15 10:00 AM',
    vehicle: 'IONIQ 5',
    customerName: 'Alice Johnson',
    phoneNumber: '+1 (555) 010-2345',
    email: 'alice.j@example.com',
    recommender: 'Online Ad',
    salesConsultant: 'Michael Scott',
    status: 'Confirmed',
  },
  {
    id: '2',
    dealerCode: 'DLR-045',
    dealerName: 'Westside Auto Group',
    date: '2023-11-15 02:00 PM',
    vehicle: 'Tucson Hybrid',
    customerName: 'Robert Smith',
    phoneNumber: '+1 (555) 012-9988',
    email: 'r.smith99@example.com',
    recommender: 'Friend',
    salesConsultant: 'Jim Halpert',
    status: 'Pending',
  },
  {
    id: '3',
    dealerCode: 'DLR-001',
    dealerName: 'Hyundai Downtown',
    date: '2023-11-16 09:30 AM',
    vehicle: 'Palisade',
    customerName: 'Elena Rodriguez',
    phoneNumber: '+1 (555) 123-4567',
    email: 'elena.r@example.com',
    recommender: 'Walk-in',
    salesConsultant: 'Dwight Schrute',
    status: 'Completed',
  },
  {
    id: '4',
    dealerCode: 'DLR-102',
    dealerName: 'North Star Motors',
    date: '2023-11-16 11:00 AM',
    vehicle: 'Elantra N',
    customerName: 'David Kim',
    phoneNumber: '+1 (555) 987-6543',
    email: 'dkim_tech@example.com',
    recommender: 'Social Media',
    salesConsultant: 'Pam Beesly',
    status: 'Cancelled',
  },
  {
    id: '5',
    dealerCode: 'DLR-001',
    dealerName: 'Hyundai Downtown',
    date: '2023-11-17 04:00 PM',
    vehicle: 'Santa Fe',
    customerName: 'Sarah Connor',
    phoneNumber: '+1 (555) 555-1212',
    email: 's.connor@skynet.com',
    recommender: 'Return Customer',
    salesConsultant: 'Michael Scott',
    status: 'Confirmed',
  },
  {
    id: '6',
    dealerCode: 'DLR-005',
    dealerName: 'Eastside Motors',
    date: '2023-11-18 09:00 AM',
    vehicle: 'Sonata',
    customerName: 'James Miller',
    phoneNumber: '+1 (555) 333-4444',
    email: 'james.m@example.com',
    recommender: 'Billboard',
    salesConsultant: 'Andy Bernard',
    status: 'Pending',
  },
  {
    id: '7',
    dealerCode: 'DLR-008',
    dealerName: 'City Center Auto',
    date: '2023-11-18 01:30 PM',
    vehicle: 'Kona Electric',
    customerName: 'Linda Davis',
    phoneNumber: '+1 (555) 777-8888',
    email: 'linda.d@example.com',
    recommender: 'Web Search',
    salesConsultant: 'Phyllis Vance',
    status: 'Confirmed',
  },
];

export const SIDEBAR_MENU: MenuItem[] = [
  {
    id: 'smart-test-drive',
    label: 'Smart Test Drive',
    icon: CarIcon,
    children: [
      { id: 'dashboard', label: 'Dashboard' },
      { 
        id: 'test-drive', 
        label: 'Test Drive', 
        children: [
            { id: 'reservation', label: 'Reservation & visit' },
            { id: 'documents', label: 'Test drive documents' },
            { id: 'records', label: 'Test drive records' },
        ]
      },
      { id: 'monitoring', label: 'Real-time monitoring' },
      {
        id: 'kpi-reports',
        label: 'KPI reports',
        children: [
          { id: 'td-ratio', label: 'Test drive ratio' },
          { id: 'td-utilization', label: 'Test drive utilization' },
          { id: 'sales-conversion', label: 'Sales conversion ratio' },
        ]
      },
      { id: 'vehicle-code', label: 'Vehicle code management' },
      { id: 'survey-form', label: 'Survey form' },
    ]
  },
  {
    id: 'smart-sales-care',
    label: 'Smart Sales Care',
    icon: Headset,
    children: [
      { id: 'ssc-dashboard', label: 'Dashboard' },
      { 
        id: 'ssc-reports', 
        label: 'Reports',
        children: [
          { id: 'user-report', label: 'User report' },
          { id: 'customer-report', label: 'Customer report' },
          { id: 'activity-report', label: 'Customer activity report' },
          { id: 'usage-report', label: 'SSC Usage report' },
        ]
      },
      { id: 'customers', label: 'Customers' },
      { id: 'customer-activities', label: 'Customer activities' },
      { id: 'documents', label: 'Documents' },
      { id: 'follow-up', label: 'Customer follow up' },
    ]
  },
  {
    id: 'dealers',
    label: 'Dealers',
    icon: Store,
  },
  {
    id: 'distributor',
    label: 'Dealers for distributor',
    icon: Building2,
  },
  {
    id: 'groups',
    label: 'Dealers for dealer groups',
    icon: Users,
  },
  {
    id: 'editions',
    label: 'Editions',
    icon: Layers,
  },
  {
    id: 'org-groups',
    label: 'Organization groups',
    icon: Network,
  },
  {
    id: 'download',
    label: 'App download',
    icon: Smartphone,
    children: [
      { id: 'dl-smart-test-drive', label: 'Smart Test Drive' },
      { id: 'dl-smart-sales-care', label: 'Smart Sales Care' },
    ]
  },
  {
    id: 'admin',
    label: 'Administration',
    icon: Settings,
    children: [
      { id: 'org-units', label: 'Organization units' },
      { id: 'roles', label: 'Roles' },
      { id: 'users', label: 'Users' },
      { id: 'languages', label: 'Languages' },
      { id: 'audit-logs', label: 'Audit logs' },
      { id: 'maintenance', label: 'Maintenance' },
      { id: 'deal-stage', label: 'Deal stage' },
      { id: 'calendar-mgmt', label: 'Calendar management' },
      { 
        id: 'product-config', 
        label: 'Product configuration setting',
        children: [
          { id: 'product-display', label: 'Product display management' },
          { id: 'product-category', label: 'Product category management' },
        ]
      },
      { id: 'ksp-settings', label: 'Ksp showing settings' },
      { id: 'app-version', label: 'App version management' },
      { 
        id: 'patch-system', 
        label: 'Patch system',
        children: [
            { id: 'patch-server', label: 'Patch server management' },
            { id: 'patch-manifests', label: 'Patch manifests' },
        ]
      },
      { id: 'system-code', label: 'System code management' },
      { id: 'consultation-call', label: 'Consultation call setting' },
      { id: 'app-settings', label: 'Application settings' },
      { id: 'system-settings', label: 'System settings' },
    ]
  },
];
