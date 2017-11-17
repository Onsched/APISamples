import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Swagger from 'swagger-client'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
  }

  componentWillMount() {
    let apiUrl= 'https://sandbox-api.onsched.com/swagger/v1/swagger.json';
    Swagger(apiUrl).then((client) => {
      client.apis.Customers.ConsumerV1CustomersGet().then(res => {
        this.setState({data: res.obj.data});
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    const {data} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Names from /consumer/v1/customers</h1>
        </header>
        <div className="App-intro">
          <ul>{data.map((item, index) => <li key={item.id}>{item.name}</li>)}</ul>
        </div>
      </div>
    );
  }
}

export default App;
