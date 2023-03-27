import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit{
  private svg: any;
  private margin = 70;
  private width = 350 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  constructor(private api:ApiService){}

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(110,60)");
    
}
private drawBars(data: any[]): void {
  // Create the X-axis band scale
  
  const x = d3.scaleBand()
  .range([0, this.width])
  .domain(data.map(d => d.first_name))
  .padding(0.3);

  // Draw the X-axis on the DOM
  this.svg.append("g")
  .attr("transform", "translate(0," + this.height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .style("font-size", "14")
  .attr("transform", "translate(-10,0)rotate(-45)")
  .style("text-anchor", "end");

  

  // Create the Y-axis band scale
  const y = d3.scaleLinear()
  .domain([0, 16])
  .range([this.height, 0]);

  // Draw the Y-axis on the DOM
  this.svg.append("g")
  .style("font-size", "12")
  .call(d3.axisLeft(y));

  // Create and fill the bars
  this.svg.selectAll("bars")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", (d: any) => x(d.first_name))
  .attr("y", (d: any) => y(d.leaves))
  .attr("width", x.bandwidth())
 
  .attr("height", (d: any) => this.height - y(d.leaves))
  .style('fill', (d:any, i:any) => `hsl(${i * 30}, 70%, 50%)`);

}
  ngOnInit(): void {
    this.createSvg();
  type ChartDataType ={
    first_name: string,
    leaves: number
  }
  this.api.getEmployeeDetails().subscribe(data=> {
    const chartData = data as ChartDataType[];
    this.drawBars(chartData);
  })
  }
}
