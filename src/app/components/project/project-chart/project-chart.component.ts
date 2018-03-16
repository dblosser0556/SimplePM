import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../../models';
import * as moment from 'moment';


export interface SeriesData {
  name: string;
  value: number;
}

export interface ChartData {
  name: string;
  series: SeriesData[];
}

@Component({
  selector: 'app-project-chart',
  templateUrl: './project-chart.component.html',
  styleUrls: ['./project-chart.component.css']
})
export class ProjectChartComponent implements OnInit {
  @Input() project: Project;
  single: any[];
  multi: any[];
  data: ChartData[] = [];

  view: any[] = [500, 400];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Dollars';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#CCCCCC', '#0756E4']
  };

  // line, area
  autoScale = true;
  constructor() {

  }


  ngOnInit() {
    this.convertData();
  }


  onSelect(event) {
    console.log(event);
  }

  convertData() {
    const plannedCapitalSeries = new Array();
    const actualCapitalSeries = new Array();
    const capitalBudgetSeries = new Array();
    const plannedExpenseSeries = new Array();
    const actualExpenseSeries = new Array();
    const expenseBudgetSeries = new Array();

    const plannedStartDate = moment(this.project.startDate());
    let cumPlannedCap = 0;
    let cumActualCap = 0;
    let cumPlannedExp = 0;
    let cumActualExp = 0;

    for (const month of this.project.months) {
        
        const monthName = plannedStartDate.month(month.monthNo).format('YYYY-MM');
        cumPlannedCap += month.totalPlannedCapital;
        let rowData: SeriesData = {
          name: monthName,
          value: cumPlannedCap
        };
        plannedCapitalSeries.push(rowData);

        cumActualCap += month.totalActualCapital;
        rowData = {
          name: monthName,
          value: cumActualCap
        };
        actualCapitalSeries.push(rowData);

        rowData = {
          name: monthName,
          value: 50000
        };
        capitalBudgetSeries.push(rowData);

        cumPlannedExp += month.totalPlannedExpense;
        rowData = {
          name: monthName,
          value: cumPlannedExp
        };
        plannedExpenseSeries.push(rowData);

        cumActualExp += month.totalActualExpense;
        rowData = {
          name: monthName,
          value: cumActualExp
        };
        actualExpenseSeries.push(rowData);

        rowData = {
          name: monthName,
          value: 100000
        };
        expenseBudgetSeries.push(rowData);

    }

    let chartData: ChartData = {
      name: 'Planned Capital',
      series: plannedCapitalSeries
    };
    this.data.push(chartData);

    chartData = {
      name: 'Actual Capital',
      series: actualCapitalSeries
    };
    this.data.push(chartData);

    chartData = {
      name: 'Capital Budget',
      series: expenseBudgetSeries
    };

    this.data.push(chartData);

    chartData = {
      name: 'Planned Expense',
      series: plannedExpenseSeries
    };
    this.data.push(chartData);

    chartData = {
      name: 'Actual Expense',
      series: actualExpenseSeries
    };
    this.data.push(chartData);

    chartData = {
      name: 'Expense Budget',
      series: expenseBudgetSeries
    };
    this.data.push(chartData);

    console.log(this.data);
  }
}
