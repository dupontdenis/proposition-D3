import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

export function renderBarChart(data) {
  const width = 600;
  const barHeight = 25;

  const margin = {
    top: 20,
    right: 120,
    bottom: 20,
    left: 80,
  };

  const height = data.length * barHeight + margin.top + margin.bottom;

  let chartContainer = d3.select("#chart");

  if (chartContainer.empty()) {
    chartContainer = d3.select("body").append("div").attr("id", "chart");
  } else {
    chartContainer.select("svg").remove();
  }

  const svg = chartContainer
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const maxCount = d3.max(data, (d) => d.count) ?? 0;

  const xScale = d3
    .scaleLinear()
    .domain([0, maxCount])
    .range([0, width - margin.left - margin.right]);

  const yScale = d3
    .scaleBand()
    .domain(data.map((d) => d.tag))
    .range([margin.top, height - margin.bottom])
    .padding(0.2);

  // Échelle de couleur
  // const colorScale = d3
  //   .scaleSequential()
  //   .domain([1, 12])
  //   .interpolator(d3.interpolateViridis);
  const colorScale = d3
    .scaleLinear()
    .domain([1, maxCount])
    .range(["#60a5fa", "#7c3aed"])
    .interpolate(d3.interpolateHcl);

  console.table(
    data.map((d) => ({
      tag: d.tag,
      count: d.count,
      color: colorScale(d.count),
    })),
  );

  const g = svg.append("g").attr("transform", `translate(${margin.left}, 0)`);

  // ─────────────────────────────
  // BARRES
  // ─────────────────────────────

  g.selectAll("rect")
    .data(data)
    .join("rect")
    .attr("y", (d) => yScale(d.tag))
    .attr("x", 0)
    .attr("width", (d) => xScale(d.count))
    .attr("height", yScale.bandwidth())
    .attr("fill", (d) => colorScale(d.count));

  // ─────────────────────────────
  // NOM DES TAGS
  // ─────────────────────────────

  g.selectAll(".tag-label")
    .data(data)
    .join("text")
    .attr("class", "tag-label")
    .attr("x", -10)
    .attr("y", (d) => yScale(d.tag) + yScale.bandwidth() / 2)
    .attr("text-anchor", "end")
    .attr("dominant-baseline", "middle")
    .text((d) => d.tag);

  // ─────────────────────────────
  // VALEUR
  // ─────────────────────────────

  g.selectAll(".value-label")
    .data(data)
    .join("text")
    .attr("class", "value-label")
    .attr("x", (d) => xScale(d.count) + 8)
    .attr("y", (d) => yScale(d.tag) + yScale.bandwidth() / 2)
    .attr("dominant-baseline", "middle")
    .text((d) => d.count);
}
