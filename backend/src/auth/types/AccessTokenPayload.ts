export interface AccessTokenPayload {
  sub: string;  // User ID (should match JWT payload)
  email: string;
  role: string;
}

export type AccessToken = {
  access_token: string;
};
