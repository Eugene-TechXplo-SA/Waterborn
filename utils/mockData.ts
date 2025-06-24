import { TrainingLocation, Document, Product, Gala, VolunteerRole, User } from '@/types';

// Training locations
export const trainingLocations: TrainingLocation[] = [
  {
    id: '1',
    name: 'Randburg',
    documentUrl: 'https://example.com/schedule-randburg.pdf',
    lastUpdated: '2023-10-15',
  },
  {
    id: '2',
    name: 'Bel Air',
    documentUrl: 'https://example.com/schedule-belair.pdf',
    lastUpdated: '2023-10-10',
  },
];

// Club documents
export const clubDocuments: Document[] = [
  {
    id: '1',
    name: 'Terms & Conditions',
    documentUrl: 'https://example.com/terms.pdf',
    category: 'General',
    lastUpdated: '2023-09-15',
  },
  {
    id: '2',
    name: 'Rules & Regulations',
    documentUrl: 'https://example.com/rules.pdf',
    category: 'General',
    lastUpdated: '2023-09-20',
  },
  {
    id: '3',
    name: 'Info Document',
    documentUrl: 'https://example.com/info.pdf',
    category: 'General',
    lastUpdated: '2023-09-25',
  },
  {
    id: '4',
    name: 'Swimmer Entries',
    documentUrl: 'https://example.com/entries.pdf',
    category: 'Competition',
    lastUpdated: '2023-10-01',
  },
  {
    id: '5',
    name: 'Psych Sheet (SYC)',
    documentUrl: 'https://example.com/psych.pdf',
    category: 'Competition',
    lastUpdated: '2023-10-05',
  },
  {
    id: '6',
    name: 'Heat Sheets / Program',
    documentUrl: 'https://example.com/heat.pdf',
    category: 'Competition',
    lastUpdated: '2023-10-10',
  },
];

// Marketplace products
export const products: Product[] = [
  {
    id: '1',
    name: 'Club Hoodie',
    description: 'Comfortable club hoodie with logo',
    price: 45.99,
    image: 'https://publicpool.co/cdn/shop/files/FS_HoodieBlueBack.jpg?v=16929079250',
    category: 'Clothing',
    sizes: [
      { name: 'S', inStock: true },
      { name: 'M', inStock: true },
      { name: 'L', inStock: true },
      { name: 'XL', inStock: false },
    ],
  },
  {
    id: '2',
    name: 'Racing Goggles',
    description: 'Professional racing goggles',
    price: 29.99,
    image: 'https://zone3.com/cdn/shop/files/Volare_Streamline_Racing_Swim_Goggles_-_ZONE3_UK-597804_1000x@2x.jpg?v=1717521870',
    category: 'Equipment',
    sizes: [
      { name: 'One Size', inStock: true },
    ],
  },
  {
    id: '3',
    name: 'Swim Cap',
    description: 'Silicone swim cap with club logo',
    price: 12.99,
    image: 'https://static.dezeen.com/uploads/2022/09/soul-cap-adidas-sportswear-fashion-swimming-cap_dezeen_2364_col_hero2.jpg',
    category: 'Equipment',
    sizes: [
      { name: 'Junior', inStock: true },
      { name: 'Adult', inStock: true },
    ],
  },
  {
    id: '4',
    name: 'Training Fins',
    description: 'Silicone training fins for improved technique',
    price: 34.99,
    image: 'https://www.swimemporium.co.za/wp-content/uploads/2024/07/yellow.png',
    category: 'Equipment',
    sizes: [
      { name: 'S', inStock: true },
      { name: 'M', inStock: true },
      { name: 'L', inStock: false },
    ],
  },
];

// Galas
export const galas: Gala[] = [
  {
    id: '1',
    name: 'SANJ Regional Championship',
    date: '2023-11-15',
    location: 'Randburg Swimming Pool',
    registrationLink: 'https://forms.google.com/sanj-registration',
    documents: [
      {
        id: '1',
        name: 'Event Flyer',
        documentUrl: 'https://example.com/sanj-flyer.pdf',
        type: 'flyer',
      },
      {
        id: '2',
        name: 'Heat Sheets',
        documentUrl: 'https://example.com/sanj-heat.pdf',
        type: 'heatSheet',
      },
      {
        id: '3',
        name: 'Entries',
        documentUrl: 'https://example.com/sanj-entries.pdf',
        type: 'entries',
      },
    ],
  },
  {
    id: '2',
    name: 'Senior Gala',
    date: '2023-12-10',
    location: 'Bel Air Swimming Centre',
    registrationLink: 'https://forms.google.com/senior-gala-registration',
    documents: [
      {
        id: '4',
        name: 'Event Flyer',
        documentUrl: 'https://example.com/senior-flyer.pdf',
        type: 'flyer',
      },
      {
        id: '5',
        name: 'Rules',
        documentUrl: 'https://example.com/senior-rules.pdf',
        type: 'rules',
      },
    ],
  },
];

// Volunteer roles
export const volunteerRoles: VolunteerRole[] = [
  {
    id: '1',
    name: 'Judge',
    formLink: 'https://forms.google.com/judge-registration',
  },
  {
    id: '2',
    name: 'Timekeeper',
    formLink: 'https://forms.google.com/timekeeper-registration',
  },
];