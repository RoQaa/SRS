export interface IContact {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  allContacts: any;
  _id?: string;
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
    whatsApp?: string;
  };
  branches: Branch[];
}

export interface Branch {
  name: string;
  name_ar: string;
  mapSrc: string;
  address?: string;
  address_ar?: string;
  phoneNumber?: string;
  whatsAppNumber?: string;
  whatsAppLink?: string;
  email?: string;
  addressLink?: string;
}
