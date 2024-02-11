import { Component, OnInit } from '@angular/core';
import { stock } from '../../types/types';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.scss'
})
export class MainDashboardComponent implements OnInit {
  stocks: stock[] // Store the stock data. Used to create the stock graph for each stock.
  stockValue = 0;
  stockSymbol = ""; 

  constructor(private stockService: StockService) {
    this.stocks = stockService.stocks; // Get the initial stock data.
  }

  ngOnInit(): void {
    // Subscribe to the stockEmitter to get the updated stock data.
    this.stockService.stockEmitter.subscribe((stocks: stock[]) => {
      this.stocks = stocks;
      console.log(this.stocks);
    });
  }

  identifyStock(index: number, stock: stock): string {
    return stock.symbol;
  }

  ngOnDestroy(): void {
    // Unsubscribe from the stockEmitter when the component is destroyed.
    this.stockService.cancelStockInterval();
  }

}
