import * as d3 from "d3";
import { InputManager } from "../input/inputManager";
import { calculateVelocityInterval } from "../simulation";
import { calculateAngleLoopCount } from "../utils";

interface PendulumSelections {
  parentCtr: d3.Selection<d3.BaseType, unknown, HTMLElement, any> | null;
  ctr: d3.Selection<d3.BaseType, unknown, HTMLElement, any> | null;
  svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any> | null;
  rodAndBallG: d3.Selection<SVGGElement, unknown, HTMLElement, any> | null;
  centerLine: d3.Selection<SVGLineElement, unknown, HTMLElement, any> | null;
  rod: d3.Selection<SVGLineElement, unknown, HTMLElement, any> | null;
  ball: d3.Selection<SVGCircleElement, unknown, HTMLElement, any> | null;
  arc: d3.Selection<SVGPathElement, unknown, HTMLElement, any> | null;
  angleDegree: HTMLParagraphElement | null;
  velocityArrowG: d3.Selection<SVGGElement, unknown, HTMLElement, any> | null;
  arrowShaft: d3.Selection<SVGLineElement, unknown, HTMLElement, any> | null;
  arrowHead: d3.Selection<SVGPolygonElement, unknown, HTMLElement, any> | null;
}

interface PendulumSpec {
  rodLength: number;
  ballRadius: number;
}

const pendulumSelections: PendulumSelections = {
  parentCtr: null,
  ctr: null,
  svg: null,
  rodAndBallG: null,
  centerLine: null,
  rod: null,
  ball: null,
  arc: null,
  angleDegree: null,
  velocityArrowG: null,
  arrowShaft: null,
  arrowHead: null,
};

export const createPendulumVisualization = (
  inputManager: InputManager,
  canvas: HTMLCanvasElement
) => {
  definePendulumSelections();

  const {
    ctr,
    svg,
    rodAndBallG,
    centerLine,
    rod,
    ball,
    arc,
    angleDegree,
    velocityArrowG,
    arrowHead,
    arrowShaft,
  } = pendulumSelections;

  if (
    ctr &&
    svg &&
    rodAndBallG &&
    centerLine &&
    rod &&
    ball &&
    arc &&
    angleDegree &&
    velocityArrowG &&
    arrowShaft &&
    arrowHead
  ) {
    const { angle, velocity } = inputManager.states;
    const loopCount = calculateAngleLoopCount(canvas);

    const ctrWidth = (canvas.clientWidth * 0.4) / loopCount;
    const ctrHeight = ctrWidth;

    const pendulumSpec: PendulumSpec = {
      rodLength: ctrWidth * 0.4,
      ballRadius: ctrWidth * 0.03,
    };

    const rodCoord = {
      x: pendulumSpec.rodLength * Math.sin(angle),
      y: pendulumSpec.rodLength * Math.cos(angle),
    };

    svg
      .attr("viewBox", `0 0 ${ctrWidth} ${ctrHeight}`)
      .style("width", "100%")
      .style("height", "100%");

    rodAndBallG.attr(
      "transform",
      `translate(${ctrWidth / 2}, ${ctrHeight / 2})`
    );

    drawRodAndBall(pendulumSpec, rodCoord, centerLine, rod, ball);
    drawAngleAndArc(pendulumSpec, angle, arc, angleDegree);
    drawVelocityArrow(
      canvas,
      rodCoord,
      angle,
      velocity,
      velocityArrowG,
      arrowShaft,
      arrowHead
    );
  }
};

const drawVelocityArrow = (
  canvas: HTMLCanvasElement,
  rodCoord: {
    x: number;
    y: number;
  },
  angle: number,
  velocity: number,
  velocityArrowG: d3.Selection<SVGGElement, unknown, HTMLElement, any>,
  arrowShaft: d3.Selection<SVGLineElement, unknown, HTMLElement, any>,
  arrowHead: d3.Selection<SVGPolygonElement, unknown, HTMLElement, any>
) => {
  const vInterval = calculateVelocityInterval(canvas);
  const arrowScale = d3
    .scaleLinear()
    .domain([-vInterval, vInterval])
    .range([-20, 20]);

  const arrowSpec = {
    width: 1.4 * arrowScale(velocity),
    height: 1.2 * arrowScale(velocity),
    length: 5 * arrowScale(velocity),
    strokeWidth: 0.5 * Math.abs(arrowScale(velocity)),
  };

  const rotationAngle = ((Math.PI / 2 + Math.PI - angle) * 180) / Math.PI;

  const headPoints = `
        ${-arrowSpec.width / 2}, ${arrowSpec.length} 
        ${arrowSpec.width / 2}, ${arrowSpec.length} 
        0, ${arrowSpec.length + arrowSpec.height}
      `;

  velocityArrowG
    .attr(
      "transform",
      `translate(${rodCoord.x}, ${rodCoord.y}) rotate(${rotationAngle})`
    )
    .attr("class", "pendulum-velocity-arrow");

  arrowShaft
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 0)
    .attr("y2", arrowSpec.length)
    .attr("stroke-width", arrowSpec.strokeWidth);

  arrowHead.attr("points", headPoints);
};

