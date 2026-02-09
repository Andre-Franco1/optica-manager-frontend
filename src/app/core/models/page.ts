export interface Page<T> {
  content: T[] | null;
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
  numberOfElements: number;
}
