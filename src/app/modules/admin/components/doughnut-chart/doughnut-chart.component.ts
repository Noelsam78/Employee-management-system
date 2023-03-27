import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import * as d3 from 'd3';
@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent {
  width = 300;
   height = 300;
   radius = Math.min(this.width, this.height) / 2;
   
   private arc: any;
   private pie: any;
   private color: any;
   private svg: any;
   private donut: any;
   private text: any;

   constructor(private api:ApiService){}

   createSvg(){
    this.svg = d3
    .select("#donut")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr("transform", `translate(${this.width / 2},${this.height / 2})`);
    
      this.arc = d3.arc()
                 .outerRadius(this.radius - 10)
                 .innerRadius(this.radius - 100);
   
   // Create the pie generator
    this.pie = d3.pie().value((d:any) => d.value);
  }

  drawChart(data:any){
  
    // Create the color scale
   
   this.color = d3
   .scaleOrdinal()
   .domain(data.map((d:any) => d.name))
   .range([ "#3f51b5", "#e91e63"]);

 // Create the arc generator

    this.donut = this.svg
  .selectAll("path")
  .data(this.pie(data))
  .enter()
  .append("path")
  .attr("d", this.arc)
  .attr("fill", (d:any) => this.color(d.data.name));

// Add labels to the chart
 this.text = this.svg
  .selectAll("text")
  .data(this.pie(data))
  .enter()
  .append("text")
  .attr("text-anchor", "middle") 
  .attr("x", 0)
  .attr("y", 0)
  .attr("fill", "white")
  .text((d:any) => d.data.value)
  .attr("transform", (d:any) => `translate(${this.arc.centroid(d)})`);
  }

   ngOnInit() :void{
    this.createSvg();
    type ChartDataType ={
      status: string
    }
    let active = 0;
    let inActive = 0;
    this.api.getEmployeeDetails().subscribe(data=> {
      let chartData = data as ChartDataType[];
      let Data:any = [
        { name: "Active", value: 0},
        { name: "Inactive", value: 0},
      ];
      for(var i = 0; i<chartData.length; i++){
    
        if(chartData[i].status === 'active'){
           active+=1;
        }else{
          inActive += 1;
         
        }
      }  
      Data[0].value = active;
      Data[1].value = inActive;
      this.drawChart(Data);
     })
    
   }

}
