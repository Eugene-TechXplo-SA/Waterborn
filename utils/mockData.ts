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
    image: 'data:image/jpeg;base64,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',
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