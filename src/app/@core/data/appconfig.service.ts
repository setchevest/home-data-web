import { Injectable } from '@angular/core';

@Injectable()
export class AppConfigService {

    // private envFile = 'environments/.env';

    public readonly SERVER_BASE_URL: string;
    public readonly SERVER_API_URL: string;
    public readonly LogLevel: string;

    constructor() {
      this.setEnv();
      this.SERVER_BASE_URL = 'http://localhost:8080/';
      this.SERVER_API_URL = 'http://localhost:8080/api/';
      this.LogLevel = 'dev';
    }
    /**
     * Set env
     * Set env from .env or .env.${NODE_ENV} file using dotenv
     */
    private setEnv() {
        // Add NODE_ENV to path if is not production
        // if (process.env.NODE_ENV !== 'production') this.envFile += '.' + process.env.NODE_ENV;
        // Set env from file        
    }
}
