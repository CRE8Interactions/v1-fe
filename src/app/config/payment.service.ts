import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { loadStripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  public stripe: any;
  public elements: any;
  public card: any;

  constructor() {
    this.getStripeToken()
  }

  // Loads stripe and elements
  async getStripeToken() {
    this.stripe = await loadStripe(environment.stripeKey);
    this.elements = await this.stripe.elements();
    const style = {
      base: {
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
        fontSize: '20px',
        fontSmoothing: 'antialiased',
        '::placeholder': {
          color: 'internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133))'
        }
      },
      invalid: {
        fontFamily: 'Arial, sans-serif',
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };
    this.card = await this.elements.create("card", { style });
  }

}
