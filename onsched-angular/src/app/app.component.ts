import { authConfig } from './auth.config';
import { Component, OnInit } from '@angular/core';
import { OAuthService, AuthConfig, JwksValidationHandler } from 'angular-oauth2-oidc';
import Swagger from 'swagger-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public apiUrl = 'https://sandbox-api.onsched.com/swagger/v1/swagger.json';
  public customerData: any[];
  public tokenData: any[];

  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
  }

  ngOnInit() {
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(_ => {
      if (!this.oauthService.hasValidIdToken() || !this.oauthService.hasValidAccessToken()) {
        this.oauthService.initImplicitFlow('some-state');
      } else {
        this.haveToken();
      }
    });

    this.noNeedToken();
  }

  login() {
    this.oauthService.initImplicitFlow('some-state');
  }

  logout() {
    this.oauthService.logOut();
  }

  noNeedToken() {
    Swagger(this.apiUrl).then((client) => {
      //      console.log(client);
      client.apis.Customers.ConsumerV1CustomersGet().then(res => {
        //        console.log(res.obj.data);
        this.customerData = res.obj.data;
      });
    });
    //      .catch((err) => {
    //        console.log(err);
    //      });
  }

  haveToken() {
    Swagger(this.apiUrl).then((client) => {
      console.log(client); // Log to see the api calls you can make
      const token = this.oauthService.getAccessToken();

      client.apis.HelloApi.HandshakeClaimsGet({}, {
        // Trick to add the header
        requestInterceptor: (req) => {
          req.headers.Authorization = 'Bearer ' + token;
          return req;
        }
      }).then(res => {
        // This is what the call returns
        this.tokenData = res.obj.data;
        console.log(this.tokenData);
      });
    });
  }
}
