import { Component } from '@angular/core';
import Swagger from 'swagger-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public apiUrl = 'https://sandbox-api.onsched.com/swagger/v1/swagger.json';
  public data: any[];

  constructor() {
    Swagger(this.apiUrl).then((client) => {
      client.apis.Customers.ConsumerV1CustomersGet().then(res => {
        console.log(res.obj.data);
        this.data = res.obj.data;
      });
    });
    //      .catch((err) => {
    //        console.log(err);
    //      });
  }

}
