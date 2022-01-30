declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: number;
      AUTH_MODE: boolean;
      JWT_SECRET_KEY: string;
      LOGGER_LVL: string;
      POSTGRES_PORT: number;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_DB: string;
      POSTGRES_HOST: string;
      POSTGRES_HOST_DOCKER: string;
      USE_FASTIFY: string;
    }
  }
}

export default global;
