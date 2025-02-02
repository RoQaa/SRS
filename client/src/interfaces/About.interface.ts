// Interface for sub-details in companyInfo
export interface SubDetail {
  icon: string;
  title: string;
  title_ar: string;
  description: string;
  description_ar: string;
}

// Interface for vision and mission sections
export interface VisionMission {
  title: string;
  title_ar: string;
  content: string;
  content_ar: string;
}

// Interface for values section
export interface AboutValue {
  icon: string;
  label: string;
  label_ar: string;
}

export interface ICompanyInfo {
  description: string;
    description_ar: string;
    mainImg: string;
    subDetails?: SubDetail[];
}

// Main about data interface
export interface IAbout {
  _id?: string;
  companyInfo?: ICompanyInfo;
  visionMission?: VisionMission[];
  values?: AboutValue[];
  vmImg: string;
}
