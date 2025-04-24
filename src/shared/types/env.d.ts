declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test';
        NEXT_PUBLIC_API_URL: string; // for variables used in the browser
        SESSION_SECRET: string; // for session secret
    }
}
