export interface Trip {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  updatedBy?: string;
  creatorId: string;
  name: string;
  startDate?: string;
  endDate?: string;
}
