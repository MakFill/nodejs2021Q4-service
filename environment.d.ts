declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: number;
      AUTH_MODE: boolean;
      JWT_SECRET_KEY: string;
      MONGO_CONNECTION_STRING: string;
      LOGGER_LVL: string;
    }
  }
}

export default global;
