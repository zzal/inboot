interface IConfigMiddleware {
  handle(next: () => void): void;
}
