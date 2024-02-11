import { EventEmitter, HostListener, Injectable, NgZone } from '@angular/core';
import { stock } from '../types/types';

@Injectable({
  providedIn: 'root'
})

export class StockService {
  stockEmitter: EventEmitter<stock[]> = new EventEmitter();
  stocks: stock[];
  stockInterval!: NodeJS.Timeout;

  constructor(private ngZone: NgZone) {
    this.stocks = this.getStocks();
    // Needs to run outside angular or page will never render.
    this.ngZone.runOutsideAngular(() => {
      this.stockInterval = setInterval(() => {
        this.stocks = this.getStocks();
        this.handleStockUpdate();
      }, 1000);
    });

  };

  getStocks(): stock[] {
    return [
      { symbol: 'AAPL', price: (Math.random() * 1000) },
      { symbol: 'FARD', price: (Math.random() * 1000) }
    ];
  }

  cancelStockInterval() {
    clearInterval(this.stockInterval);
  }

  handleStockUpdate() {
    this.stockEmitter.emit(this.stocks);
  }
}
