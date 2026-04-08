export interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  github?: string;
  website?: string;
  [key: string]: string | undefined;
}

export interface PortfolioCourse {
  name?: string;
  institution?: string;
  year?: string;
  description?: string;
}

export interface PortfolioProject {
  name?: string;
  title?: string;
  description?: string;
  link?: string;
  tools?: string | string[];
  imageUrl?: string;
}

export interface PortfolioExperience {
  company?: string;
  role?: string;
  period?: string;
  description?: string;
}

export interface PortfolioSkill {
  name?: string;
  level?: number;
}

export type PortfolioSkillEntry = string | PortfolioSkill;

export interface PortfolioSectionContent {
  title?: string;
  subtitle?: string;
  avatarUrl?: string;
  [key: string]: unknown;
}

export interface PortfolioSection {
  id?: number;
  type: string;
  content?: PortfolioSectionContent;
  order?: number;
  isVisible?: boolean;
}

export interface PortfolioData {
  id: number;
  userId?: number;
  templateId?: number;
  slug: string;
  primaryColor?: string;
  secondaryColor?: string;
  secondaryTextColor?: string;
  fontFamily?: string;
  logoUrl?: string;
  logoPosition?: string;
  profession?: string;
  location?: string;
  email?: string;
  socialLinks?: SocialLinks;
  courses?: PortfolioCourse[];
  projects?: PortfolioProject[];
  experience?: PortfolioExperience[];
  skills?: PortfolioSkillEntry[];
  name?: string;
  initials?: string;
}