const drawAngleAndArc = (
  pendulumSpec: PendulumSpec,
  angle: number,
  arc: d3.Selection<SVGPathElement, unknown, HTMLElement, any>,
  angleDegree: HTMLParagraphElement
) => {
  const normalizedAngle = normalizeAngle(-angle);
  const angleInDegrees = `θ = ${((-normalizedAngle * 180) / Math.PI).toFixed(
    2
  )}°`;

  const startAngle = Math.PI;
  const endAngle =
    normalizedAngle > Math.PI ? Math.PI * 2 : Math.PI + normalizedAngle;

  const radius = pendulumSpec.rodLength * 0.3;
  const strokeWidth = 1;
  const arcGenerator = d3
    .arc()
    .innerRadius(radius - strokeWidth)
    .outerRadius(radius)
    .startAngle(startAngle)
    .endAngle(endAngle);

  const d = arcGenerator({
    startAngle: Math.PI,
    endAngle:
      normalizeAngle(-angle) > Math.PI ? 0 : normalizeAngle(-angle) + Math.PI,
    innerRadius: radius - strokeWidth,
    outerRadius: radius,
  });

  angleDegree.innerText = angleInDegrees;

  arc.attr("d", d).attr("class", "pendulum-arc");
};

const normalizeAngle = (angle: number) => {
  const isNegative = angle > 0;
  let absAngle = Math.abs(angle);

  if (absAngle > Math.PI * 3) {
    absAngle = absAngle - Math.PI * 3;
  } else if (absAngle > Math.PI) {
    absAngle = absAngle - Math.PI * 1;
  } else {
    return angle;
  }

  if (absAngle > Math.PI) {
    return isNegative ? (-absAngle % Math.PI) * -1 : -absAngle % Math.PI;
  } else {
    return isNegative ? (Math.PI - absAngle) * -1 : Math.PI - absAngle;
  }
};

const drawRodAndBall = (
  pendulumSpec: PendulumSpec,
  rodCoord: {
    x: number;
    y: number;
  },
  centerLine: d3.Selection<SVGLineElement, unknown, HTMLElement, any>,
  rod: d3.Selection<SVGLineElement, unknown, HTMLElement, any>,
  ball: d3.Selection<SVGCircleElement, unknown, HTMLElement, any>
) => {
  const centerLineCoord = {
    x: pendulumSpec.rodLength * Math.sin(Math.PI * 2),
    y: pendulumSpec.rodLength * Math.cos(Math.PI * 2),
  };

  centerLine
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", centerLineCoord.x)
    .attr("y2", centerLineCoord.y)
    .attr("class", "line center-line")
    .attr("stroke", "white")
    .attr("stroke-width", 2)
    .attr("stroke-dasharray", "5,5");

  rod
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", rodCoord.x)
    .attr("y2", rodCoord.y)
    .attr("class", "line pendulum-rod")
    .attr("stroke", "white")
    .attr("stroke-width", 2);

  ball
    .attr("cx", rodCoord.x)
    .attr("cy", rodCoord.y)
    .attr("r", pendulumSpec.ballRadius)
    .attr("fill", "white")
    .attr("class", "ball");
};

const definePendulumSelections = () => {
  const {
    parentCtr,
    ctr,
    svg,
    rodAndBallG,
    centerLine,
    rod,
    ball,
    arc,
    angleDegree,
    velocityArrowG,
    arrowHead,
    arrowShaft,
  } = pendulumSelections;

  if (!parentCtr)
    pendulumSelections.parentCtr = d3.select("#visualization-container");

  if (!angleDegree)
    pendulumSelections.angleDegree = document.getElementById(
      "pendulum-angle-text"
    ) as HTMLParagraphElement;

  if (!ctr) pendulumSelections.ctr = d3.select("#pendulum-svg-container");

  if (!svg)
    pendulumSelections.svg = pendulumSelections.ctr?.append("svg") || null;

  if (!rodAndBallG)
    pendulumSelections.rodAndBallG =
      pendulumSelections.svg?.append("g") || null;

  if (!centerLine)
    pendulumSelections.centerLine =
      pendulumSelections.rodAndBallG?.append("line") || null;

  if (!rod)
    pendulumSelections.rod =
      pendulumSelections.rodAndBallG?.append("line") || null;

  if (!ball)
    pendulumSelections.ball =
      pendulumSelections.rodAndBallG?.append("circle") || null;

  if (!arc)
    pendulumSelections.arc =
      pendulumSelections.rodAndBallG?.append("path") || null;

  if (!velocityArrowG)
    pendulumSelections.velocityArrowG =
      pendulumSelections.rodAndBallG?.append("g") || null;

  if (!arrowShaft)
    pendulumSelections.arrowShaft =
      pendulumSelections.velocityArrowG?.append("line") || null;

  if (!arrowHead)
    pendulumSelections.arrowHead =
      pendulumSelections.velocityArrowG?.append("polygon") || null;
};
