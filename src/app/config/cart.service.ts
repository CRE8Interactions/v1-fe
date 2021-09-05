import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private ticketPrice: any;
  private meetGreetPrice: any;
  public serviceFee: number;
  public totalDue: number;
  public subTotal: number;
  public ticket: any;
  public event: any;

  constructor() {
    this.clearCart()
  }

  setTicket(ticket) {
    sessionStorage.setItem('ticket', JSON.stringify(ticket))
    this.getTotals()
  }

  addMeetGreet(event) {
    sessionStorage.setItem('event', JSON.stringify(event))
    this.getTotals()
  }

  removeMeetGreet(event) {
    sessionStorage.removeItem('event')
    this.getTotals()
  }

  clearCart() {
    sessionStorage.removeItem('ticket')
    sessionStorage.removeItem('event')
  }

  getTotals() {
    let ticket = sessionStorage.getItem('ticket')
    if (ticket) {
      ticket = JSON.parse(ticket)
      this.ticket = ticket
    }
    this.ticketPrice = ticket['price']
    let meetGreet = sessionStorage.getItem('event')
    if (meetGreet) meetGreet = JSON.parse(meetGreet)
    if (meetGreet) {
      this.meetGreetPrice = meetGreet['meetGreetPrice']
      this.event = meetGreet;
    } else {
      this.meetGreetPrice = 0
      this.event = '';
    }
    this.serviceFee = (this.meetGreetPrice + this.ticketPrice) * .10
    this.totalDue = this.ticketPrice + this.serviceFee + this.meetGreetPrice
    this.subTotal = this.meetGreetPrice + this.ticketPrice
    sessionStorage.setItem('cart', JSON.stringify(this))
    return this
  }
}
