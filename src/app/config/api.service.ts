import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.api
  }

  getArtists() {
    return this.http.get(`${this.url}/performers/`);
  }

  getPerformer(id) {
    return this.http.get(`${this.url}/performers/${id}`);
  }

  getEvents() {
    return this.http.get(`${this.url}/events/`);
  }

  getMyEvents() {
    return this.http.get(`${this.url}/orders/my-orders`);
  }

  getEvent(slug) {
    if (slug) {
      return this.http.get(`${this.url}/events?slug=${slug}`);
    }
  }

  getUser(options) {
    return this.http.post(`${this.url}/auth/local`, options);
  }

  getMyShows() {
    return this.http.get(`${this.url}/orders/my-orders`);
  }

  getTickets() {
    return this.http.get(`${this.url}/tickets/`);
  }

  getItems() {
    return this.http.get(`${this.url}/items/`);
  }

  getGenres() {
    return this.http.get(`${this.url}/genres`);
  }

  registerUser(options) {
    return this.http.post(`${this.url}/auth/local/register/`, options);
  }

  forgotPassword(data) {
    return this.http.post(`${this.url}/auth/forgot-password`, data);
  }

  getFloatRates() {
    // http://www.floatrates.com/daily/usd.json
    return this.http.get('https://www.floatrates.com/daily/usd.json');
  }

  createDeliveryAddress(details) {
    return this.http.post(`${this.url}/delivery-addresses`, details);
  }

  createPaymentIntent(data) {
    return this.http.post(`${this.url}/payment-intents`, data);
  }

  getCommonCurrency() {
    // https://gist.githubusercontent.com/Fluidbyte/2973986/raw/8bb35718d0c90fdacb388961c98b8d56abc392c9/Common-Currency.json
    return this.http.get('https://gist.githubusercontent.com/Fluidbyte/2973986/raw/8bb35718d0c90fdacb388961c98b8d56abc392c9/Common-Currency.json');
  }

  createOrder(params) {
    return this.http.post(`${this.url}/orders/`, params)
  }

  getIntent(amount) {
    return this.http.post(`${this.url}/intention/${amount}`, { amount })
  }

  getCharting() {
    return this.http.get(`${this.url}/performers/charting/`);
  }

  completeOrder(order, message) {
    return this.http.post(`${this.url}/orders/complete/${order.order_uuid}`, { message })
  }

  failedOrder(order, message) {
    return this.http.post(`${this.url}/orders/failed/${order.order_uuid}`, { message })
  }


  createNotification(email) {
    return this.http.post(`${this.url}/orders/`, { email })
  }

  checkEmail(email) {
    return this.http.get(`${this.url}/precheck/${email}`)
  }

  createProfile(data) {
    return this.http.post(`${this.url}/profiles`, data)
  }

  createOrUpdateProfile(data) {
    return this.http.post(`${this.url}/profiles/createOrUpdate`, data)
  }

  createOrUpdateShippingAddress(data) {
    return this.http.post(`${this.url}/shipping-address/createOrUpdate`, data)
  }

  createOrUpdatNewsletter(data) {
    return this.http.post(`${this.url}/news-letter/createOrUpdate`, data)
  }

  uploadFile(file) {
    return this.http.post(`${this.url}/upload`, file)
  }

  myOrders() {
    return this.http.get(`${this.url}/orders/my-orders`);
  }

  pay(data) {
    return this.http.post(`${this.url}/pays`, data)
  }

  getClientSecret(data) {
    return this.http.post(`${this.url}/pays/walletIntent`, data)
  }
}
