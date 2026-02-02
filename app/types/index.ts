// Company Types
export interface Coordinate {
  longitude: number;
  latitude: number;
}

export interface Address {
  street: string;
  streetNumber: string;
  zip: number;
  city: string;
  state: string;
  coordinate: Coordinate;
}

export interface OpeningHoursItem {
  weekday: string;
  from: string;
  to: string;
}

export interface OpeningHours {
  message: string;
  items: OpeningHoursItem[];
}

export interface Company {
  id: string;
  company: string;
  image: string;
  openingHours: OpeningHours;
  state: string;
  adresse: Address;
  address: Address;
  locations: any[];
  reviewPoints: number;
  profileState: string | null;
  categories: string[];
}

// Contact Info Types
export interface ContactInfo {
  id: string;
  mainLanguage: string;
  additionalLanguages: string[];
  email: string;
  telefon: string;
  website: string;
  bookingLink: string;
  weblinks: {
    website: string;
    bookingLink: string;
    vrTour: string | null;
    weblinksItems: any[];
  };
  openingHours: OpeningHours | null;
  state: string;
  adresse: Address | null;
  address: Address | null;
  locations: any[];
  reviewPoints: number;
  profileState: string | null;
  categories: string[];
}

// About Types
export interface AboutItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface About {
  companyId: string;
  description: string;
  items: AboutItem[];
}

// Post Types
export interface Post {
  postId?: string;
  ownerId?: string;
  ownerName?: string;
  ownerFirstName?: string;
  ownerType?: string;
  ownerLogo?: string;
  targetState?: string;
  targetCity?: string;
  associationIds?: string[];
  title: string;
  text: string;
  image: string;
  linkUrl?: string;
  state?: string;
  likes?: string[];
  sortDate?: string;
  showUntil?: string | null;
  frequencyType?: string;
  frequencyDayOfWeek?: string;
  frequencyDayOfMonth?: number;
  categories?: string[];
  showAt?: string;
  created?: string;
  updated?: string;
}

// Employee Types
export interface Employee {
  id: string;
  firstname: string;
  name: string;
  image: string;
}

// Event Types
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
}

// Team Types
export interface Team {
  id: string;
  name: string;
  role: string;
  image: string;
}

// Company Settings / Theme Types
export interface ThemeColors {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  accentColor: string;
  contrastColor: string;
  textColor: string;
}

export interface Section {
  type: string;
  visible: boolean;
  order: number;
}

export interface Intro {
  welcomeTextDE: string;
  welcomeTextEN: string;
  welcomeTextFR: string;
  welcomeTextIT: string;
  imageDesktopMimeType: string;
  imageDesktopPreviewMimeType: string;
  imageMobileMimeType: string;
  imageMobilePreviewMimeType: string;
  imageDesktop: string;
  imageDesktopPreview: string;
  imageMobile: string;
  imageMobilePreview: string;
}

export interface CompanySettings {
  id: string;
  companyId: string;
  isPreview: boolean;
  theme: string;
  colors: ThemeColors;
  sections: Section[];
  intro: Intro;
  cardTheme: string | null;
}

// Combined data type for the landing page
export interface LandingPageData {
  company: Company;
  contactInfo: ContactInfo;
  about: About;
  posts: Post[];
  openingHours: OpeningHours;
  events: Event[];
  teams: Team[];
  employees: Employee[];
  settings: CompanySettings;
}

// Domain Info Type - response from domain API
export interface DomainInfo {
  companyId: string;
  domain: string;
  template?: string;
}
