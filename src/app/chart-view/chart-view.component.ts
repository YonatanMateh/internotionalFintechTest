import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { StatisticsService } from '../statistics.service';
import { Student } from '../models/student';
/*
this component creates the students/courses chart

*/

@Component({
  selector: 'chart-view',
  templateUrl: './chart-view.component.html',
  styleUrls: ['./chart-view.component.css']
})
export class ChartViewComponent implements OnInit {

  private studentsChart: Chart;
  private coursesChart: Chart;

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit() {
    this.initChart();
    //listener for when the students or courses lists are chnged 
    this.statisticsService.selectedStudents.subscribe(data => {
      this.updateChart(data);
    });

    this.statisticsService.selectedCourses.subscribe(data => {
      this.updateChart(data);
    })
  }

  //initialization of the charts
  private initChart(): void {
    this.studentsChart = this.createChart('student-chart', 'Students avarege');
    this.coursesChart = this.createChart('courses-chart', 'Courses avarege')
  }

  private createChart(id: string, title: string): Chart {
    const chart = new Chart(id, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          backgroundColor: "#3e95cd",
          data: []
        }]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: title
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
    return chart;
  }
 
  private updateChart(data) {
    if (data) {
      this.studentsChart.data.labels = data.students;
      this.studentsChart.data.datasets[0].data = data.studentsAverage;
      this.studentsChart.update();

      this.coursesChart.data.labels = data.courses;
      this.coursesChart.data.datasets[0].data = data.coursesAverage;
      this.coursesChart.update();
    }
  }
}
