import { analyzeDOM } from "./domAnalyser.mjs";
import { renderBarChart } from "./d3Histogram.mjs";

const domData = analyzeDOM();

domData.sort((a, b) => b.count - a.count);

renderBarChart(domData);
