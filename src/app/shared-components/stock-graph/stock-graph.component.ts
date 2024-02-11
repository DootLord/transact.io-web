import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-stock-graph',
  templateUrl: './stock-graph.component.html',
  styleUrl: './stock-graph.component.scss'
})
export class StockGraphComponent implements OnInit {
  @Input() stockSymbol: string = ""; // Symbol of the stock
  @Input() stockValue: number = 0;  // Value of the stock
  @Input() stockLabel: string = ""; // Label for the stock
  @ViewChild('MyChart') myChart!: ElementRef; // Reference to the chart canvas
  stockData: { value: number, label: string }[] = []; // Store the stock data.
  chart: any;

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log(this.stockSymbol, this.stockValue, this.stockLabel);
  }

  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {
    const ctx = (<HTMLCanvasElement>this.myChart.nativeElement).getContext('2d');
    if (!ctx) {
      console.error("Could not create chart context")
      return;
    }

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: this.stockSymbol,
          data: [],
          borderWidth: 2
        }]
      }
    });

    console.log(this.chart.config.data.datasets[0]);

    console.log(this.chart.datasets);

  }

  // Handle changes to the stockSymbol and stockValue inputs
  ngOnChanges(changes: SimpleChanges): void {

    for (const propName in changes) {
      if (changes[propName].firstChange === true) {
        console.log("First Changes Detected");
        return
      }
    }
    console.log("Further changes Detected!");
    console.log(this.stockSymbol, this.stockValue, this.stockLabel);
    this.chart.config.data.datasets[0].data.push(this.stockValue);
    this.chart.data.labels.push(this.stockLabel);
    this.chart.update();
  }

}
