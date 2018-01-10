import Auth0Lock from 'auth0-lock';
import { AUTH_CONFIG } from './auth0-variables';
import history from '../history';

export default class Auth {

  lock = new Auth0Lock(AUTH_CONFIG.clientId, AUTH_CONFIG.domain, {
    autoclose: true,
    auth: {
      redirectUrl: AUTH_CONFIG.callbackUrl,
      responseType: 'token id_token',
      audience: `https://${AUTH_CONFIG.domain}/userinfo`,
      params: {
        scope: 'openid profile email'
      }
    },
    additionalSignUpFields: [{
      name: "firstname",
      placeholder: "First Name",
      // The following properties are optional
      //icon: "https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_account_circle_black_24px.svg",
      validator: function(firstname) {
        return {
           valid: firstname.length >= 1,
           hint: "Must have 1 or more chars" // optional
        };
      }
    },{
      name: "lastname",
      placeholder: "Last Name",
      // The following properties are optional
      //icon: "https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_account_circle_black_24px.svg",
      validator: function(lastname) {
        return {
           valid: lastname.length >= 1,
           hint: "Must have 1 or more chars" // optional
        };
      },
    },{
      name: "skypename",
      placeholder: "Skype Name",
      // The following properties are optional
      //icon: "https://example.com/assests/address_icon.png",
      validator: function(skype) {
        return {
           valid: skype.length >= 3,
           hint: "Must have 3 or more chars" // optional
        };
      }
    }]
  });

  userProfile;

  constructor() {
    this.handleAuthentication();
    // binds functions to keep this context
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  handleAuthentication() {
    // Add a callback for Lock's `authenticated` event
    this.lock.on('authenticated', this.setSession.bind(this));
    // Add a callback for Lock's `authorization_error` event
    this.lock.on('authorization_error', (err) => {
      console.log(err);
      alert(`Error: ${err.error}. Check the console for further details.`);
      history.replace('/home');
    });
  }

  setSession(authResult) {
    if (authResult && authResult.accessToken && authResult.idToken) {
      // Set the time that the access token will expire at
      let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
      // navigate to the home route
      history.replace('/profile');
    }
  }

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  }

  getProfile(cb) {
    const accessToken = this.getAccessToken();
    this.lock.getUserInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/home');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
