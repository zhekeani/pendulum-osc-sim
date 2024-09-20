import * as d3 from "d3";

export const generateBackground = (backgroundDivEl: HTMLDivElement) => {
  const width = backgroundDivEl.clientWidth;
  const height = backgroundDivEl.clientHeight;

  const aspectRatio = width / height;
  const yInterval = 3.2 / aspectRatio;
  let yGridCount = Math.floor(yInterval / 0.2) * 2;

  // Ensure horizontal grid count is even
  if (yGridCount % 2 !== 0) {
    yGridCount += 1;
  }

  const yGridSpacing = height / yGridCount;
  const xGridSpacing = width / 20;

  const majorGridInterval = 5; // Major grid every 5 lines

  // Generate grid lines
  generateGridLines(
    backgroundDivEl,
    xGridSpacing,
    yGridSpacing,
    majorGridInterval
  );

  // Generate axes aligned with grid lines
  generateAxes(
    backgroundDivEl,
    { width, height },
    { major: 20 }, // Example major tick count for x-axis
    { major: yGridCount }, // Match the yGridCount for the y-axis
    majorGridInterval
  );
};

const generateAxes = (
  container: HTMLDivElement,
  ctrDimensions: { width: number; height: number },
  xTicksCount: { major: number },
  yTicksCount: { major: number },
  majorGridInterval: number // Pass the same major grid interval used for grid lines
) => {
  const svg = d3.select(container).select("svg");

  // X-Axis Scale
  const xAxisScale = d3
    .scaleLinear()
    .domain([-xTicksCount.major / 2, xTicksCount.major / 2])
    .range([0, ctrDimensions.width]);

  // X-Axis: Place ticks on the major grid lines
  const xAxis = d3
    .axisBottom(xAxisScale)
    .ticks(xTicksCount.major / majorGridInterval) // Major ticks on grid lines
    .tickSize(4)
    .tickFormat((_d, i) => {
      const index = i - Math.floor(xTicksCount.major / 2 / majorGridInterval);
      if (index === 0) return "0";
      const absIndex = Math.abs(index);
      const sign = index < 0 ? "-" : "";
      if (absIndex === 1) return `${sign}π/2`;
      if (absIndex % 2 === 0) return `${sign}${absIndex / 2}π`;
      return `${sign}${absIndex}/2π`;
    });

  // Y-Axis Scale
  const yAxisScale = d3
    .scaleLinear()
    .domain([-yTicksCount.major / 10, yTicksCount.major / 10])
    .range([ctrDimensions.height, 0]);

  // Y-Axis: Place ticks on the major grid lines
  const yAxis = d3
    .axisLeft(yAxisScale)
    .ticks(yTicksCount.major / majorGridInterval)
    .tickSize(0);

  // Append the X-Axis to the center of the SVG, aligned with the grid lines
  svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${ctrDimensions.height / 2})`) // Center the axis vertically
    .call(xAxis)
    .selectAll(".tick text")
    .style("fill", "#fff")
    .style("font-size", "12px")
    .style("font-weight", "bold");

  // Append the Y-Axis to the center of the SVG, aligned with the grid lines
  svg
    .append("g")
    .attr("class", "y-axis")
    .attr("transform", `translate(${ctrDimensions.width / 2}, 0)`) // Center the axis horizontally
    .call(yAxis)
    .selectAll(".tick text")
    .style("fill", "#fff")
    .style("font-size", "12px")
    .style("font-weight", "bold");

  // Ensure the domain line (axis line) is visible for both axes
  svg.selectAll(".domain").style("stroke", "#fff"); // White axis lines for visibility
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

  // Calculate center positions for both axes
  const xCenter = Math.floor(width / 2);
  const yCenter = Math.floor(height / 2);

  // Remove any existing SVG element before appending a new one
  d3.select(container).select("svg").remove();

  // Append an SVG element to the container
  const svg = d3
    .select(container)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("position", "absolute")
    .style("top", "0")
    .style("left", "0")
    .style("z-index", 0); // Ensure it's below any other content

  // Generate vertical grid lines based on consistent width and spacing
  const verticalLinesCount = Math.floor(width / xGridSpacing);
  for (let i = 0; i <= verticalLinesCount; i++) {
    const xPosition = i * xGridSpacing;
    const distanceFromCenter = Math.abs(xPosition - xCenter); // Distance from center
    const isMajorGrid =
      Math.round(distanceFromCenter / xGridSpacing) % majorGridInterval === 0;

    svg
      .append("line")
      .attr("x1", xPosition)
      .attr("y1", 0)
      .attr("x2", xPosition)
      .attr("y2", height)
      .attr("stroke", gridLinesColor)
      .attr("stroke-width", isMajorGrid ? 1.2 : 0.8) // Thicker line for major grid
      .attr("stroke-opacity", isMajorGrid ? 0.9 : 0.5); // Higher opacity for major grid
  }

  // Generate horizontal grid lines based on consistent height and spacing
  const horizontalLinesCount = Math.floor(height / yGridSpacing);
  for (let j = 0; j <= horizontalLinesCount; j++) {
    const yPosition = j * yGridSpacing;
    const distanceFromCenter = Math.abs(yPosition - yCenter); // Distance from center
    const isMajorGrid =
      Math.round(distanceFromCenter / yGridSpacing) % majorGridInterval === 0;

    svg
      .append("line")
      .attr("x1", 0)
      .attr("y1", yPosition)
      .attr("x2", width)
      .attr("y2", yPosition)
      .attr("stroke", gridLinesColor)
      .attr("stroke-width", isMajorGrid ? 1.2 : 0.8) // Thicker line for major grid
      .attr("stroke-opacity", isMajorGrid ? 0.9 : 0.5); // Higher opacity for major grid
  }
};
