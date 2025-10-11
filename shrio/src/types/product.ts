export interface createUrl {
  userIp: string;
  userId: string;
  description: string;
  isVerifiedUser: boolean;
  redirectTo: string;
  expireDate: Date | null;
  slug: string;
  createdAt: Date;
}

export interface createUserUrl {
  description: string;
  redirectTo: string;
  expireDate: Date | null; 
  slug: string;
}

export interface serverURL {
  _id: string;
  userIp?: string;
  userId: string;
  description?: string;
  isVerifiedUser?: boolean;
  redirectTo: string;
  slug: string;
  createdAt: Date;
  expireDate?: Date;
  clicks: number;
  dailyClicks?: {
    date?: Date;
    count: number;
  };
  updatedAt?: Date;
  deviceStats?: {
    desktop: number;
    mobile: number;
  };
}

export interface createQR {
  userIp: string;
  userId: string;
  description: string;
  isVerifiedUser: boolean;
  redirectTo: string;
  createdAt: Date;
  imgUrl: string;
  slug: string;
}

export interface createUserQR {
  description: string;
  redirectTo: string;
  imgUrl: string;
}

export interface serverQR {

  _id: string;
  userId: string;
  description: string;
  redirectTo: string;
  imgUrl: string; 
  count: number;
  scans: number; 
  dailyScans: {
    count: number;
    date?: string | Date;
  };
  deviceStats: {
    desktop: number;
    mobile: number;
  };
  isVerifiedUser: boolean;
  createdAt: string;   
  updatedAt: string;  
  expireDate?: string | Date; 
  
}
