export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'ceilings' | 'walls' | 'shadowline' | 'curved' | 'heritage';
  categoryLabel: string;
  location: string;
  year: string;
  areaM2: number;
  finishLevel: 'Level 5 (ASTM C840 / SAZ)' | 'Level 4 (Paint Ready)' | 'Acoustic Monolithic';
  plasterFormula: string;
  exif: {
    camera: string;
    lens: string;
    shutter: string;
    aperture: string;
    iso: string;
  };
  description: string;
  architect: string;
  highlight: string;
  imageUrl: string;
  rakingAngle: string;
  specDetails: {
    substrate: string;
    thickness: string;
    passes: number;
    dryingTime: string;
  };
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  location: string;
  quote: string;
  projectTitle: string;
  rating: number;
  year: string;
  verified: boolean;
}

export interface PlasterSystem {
  id: string;
  name: string;
  manufacturer: string;
  grade: string;
  standard: string;
  thickness: string;
  dryingHours: number;
  sheen: string;
  description: string;
  keyFeatures: string[];
}

export interface QuoteFormData {
  projectType: string;
  areaM2: number;
  substrate: string;
  finishLevel: string;
  shadowline: boolean;
  name: string;
  email: string;
  phone: string;
  address: string;
  timeline: string;
  notes: string;
}
