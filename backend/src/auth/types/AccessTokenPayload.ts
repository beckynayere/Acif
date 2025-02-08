export interface AccessTokenPayload {
    sub: string;  // User ID
    email: string;
    role: string;
  }
  export type AccessToken = {
    access_token: string;
};
