import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer, DOCUMENT } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { TokenService } from './token.service';
import * as countries from './countries.json';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {
  public days: number;
  public minutes: number;
  public hours: number;
  public seconds: number;
  interval: any;
  countries: any = (countries as any).default;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(Location) private location: Location,
    private tokenService: TokenService
  ) { }

  goBack() {
    this.location.back()
  }

  doc() {
    return this.document;
  }

  isBrowser() {
    return isPlatformBrowser(this.platformId);
  }

  setInvoiceDate(date) {
    if (date) {
      return `${moment(date).format('MM/DD/YYYY')}`
    }
  }

  setEventStartDate(date) {
    if (date) {
      return `${moment(date).format('MMM DD')}`
    }
  }
  setEventStartTime(date) {
    if (date) {
      return `${moment(date).format('h:mma')} EDT`
    }
  }

  setEventDuration(start, end) {
    if (start && end) {
      const s = moment(start)
      const e = moment(end)
      // removed hours since no show will be longer than 60min
      // const hours = e.diff(s, 'hours', true).toFixed(1).split('.')[0];
      const minutes = e.diff(s, 'minutes', true)
      return `${minutes}min`
    }
  }

  getDaysUntil(start, end) {
    if (start && end) {
      const s = moment(start)
      const current = moment().startOf('day');
      return `${moment.duration(s.diff(current)).asDays().toFixed(1).split('.')[0]} Days`;
    }
  }

  getEventDay(date) {
    if (date) {
      return moment(date).format('DD')
    }
  }

  getEventMonth(date) {
    if (date) {
      return moment(date).format('MMM')
    }
  }

  getPremieredDate(date) {
    if (date) {
      return moment(date).format('DD MMM, YYYY')
    }
  }

  getCountries() {
    return this.countries;
  }

  startCountDown(startDate) {
    this.interval = setInterval(() => {
      this.getFullCountDown(startDate);
    }, 1000);

    const start = new Date(startDate).getTime();
    const now = new Date().getTime();
    if (startDate <= now) {
      clearInterval(this.interval);
    }
  }

  getFullCountDown(startDate) {
    if (startDate) {
      const now = new Date().getTime();
      const start = new Date(startDate).getTime();
      const distance = start - now;
      if (distance) {
        // Time calculations for days, hours, minutes and seconds
        this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
      }
      return `${this.days}D, ${this.hours}H, ${this.minutes}M, ${this.seconds}S`;
    }
  }

  textTruncate(str, length, ending) {
    if (length == null) {
      length = 100;
    }
    if (ending == null) {
      ending = '...';
    }
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
    } else {
      return str;
    }
  }

  getImageCDNPath(path) {
    return path;
  }

  defaultBG(path) {
    if (path !== '/') {
      document.body.style.backgroundImage = ``;
      document.body.style.backgroundRepeat = '';
      document.body.style.backgroundSize = '';
    }
  }

  setBG(url = 'none', type = 'none') {
    const height = type === 'full' ? '100% 100%' : '100vw 549px'
    if (url === 'none') {
      document.body.style.backgroundImage = ``;
      document.body.style.backgroundRepeat = '';
      document.body.style.backgroundSize = '';
    } else {
      if (type === 'artist-profile') {
        document.body.style.backgroundImage = `linear-gradient(to bottom, rgba(26, 32, 48, 0.52), rgba(26, 32, 48, 1)), url(${url})`;
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundSize = '100vw 511px';
      } else {
        document.body.style.backgroundImage = `linear-gradient(to bottom, rgba(26, 32, 48, 0.52), rgba(26, 32, 48, 1)), url(${url})`;
        document.body.style.backgroundAttachment = 'fixed';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundSize = height;
      }
    }
  }

  maskTicketName(type) {
    if (type === 'basic') {
      return `Basic Stream`;
    } else {
      return `VIP Stream`;
    }
  }

  currentUser() {
    return this.tokenService.getUser();
  }

  logout() {
    this.tokenService.signOut();
    if (this.isBrowser()) {
      window.location.reload()
    }
  }

  toTop() {
    if (this.isBrowser()) {
      scroll(0, 0)
    }
  }

  // removed setHeader and added to profile ts file
  //setHeader() {
  //   const path = location.pathname.split('/')[3];
  //   if (path === 'personal-details' || path === 'login-security' || path === 'invoices' || path === 'address' || path === 'newsletter') {
  //     this.document.getElementById('my-profile-heading').classList.add('d-none')
  //   } else if (path === 'my-profile') {
  //     this.document.getElementById('my-profile-heading').classList.remove('d-none')
  //   }
  // }

}
