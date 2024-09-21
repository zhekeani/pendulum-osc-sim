import * as d3 from "d3";
import { calculateVelocityInterval } from "../simulation";
import { calculateAngleLoopCount } from "../utils";

export const generateBackground = (
  backgroundDivEl: HTMLDivElement,
  canvas: HTMLCanvasElement
) => {
  const loopCount = calculateAngleLoopCount(canvas);
  const width = backgroundDivEl.clientWidth;
  const height = backgroundDivEl.clientHeight;

  const yInterval = calculateVelocityInterval(canvas);
  let yGridCount = Math.floor(yInterval / 0.2);
  const xGridCount = 20 * loopCount;
  const majorGridInterval = 5;

  if (yGridCount % 2 !== 0) {
    yGridCount += 1;
  }

  const yGridSpacing = height / yGridCount;
  const xGridSpacing = width / xGridCount;

  generateGridLines(
    backgroundDivEl,
    xGridSpacing,
    yGridSpacing,
    majorGridInterval
  );

  generateAxes(
    loopCount,
    backgroundDivEl,
    { width, height },
    majorGridInterval,
    xGridCount,
    yGridCount
  );
};

const generateAxes = (
  loopCount: number,
  container: HTMLDivElement,
  ctrDimensions: { width: number; height: number },
  majorGridInterval: number,
  xGridCount: number,
  yGridCount: number
) => {
  const svg = d3.select(container).select("svg");
  const { width, height } = ctrDimensions;
  const xTicksCount = xGridCount / majorGridInterval;
  const yTicksCount = yGridCount / majorGridInterval;

  const xAxisScale = d3
    .scaleLinear()
    .domain([-xGridCount / 2, xGridCount / 2])
    .range([0, width]);

  const xAxis = d3
    .axisBottom(xAxisScale)
    .ticks(xTicksCount)
    .tickSize(4)
    .tickFormat((_d, i) => {
      const index = i / 2 - 1;
      return `${index}π`;
    });

  const yAxisScale = d3
    .scaleLinear()
    .domain([-yTicksCount / 2, yTicksCount / 2])
    .range([height, 0]);

  const yAxis = d3.axisLeft(yAxisScale).ticks(yTicksCount).tickSize(0);

  svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${ctrDimensions.height / 2})`)
    .call(xAxis)
    .selectAll(".tick text")
    .style("fill", "#fff")
    .style("font-size", "12px")
    .style("font-weight", "bold");

  const ticks = svg.selectAll(".x-axis .tick text");

  ticks
    .filter((_, i) => i === 0)
    .attr("dx", "10px")
    .style("text-anchor", "start");

  ticks
    .filter((_, i, nodes) => i === nodes.length - 1)
    .attr("dx", "-10px")
    .style("text-anchor", "end");

  const yAxisSpacing = ctrDimensions.width / loopCount;

  for (let i = 0; i < loopCount; i++) {
    const xPos = yAxisSpacing * i;

    svg
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${xPos + yAxisSpacing / 2}, 0)`)
      .call(yAxis)
      .selectAll(".tick text")
      .style("fill", "#fff")
      .style("font-size", "12px")
      .style("font-weight", "bold");
  }
  svg.selectAll(".domain").style("stroke", "#fff");
};

const generateGridLines = (
  container: HTMLDivElement,
  xGridSpacing: number,
  yGridSpacing: number,
  majorGridInterval: number
) => {
  const width = container.clientWidth;
  const height = container.clientHeight;

  const gridLinesColor = "#62aeba";

  const xCenter = Math.floor(width / 2);
  const yCenter = Math.floor(height / 2);

  d3.select(container).select("svg").remove();

  const svg = d3
    .select(container)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("position", "absolute")
    .style("top", "0")
    .style("left", "0")
    .style("z-index", 0);

  const verticalLinesCount = Math.floor(width / xGridSpacing);
  for (let i = 0; i <= verticalLinesCount; i++) {
    const xPosition = i * xGridSpacing;
    const distanceFromCenter = Math.abs(xPosition - xCenter);
    const isMajorGrid =
      Math.round(distanceFromCenter / xGridSpacing) % majorGridInterval === 0;

    svg
      .append("line")
      .attr("x1", xPosition)
      .attr("y1", 0)
      .attr("x2", xPosition)
      .attr("y2", height)
      .attr("stroke", gridLinesColor)
      .attr("stroke-width", isMajorGrid ? 1.2 : 0.8)
      .attr("stroke-opacity", isMajorGrid ? 0.9 : 0.5);
  }

  const horizontalLinesCount = Math.floor(height / yGridSpacing);
  for (let j = 0; j <= horizontalLinesCount; j++) {
    const yPosition = j * yGridSpacing;
    const distanceFromCenter = Math.abs(yPosition - yCenter);
    const isMajorGrid =
      Math.round(distanceFromCenter / yGridSpacing) % majorGridInterval === 0;

    svg
      .append("line")
      .attr("x1", 0)
      .attr("y1", yPosition)
      .attr("x2", width)
      .attr("y2", yPosition)
      .attr("stroke", gridLinesColor)
      .attr("stroke-width", isMajorGrid ? 1.2 : 0.8)
      .attr("stroke-opacity", isMajorGrid ? 0.9 : 0.5);
  }
};
