import * as d3 from "d3";
import { useEffect, useRef } from "react";

export default function Wheel({ nameList }) {
  const domRef = useRef();

  useEffect(() => {
    d3.select(domRef.current).selectAll("*").remove();
    let padding = { top: 20, right: 20, bottom: 20, left: 20 },
      w = 750 - padding.left - padding.right,
      h = 750 - padding.top - padding.bottom,
      rotation = 0,
      oldrotation = 0,
      r = 330,
      picked = 100000,
      color = d3.scaleOrdinal().range(["#0000fb", "white"]);
    const svg = d3
      .select("#chart")
      .append("svg")
      .data([nameList])
      .attr("width", w + padding.left + padding.right)
      .attr("height", h + padding.top + padding.bottom);
    const container = svg
      .append("g")
      .attr(
        "transform",
        "translate(" +
        (w / 2 + padding.left) +
        "," +
        (h / 2 + padding.top) +
        ")",
      );

    container
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 367.5)
      .style("stroke", "white")
      .style("stroke-width", "2px")
      .style('fill', 'rgba(0, 14, 137, 1)');

    container
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 331.5)
      .style("stroke", "white")
      .style("stroke-width", "2px")

    const vis = container.append("g");

    const pie = d3.pie().value(1);

    const arc = d3.arc().outerRadius(r).innerRadius(0);

    const arcs = vis
      .selectAll("g.slice")
      .data(pie(nameList))
      .enter()
      .append("g")
      .classed("arc", true);

    arcs
      .append("path")
      .attr("d", (d) => arc(d))
      .attr("fill", function (d, i) {
        return color(i);
      });
    arcs
      .append("text")
      .attr("transform", function (d) {
        d.innerRadius = 0;
        d.outerRadius = r;
        d.angle = (d.startAngle + d.endAngle) / 2;
        return (
          "rotate(" +
          ((d.angle * 180) / Math.PI - 90) +
          ")translate(" +
          (d.outerRadius - 50) +
          ")"
        );
      })
      .attr("text-anchor", "end")
      .attr("font-size", "25px")
      .attr("dy", "7")
      .attr("fill", function (d, i) {
        return color(i + 1);
      })
      .text(function (d, i) {
        return nameList[i];
      });

    arcs
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 5)
      .attr("transform", function (d) {
        d.innerRadius = 0;
        d.outerRadius = r;
        d.angle = (d.startAngle + d.endAngle) / 2;
        return (
          "rotate(" +
          ((d.angle * 180) / Math.PI - 90) +
          ")translate(" +
          (d.outerRadius - 20) +
          ")"
        );
      })
      .attr("fill", function (d, i) {
        return color(i + 1);
      });

    container.on("click", spin);

    function spin(d) {
      container.on("click", null);
      oldrotation = rotation;
      let ps = 360 / nameList.length,
        pieslice = Math.round(1440 / nameList.length),
        rng = Math.floor(Math.random() * 1440 + 360);

      rotation = Math.round(rng / ps) * ps;

      picked = Math.round(nameList.length - (rotation % 360) / ps);
      picked = picked >= nameList.length ? picked % nameList.length : picked;

      rotation += 90 - Math.round(ps / 2);
      vis.transition().duration(3000).attrTween("transform", rotTween);
      container.on("click", spin);
    }
    //draw spin circle
    const colors = ["#8f6b29", "#fde08d", "#df9f28"];

    const grad = svg.append('defs')
      .append('linearGradient')
      .attr('id', 'grad')
      .attr('x1', '0%')
      .attr('x2', '0%')
      .attr('y1', '0%')
      .attr('y2', '100%');

    grad.selectAll('stop')
      .data(colors)
      .enter()
      .append('stop')
      .style('stop-color', function (d) { return d; })
      .attr('offset', function (d, i) {
        return 100 * (i / (colors.length - 1)) + '%';
      })

    container
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 60)
      .style('fill', '#0000fb');

    container
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 40)
      .style('stroke', 'rgba(20, 25, 63, 1)')
      .style("stroke-width", "2px")
      .style('fill', 'url(#grad)');

    container
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 30)
      .style('stroke', '#8f6b29')
      .style("stroke-width", "3px")
      .style('fill', 'url(#grad)');

    //make arrow
    svg
      .append("g")
      .attr(
        "transform",
        "translate(" +
        (w + padding.left + padding.right) +
        "," +
        (h / 2 + padding.top) +
        ")",
      )
      .append("path")
      .attr("d", "M-" + r * 0.25 + ",0L0," + r * 0.05 + "L0,-" + r * 0.05 + "Z")
      .style('stroke', 'rgba(20, 25, 63, 1)')
      .style("stroke-width", "2px")
      .style('fill', 'url(#grad)');

    function rotTween() {
      let i = d3.interpolate(oldrotation % 360, rotation);
      return function (t) {
        return `rotate(${i(t)})`;
      };
    }
  }, [nameList]);

  return (
    <div>
      <div className="wheelHolder">
        <div id="chart" ref={domRef}></div>
      </div>
    </div>
  );
}