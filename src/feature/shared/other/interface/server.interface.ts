export interface ErrorResponse {
  error: string;
  status: number;
}

export interface ResponseDTO<T> {
  payload: T;
  message: string;
}

export interface Pagination {
  page: number;
  pages: number;
  limit: number;
  total: number;
}
