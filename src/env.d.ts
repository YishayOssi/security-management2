declare namespace NodeJS {
  interface ProcessEnv {
    // Database Configuration
    MYSQL_PORT: string;
    MYSQL_USER: string;
    MYSQL_PASSWORD: string;
    MYSQL_ROOT_PASSWORD: string;
    MYSQL_DATABASE: string;

    // Application Configuration
    NODE_ENV?: 'development' | 'production' | 'test';
    PORT?: string;
    JWT_SECRET: string;

    // Add other environment variables as needed
    // API_KEY?: string;
  }
}
