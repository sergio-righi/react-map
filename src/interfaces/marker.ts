
export interface IMarker {
  id: string;
  address: string;
  lat: number;
  lng: number;
  status: string;
  color: string;
  savedListId: string | null;
}