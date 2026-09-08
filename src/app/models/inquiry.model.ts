export interface LeadInquiry {
  fullName: string;
  email: string;
  phone: string;
  destinationId: string;
  packageId?: string;
  packageTitle?: string;
  departureCity: string;
  travelMonth: string;
  adultsCount: number;
  childrenCount: number;
  budgetRange: string;
  customRequests?: string;
}
