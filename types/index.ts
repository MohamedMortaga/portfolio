// Social Links
export type SocialLink ={
    name:string;
    url:string;
    icon:string;
}

//  Profile
export type Profile ={
    name:string;
    title:string;
    bio:string;
    image:string;
    details?: string[];
    cv:string;
    email:string;
    location?:string;
    skills:string[];
    socials:SocialLink[];
}


//  Experience 
export type Experience = {
    type: "work" | "training";
    company: string;
    role: string;
    startDate: string; 
    endDate: string;
    location?: string;
    achievements: string[];
    tech: string[];
};
 
//  Projects 
export type Project = {
    title: string;
    description: string;
    image: string;
    tech: string[];
    githubUrl?: string;
    liveUrl?: string;
    featured?: boolean;
};
 
export type FutureStatus = "planned" | "in-progress" | "learning";
 
export type FutureItem = {
    title: string;
    description: string;
    status: FutureStatus;
};