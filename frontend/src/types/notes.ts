export interface Note {
  id: string;
  site: string;
  equipment: string;
  variable: string;
  timestamp: string;
  author: string;
  message: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface NotesFilters {
  site?: string;
  equipment?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface CreateNotePayload {
  site: string;
  equipment: string;
  variable: string;
  timestamp: string;
  author: string;
  message: string;
}

export interface UpdateNotePayload {
  site?: string;
  equipment?: string;
  variable?: string;
  timestamp?: string;
  author?: string;
  message?: string;
}
