import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import * as d3 from 'd3';
import { transition } from 'd3';

@Component({
  selector: 'app-guage-chart',
  templateUrl: './guage-chart.component.html',
  styleUrls: ['./guage-chart.component.scss']
})
export class GuageChartComponent implements OnInit{

// Set up the gauge chart variables
minAngle = -90;
maxAngle = 90;
range = this.maxAngle - this.minAngle;
arc:any;
grayArc:any;
width = 400;
height = 400;
label:any;
  constructor(private api:ApiService){}

  createGuage(value:number, total:number){
    const svg = d3.select("#guage")
  .append("svg")
  .attr("width", this.width)
  .attr("height", this.height);

  // Set up the arc function
this.arc = d3.arc()
.innerRadius(110)
.outerRadius(150)
.startAngle(this.minAngle * (Math.PI / 180))
.endAngle(((value / total) * this.range + this.minAngle) * (Math.PI / 180));

// Draw the gauge chart
     svg.append("path")
        .attr("transform","translate(200,200)")
        .attr("d",this.arc)
        .style('fill','hsl(152, 50%, 50%)')

     // Set up the gray arc
this.grayArc = d3.arc()
.innerRadius(110)
.outerRadius(150)
.startAngle(((value / total) * this.range + this.minAngle) * (Math.PI / 180))
.endAngle(this.maxAngle * (Math.PI / 180));

// Draw the gray arc
svg.append("path")
.attr("transform", "translate(200, 200)")
.attr("d", this.grayArc)
.attr("fill",'lightgray');


// Set up the label
this.label = svg.append("text")
  .attr("x", 200)
  .attr("y", 80)
  .attr("text-anchor", "middle")
  .text(value + " Hours");

  this.label.style("font-size", "24px")
  .style("font-weight", "bold")
  .style("fill", "#000");

// Set up the label
const details = svg.append("text")
  .attr("x", 200)
  .attr("y", 250)
  .attr("text-anchor", "middle")
  .text(total + " Work hours/Month");

// Set up the label style
details.style("font-size", "18px")
  .style("font-weight", "bold")
  .style("fill", "#fff");

  const needleLength = 110;
const needleValue = (value / total) * this.maxAngle + this.minAngle;
const needleRadians = needleValue * Math.PI / 180;
const needleX = 200 + needleLength * Math.cos(needleRadians);
const needleY = 200 + needleLength * Math.sin(needleRadians);
const needle = svg.append("line")
  .attr("x1", 200)
  .attr("y1", 200)
  .attr("x2", needleX)
  .attr("y2", needleY)
  .attr("stroke-width", 4)
  .attr("stroke", "#61B5B8");
// Set up the needle style
needle.style("transform-origin", "center")
  .style("transform", `rotate(${needleValue}deg)`);

var circle = svg.append("circle")
.attr("cx",200)
.attr("cy",200)
.attr("r", 5)
.attr("fill", "#F96262")

  }   


  ngOnInit(): void {
    type ChartDataType ={
      productive_hours:number;
    }
    let productive_hours = 0;
    let total_hours = 200;
    this.api.getEmployeeDetails().subscribe(data=> {
      const chartData = data as ChartDataType[];
      for(let i=0; i<chartData.length; i++){
        productive_hours += chartData[i].productive_hours;
      }
       total_hours *= chartData.length;
      this.createGuage(productive_hours,total_hours);
     })
     
  }
}
