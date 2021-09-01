import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../config/api.service';
import { HelpersService } from '../config/helpers.service';
import { SeoService } from '../config/seo.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-purchase-show',
  templateUrl: './purchase-show.component.html',
  styleUrls: ['./purchase-show.component.scss']
})
export class PurchaseShowComponent implements OnInit {
  slug: any;
  event: any;
  vipProducts: any;
  products: any;
  selectedTicket: any;
  video: any;
  myTicket: any;
  windowLocation: any;
  end: any;
  showMore = false;
  currencies: any;
  currentSymbol: any;
  floatRates: any;
  @ViewChild('input') input: ElementRef;
  @ViewChild('video') videoPlayer: ElementRef;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private helpers: HelpersService,
    private metaService: Meta,
    private seo: SeoService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => this.slug = data.slug);
    this.getCurrency();
    this.getFloatRates();
    this.getEvent();
    this.end = 2;
  }

  setBG() {
    document.body.style.backgroundImage = `linear-gradient(to bottom, rgba(26, 32, 48, 0.52), rgba(26, 32, 48, 1)), url(${this.event.background_image.formats.large.url})`;
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundSize = '100% 100%';
  }

  setMetaData() {
    /*
    if (this.seo) {
      this.seo.updateMetadata({
        title: `Watch ${this.event.performers[0].name} Live`,
        description: `Checkout my livestream performance via Studio On Sunset of ${
          this.event.name
        } on ${this.helpers.setEventStartDate(this.event.start)}`,
        image: `${this.event.performers[0].profile_picture.formats.small.url}`
      });
    }
    */
    this.titleService.setTitle(`Watch ${this.event.performers[0].name} Live`);
    this.metaService.addTags([
      { name: 'description', content: `Checkout my livestream performance via Studio On Sunset of ${this.event.name} on ${this.helpers.setEventStartDate(this.event.start)}` },
      { name: 'image', content: `${this.event.performers[0].profile_picture.formats.medium.url}` },
      { name: 'robots', content: 'index, follow' }
    ]);
  }


  getEvent() {
    this.api.getEvent(this.slug).subscribe(data => {
      if (data) {
        this.event = data[0];
        this.products = this.event.products;
        this.vipProducts = this.event.products.filter(
          product => product.free_with_vip === true
        );
        this.selectedTicket = this.event.tickets.find(
          ticket => ticket.type === 'basic'
        );
        this.myTicket = this.selectedTicket.id;
        this.video = this.event.performers[0].preview
          ? this.formatURL(this.event.performers[0].preview)
          : '';
        // this.setTotals();
        // this.setMetaData();
        if (this.helpers.isBrowser()) {
          this.helpers.setBG(this.event.background_image.formats.large.url, 'full');
          this.windowLocation = location.href;
          this.modalListener();
        }
        this.setMetaData();
      }
    });
  }

  setEventStartDate(date) {
    if (date) {
      return this.helpers.setEventStartDate(date);
    }
  }

  setEventDuration(start, end) {
    if (start && end) {
      return this.helpers.setEventDuration(start, end);
    }
  }

  setPremieredDate(date) {
    if (date) {
      this.helpers.getPremieredDate(date);
    }
  }

  getDate(event, date) {
    if (event && event.status === 'completed') {
      return this.helpers.getPremieredDate(date);
    } else {
      return this.helpers.setEventStartDate(date);
    }
  }

  streamingDate(event) {
    if (this.helpers.isBrowser()) {
      let p = document.createElement('p')
      if (event && new Date(event.start) <= new Date()) {
        return 'Now Streaming'
      } else if (event && event.start) {
        return `Coming to Salticorn on ${this.helpers.setEventStartDate(event.start)}`
      }
    }
  }

  copyLink() {
    if (this.helpers.isBrowser()) {
      const copyText = this.input.nativeElement;
      /* Select the text field */
      copyText.select();
      copyText.setSelectionRange(0, 99999); /* For mobile devices */
      /* Copy the text inside the text field */
      document.execCommand("copy");
      // Change text in modal
      document.getElementById('link').innerHTML = 'Copied to Clipboard!'
    }
  }

  openPreview(index: number) {
    const video = this.videoPlayer.nativeElement;
    const source = document.createElement('source');
    source.setAttribute('src', this.video);
    source.setAttribute('id', 'video-player');
    video.play();
    video.appendChild(source);
  }

  modalListener() {
    /*
    const modalEl = document.getElementById('shareModal')
    const videoModal = document.getElementById('previewModal')
    modalEl.addEventListener('hidden.bs.modal', function (event) {
      document.getElementById('link').innerHTML = 'The link will be copied to your clipboard'
    })

    videoModal.addEventListener('hidden.bs.modal', function (event) {
      const video = document.querySelector('video')
      video.pause()
    })
    */
  }

  toggleDisplay() {
    this.showMore = !this.showMore;
    this.end = this.showMore ? this.event.products.length : 2;
  }

  getCurrency(): any {
    this.api
      .getCommonCurrency()
      .subscribe(data => (this.currencies = Object.values(data)));
  }

  getRates(event) {
    const code = event.target.value;
    const selectedCurrency = this.currencies.find(
      currency => currency.code === code
    );
    const rates = this.floatRates.find(
      rate => rate.code === selectedCurrency.code
    );
    const inverseRate = rates ? rates.inverseRate : 0;
    if (inverseRate) {
      // this.cartTotal = Number((this.usdPrice / inverseRate).toFixed(2));
      this.currentSymbol = selectedCurrency.symbol;
    } else {
      // this.cartTotal = this.usdPrice;
      this.currentSymbol = selectedCurrency.symbol;
    }
  }

  getFloatRates() {
    this.api
      .getFloatRates()
      .subscribe(data => (this.floatRates = Object.values(data)));
  }

  formatURL(preview) {
    if (preview.url.includes('https')) {
      return preview.url;
    } else {
      return `https://${preview.url}`
    }
  }

}
