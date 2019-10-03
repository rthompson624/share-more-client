export interface Multiple<T> {
  total: number;
  limit: number;
  skip: number;
  data: Array<T>;
}
