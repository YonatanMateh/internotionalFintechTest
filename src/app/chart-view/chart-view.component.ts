import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { calculateStudentsAvarge } from '../averageCalculation';
import { Chart } from 'chart.js';
import { StatisticsService } from '../statistics.service';
import { Student } from '../models/student';
@Component({
  selector: 'chart-view',
  templateUrl: './chart-view.component.html',
  styleUrls: ['./chart-view.component.css']
})
export class ChartViewComponent implements OnInit {
  test = [];
  chart: Chart;
  /*
  @Input() set students(a) {
    //console.log('a',a);
    // this.chart.labels.push = a[0];
    // this.chart.update();
     this.updateChart(a, this.courses)
  };
  @Input() set courses(b) {
    //console.log('b',b);
    this.updateChart(this.students, b)
  }
  
updateChart(students, courses) {
  console.log('students ', students, 'courses', courses);
  this.addChart(students);
}
*/
  constructor(private statisticsService: StatisticsService) {
  }


  // ngOnChanges(changes) {
  //       console.log('changes ', changes);
  // }
  addChart(students, avareges) {
    console.log('chart ', students, avareges);
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: students,//["Africa", "Asia", "Europe", "Latin America", "North America"],
        datasets: [
          {
            backgroundColor: "#3e95cd",//["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
            data: avareges//[2478, 5267, 734, 784, 433]
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Students avarege'
        },
        scales: {
          yAxes: [{
            display: true,
            ticks: {
              stepSize: 10,
              max: 100,
              min: 0
            }
          }]
        }
      }
    });
  }

  ngOnInit() {
    this.addChart([], []);
    this.statisticsService.selectedStudents.subscribe(data => {
      console.log('students from service', data);
      if (data) {
        this.chart.data.labels = data.students;
         this.chart.data.datasets[0].data = data.averages;
       // this.chart.data.backgroundColor= ["#3e95cd"];
      //   this.chart.data.datasets.forEach((dataset) => {
      //     dataset.data.push(data);
      // });
        // this.chart.options.title.text = "22222222"
        this.chart.update();
        // this.addChart(data.students, data.averages);
      }
    });

    this.statisticsService.selectedCourses.subscribe(data => {
     console.log("from service: ", data);
     if (data) {
      this.chart.data.labels = data.students;
       this.chart.data.datasets[0].data = data.averages;
     // this.chart.data.backgroundColor= ["#3e95cd"];
    //   this.chart.data.datasets.forEach((dataset) => {
    //     dataset.data.push(data);
    // });
      // this.chart.options.title.text = "22222222"
      this.chart.update();
      // this.addChart(data.students, data.averages);
    }
    })
    // console.log(this.students);
  }
}
