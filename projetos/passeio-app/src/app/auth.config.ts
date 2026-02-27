import { AuthConfig } from 'angular-oauth2-oidc';

export const auth: AuthConfig = {
    issuer: 'https://accounts.google.com',
    redirectUri: window.location.origin,
    clientId: "35419183742-pnvrvfv2bpheuap2fls3hj4oj97n8vpe.apps.googleusercontent.com",
    scope: 'openid profile email',
    strictDiscoveryDocumentValidation: false
};