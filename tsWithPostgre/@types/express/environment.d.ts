declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            PORT?: any;
            DB_USER?: any
            DB_PASSWORD?: any
            DB_HOST?: any
            DB_PORT?: any
            DB_NAME?: any 
        }
    }
  }
  
//I get autofill support from here on process.env
  export {}