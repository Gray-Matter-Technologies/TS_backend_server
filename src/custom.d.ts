declare namespace Express {
  interface Request {
    user: any
    file: any
    flash(type: string, message: any): void;
  }
}