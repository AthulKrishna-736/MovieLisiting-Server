
export interface IRepository<T> {
    read(): T[];
    write(data: T[]): void;
    toggle(movie: T): T[];
}
