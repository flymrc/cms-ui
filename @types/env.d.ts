/// <reference types="vite/client" />
type AppRuntimeType = "store" | "system"

interface ImportMetaEnv {
    VITE_APP_ENV: string
    VITE_APP_AWS_REGION: string
    VITE_APP_USRE_POOL_ID: string
    VITE_APP_USER_POOL_CLIENT_ID: string
    VITE_APP_API_BASE_URL: string
    VITE_APP_S3_BUCKET_NAME: string
    VITE_APP_RUNTIME_NAME: AppRuntimeType
}

declare const APP_VERSION: string;

type Nullable<T> = {
    [x in keyof T]?: T[x]
}