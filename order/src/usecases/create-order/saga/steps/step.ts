export abstract class Step<T, R> {
  name: string;
  abstract invoke(params: T): Promise<R>;
  abstract withCompenstation(params: T): Promise<R>;
}
