// Have all information to work with third party service within Okta 
export const oktaConfig = {
    clientId: '0oaf8dptihFDPf5xW5d7',
    issuer: 'https://dev-95009544.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true
}