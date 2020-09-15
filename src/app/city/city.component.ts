import { CityService } from './../city.service';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, OnInit, ViewChild, ElementRef, VERSION } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import Drilldown from 'highcharts/modules/drilldown';

Drilldown(Highcharts);
// Load the exporting module.
import Exporting from 'highcharts/modules/exporting';
// Initialize exporting module.
Exporting(Highcharts);
import { Component } from '@angular/core';
import * as  Highcharts from 'highcharts';
import { interval, Subscription } from 'rxjs';
import { stringify } from 'querystring';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})

export class CityComponent implements OnInit {
  constructor(private cityService: CityService) {}

  subscription: Subscription;
  yearall;
  cityall;
  cities;
  raw_year;
  temp;
  temp1;
  data;
  year;
  selectedy;
  public options: any ;
  options1;
  onSelectYear(y) {
    this.selectedy = null;
    this.selectedy = y;
    console.log(y);
    for(let ya of this.year){
      if(ya.name === parseInt(y)){
        this.selectedy = ya;
        break;
      }
    }
  }
  onSelectCity(y) {
    this.selectedy = null;
    this.selectedy = y;
    console.log(y);
    this.options.series[0].data = this.data.filter(city => city.name === y);
    console.log(this.options.series[0].data);
    Highcharts.chart('container1', this.options);
}
resetYear(){
  console.log(this.yearall);
  this.options1.series[0].data = this.yearall;
  Highcharts.chart('container', this.options1);
}
resetCity(){
  console.log(this.cityall);
  this.options.series[0].data = this.cityall;
  Highcharts.chart('container1', this.options);
}
  getCities(): void{
    this.cityService.getCity().subscribe(cities => {
      this.cityall = cities;
      });
  }
  // tslint:disable-next-line: typedef
  ngOnInit(){
    this.getCities();
    this.cityService.getYear().subscribe( y => {
      this.raw_year = y;
    })
    this.cityService.getYear().subscribe(
      year => {
        this.year = year;
        this.temp1 = {};
        this.temp = [];
        this.year.forEach(i => {
            this.temp1 = {};
            if (this.temp.find((x) => x.name === i.year)){
                this.temp.find((x) => x.name === i.year).data.push([i.city, i.temperature]);
                // this.temp1.data.add([this.temp1.city, this.temp1.temperature]);
            }
            else{
                // console.log(i);
                this.temp1.name = i.year;
                this.temp1.id = i.year;
                this.temp1.data = [];
                this.temp1.data.push([i.city, i.temperature]);
                this.temp.push(this.temp1);
            }
        });
        this.year.forEach(row => {
          row.name = row.year;
          row.y = row.temperature;
          row.drilldown = row.year;
          delete(row.year);
          delete(row.temperature);
          delete(row.city);
        });
        this.yearall = this.year;
        this.selectedy = this.year[0];
        console.log(this.selectedy.name);
        this.options1 = {
         chart: {
             type: 'column'
         },
         title: {
             text: 'Browser market shares. January, 2018'
         },
         subtitle: {
             text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
         },
         accessibility: {
             announceNewData: {
                 enabled: true
             }
         },
         xAxis: {
             type: 'category'
         },
         yAxis: {
             title: {
                 text: 'Total percent market share'
             }

         },
         legend: {
             enabled: false
         },
         plotOptions: {
             series: {
                 borderWidth: 0,
                 dataLabels: {
                     enabled: true,
                     format: '{point.y:.1f}%'
                 }
             }
         },

         tooltip: {
             headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
             pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
         },

         series: [
             {
                 name: 'Year',
                 colorByPoint: true,
                 data: []
             }
         ],
         drilldown: {
             series: this.temp
                 }
       };
        this.options1.series[0].data = year;
        //console.log(this.options1);
        Highcharts.chart('container', this.options1);
    });
    this.cityService.getCity().subscribe(
        res => {
         this.data = res;
         this.data.forEach(row => {
          row.y = row.temperature;
          row.drilldown = row.name;
          delete(row.temperature);
         });
         this.options = {
          chart: {
              type: 'column'
          },
          title: {
              text: 'Browser market shares. January, 2018'
          },
          subtitle: {
              text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
          },
          accessibility: {
              announceNewData: {
                  enabled: true
              }
          },
          xAxis: {
              type: 'category'
          },
          yAxis: {
              title: {
                  text: 'Total percent market share'
              }

          },
          legend: {
              enabled: false
          },
          plotOptions: {
              series: {
                  borderWidth: 0,
                  dataLabels: {
                      enabled: true,
                      format: '{point.y:.1f}%'
                  }
              }
          },

          tooltip: {
              headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
              pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
          },

          series: [
              {
                  name: 'Cities',
                  colorByPoint: true,
                  data: []
              }
          ],
          drilldown: {
              series: []
          }
        };
        this.temp1 = {};
        this.temp = [];
        this.raw_year.forEach(i => {
            this.temp1 = {};
            if (this.temp.find((x) => x.name === i.city)){
                this.temp.find((x) => x.name === i.city).data.push([i.year, i.temperature]);
                // this.temp1.data.add([this.temp1.city, this.temp1.temperature]);
            }
            else{
                // console.log(i);
                this.temp1.name = i.city;
                this.temp1.id = i.city;
                this.temp1.data = [];
                this.temp1.data.push([i.year, i.temperature]);
                this.temp.push(this.temp1);
            }
        });
        this.cityall = this.data;
         this.options.series[0].data = res;
         this.options.drilldown.series = this.temp;
         console.log(this.options);
         Highcharts.chart('container1', this.options);


        //  this.options.data = this.data;
      });

        //    },
          // error => {
          //   console.log('Something went wrong.');
          // });
    }
}
