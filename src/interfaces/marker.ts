
export interface IMarker {
  id: string;
  name: string;
  phone: string;
  email: string;
  roofType: string;
  roofAge: string;
  average_bill: number;
  utility_company: string;
  electricity_usage: number;
  address: string;
  lat: number;
  lng: number;
  leadId: string;
  proposalId: string;
  status: string;
  generated: boolean;
  savedListId: string | null;
}