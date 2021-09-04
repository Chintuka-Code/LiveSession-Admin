export interface HTTP_Response<T> {
  err: number;
  data?: T;
  message?: string;
}
