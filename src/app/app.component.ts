import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { chartModal, HighchartService } from './highchart.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent implements OnInit {
  zoom = 12;
  maxZoomTemp = 15;
  minZoomTemp = 8;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: this.maxZoomTemp,
    minZoom: this.minZoomTemp,
  };
  title = 'Firestore-Angular-Highcharts';
  items$!: chartModal[];
  Highcharts: typeof Highcharts = Highcharts;
  chardata: any[] = [];
  chartOptions: any;

  constructor(private highchartservice: HighchartService) {}

  ngOnInit() {
    
    this.highchartservice.rates$.subscribe((assets) => {
      this.items$ = assets;
      if (this.items$) {
        this.chardata = [];
        this.items$.forEach((element) => {
          console.log(this.chardata);
          this.chardata.push(element.rate);
        });
        this.getChart();
      }
    });

    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });    
  }
  getChart() {
    this.chartOptions = {
      series: [
        {
          data: this.chardata,
        },
      ],
      chart: {
        type: 'bar',
      },
      title: {
        text: 'barchart',
      },
    };
  }
  zoomIn() {
    if (this.zoom < this.minZoomTemp) this.zoom++;
  }

  zoomOut() {
    if (this.zoom > this.maxZoomTemp) this.zoom--;
  }
}
