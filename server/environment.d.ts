declare global {
  namespace NodeJS {
    interface ProcessEnv {
      mongoConnect: string;
      jwtSecret: string;
    }
  }
}

export {};
