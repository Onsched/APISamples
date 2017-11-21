// This api will come in the next version
import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {

  // Url of the Identity Provider
  issuer: 'https://stage-identity.onsched.com',

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin,
  // redirectUri: 'https://stage-identity.onsched.com?r=1';
  //  redirectUri: 'https://onschedidentitymanager.azurewebsites.net/signin-oidc',
  // ReturnUrl: window.location.origin,

  // URL of the SPA to redirect the user after silent refresh
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: 'Company.20.js',

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: 'openid OnSchedApi cid.20', // 'openid OnSchedApi cid.599',
};
