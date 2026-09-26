// Social Links
export type SocialLink = {
  name: string;
  url: string;
  icon: string;
};

// Profile
export type Profile = {
  name: string;
  title: string;
  bio: string;
  image: string;
  cv: string;
  email: string;
  location?: string;
  skills: string[];
  socials: SocialLink[];
};

// Experience
export type ExperienceType = "work" | "training";

export type Experience = {
  type: ExperienceType;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  location?: string;
  achievements: string[];
  tech: string[];
};

// Projects
export type Project = {
  title: string;
  description: string;
  highlights?: string[];
  image: string;
  imageNote?: string;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
};

// Future Work
export type FutureStatus = "planned" | "in-progress" | "learning";

export type FutureItem = {
  title: string;
  description: string;
  status: FutureStatus;
  progress?: number;
};