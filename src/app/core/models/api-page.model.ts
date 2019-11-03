export interface ApiPage<T> {
  total: number;
  limit: number;
  skip: number;
  data: Array<T>;
}
