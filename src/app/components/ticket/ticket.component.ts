import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HelpersService } from '../../config/helpers.service';
import { CartService } from '../../config/cart.service';
import { PurchaseShowComponent } from 'src/app/purchase-show/purchase-show.component';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit, OnChanges {
  @Input() tickets: any;
  @Input() event: any;
  public ticket: any;
  public vipItems: any;
  public price: any;
  public merchItems: any;
  ticketSelected: any;
  constructor(
    private helpers: HelpersService,
    private cartService: CartService,
    private showComponent: PurchaseShowComponent
  ) { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    this.ticket = changes.tickets.currentValue.find(ticket => ticket.type === 'basic');
    this.vipItems = changes.event.currentValue.products.filter(product => product.free_with_vip === true);
    this.event = changes.event.currentValue;
    this.merchItems = this.event.products;
    if (this.helpers.isBrowser()) {
      this.cartService.setTicket(this.ticket)
    }
  }

  setMeetGreet(event) {
    if (event.target.checked) {
      this.cartService.addMeetGreet(this.event)
    } else {
      this.cartService.removeMeetGreet(this.event)
    }
    this.showComponent.setTotals(this.cartService.getTotals())
  }
}
