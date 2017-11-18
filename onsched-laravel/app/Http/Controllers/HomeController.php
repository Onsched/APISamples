<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class HomeController extends Controller
{
    public $data = [];

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
      $config = new \Swagger\Client\Configuration();
      $baseUrl = 'https://sandbox-api.onsched.com';//https://sandbox-api.onsched.com/consumer/v1/customers
      $config->setHost($baseUrl);
      //$config->addDefaultHeader('Authorization', $token);
      $apiClient = new \Swagger\Client\ApiClient($config);

      $apiInstance = new \Swagger\Client\Api\CustomersApi($apiClient);
      try {
        $this->data = $apiInstance->consumerV1CustomersGet();
      } catch (Exception $e) {
          echo $e->getMessage();
      }
      return view('welcome', ['data' => $this->data->data]);
    }
}
