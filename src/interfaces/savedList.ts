export interface ISavedList {
  id: string;
  name: string;
  lat?: number;
  lng?: number;
  hidden?: boolean;
  archieved?: boolean;
  markers: string[];
  color: string;
}