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
      r = 310,
      picked = 100000,
      color = d3.scaleOrdinal().range(["#E81416", "#FFA500", "#FAEB36", "#79C314", "#487DE7", "#4B369D", "#70369D", "black"]);
    const svg = d3
      .select("#chart")
      .append("svg")
      .data([nameList])
      .attr("width", '100%')
      .attr("height", '100%')
      .attr("viewBox", `0 0 ${w + padding.left + padding.right} ${h + padding.top + padding.bottom}`);
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

    //set gold gradient colors

    const goldColors = ["#8f6b29", "#fde08d", "#df9f28"];

    const grad1 = svg.append('defs')
      .append('linearGradient')
      .attr('id', 'grad1')
      .attr('x1', '0%')
      .attr('x2', '0%')
      .attr('y1', '0%')
      .attr('y2', '100%');

    grad1.selectAll('stop')
      .data(goldColors)
      .enter()
      .append('stop')
      .style('stop-color', function (d) { return d; })
      .attr('offset', function (d, i) {
        return 100 * (i / (goldColors.length - 1)) + '%';
      })

    const goldColors2 = ["#20185b", "#1a03fc", "#20185b"];

    const grad2 = svg.append('defs')
      .append('linearGradient')
      .attr('id', 'grad2')
      .attr('x1', '0%')
      .attr('x2', '0%')
      .attr('y1', '0%')
      .attr('y2', '100%');

    grad2.selectAll('stop')
      .data(goldColors2)
      .enter()
      .append('stop')
      .style('stop-color', function (d) { return d; })
      .attr('offset', function (d, i) {
        return 100 * (i / (goldColors2.length - 1)) + '%';
      })

    container
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 347.5)
      .style("stroke", "#bfb7ff")
      .style("stroke-width", "2px")
      .style('fill', '#0108d7');

    container
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 311.5)
      .style("stroke", "#bfb7ff")
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
      .append("foreignObject")
      .attr("transform", function (d, i) {
        const long = nameList[i].length > 12;
        d.innerRadius = 0;
        d.outerRadius = r;
        d.angle = (d.startAngle + d.endAngle) / 2;
        return (
          "rotate(" +
          ((d.angle * 180) / Math.PI - 90) +
          ")translate(" +
          (d.outerRadius - 200) +
          (long ? ", -20)" : ", -12)")
        );
      })
      .attr("width", 150)
      .attr("height", 100)
      .style("text-align", "right")
      .style("font-size", "16px")
      .append("xhtml:span")
      .style("color", function (d, i) {
        if (color(i) === '#FFA500' || color(i) === '#FAEB36' || color(i) === '#79C314') {
          return 'black';
        }
        return 'white';
      })
      .html(function (d, i) {
        return nameList[i];
      });

    arcs
      .append("circle")
      .attr("class", "dot")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 8)
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
      .style('stroke', '#1e20c1')
      .style("stroke-width", "0.5px")
      .style('fill', 'url(#grad1)');

    container.on("click", spin);

    function spin(d) {
      oldrotation = rotation;
      let ps = 360 / nameList.length,
        rng = Math.floor(Math.random() * 1440 + 1800);

      rotation = Math.round(rng / ps) * ps;
      picked = Math.round(nameList.length - (rotation % 360) / ps);
      picked = picked >= nameList.length ? picked % nameList.length : picked;
      // we want it to land at a random point in the pie slice
      rotation += 90 - Math.round(ps / Math.random());
      vis.transition().duration(10000).attrTween("transform", rotTween).ease(d3.easeCubicOut);
    }
    //draw spin circle
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
      .style('stroke', '#1e20c1')
      .style("stroke-width", "2px")
      .style('fill', 'url(#grad1)');

    container
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 30)
      .style('stroke', '#8f6b29')
      .style("stroke-width", "3px")
      .style('fill', 'url(#grad1)');

    //make arrow
    svg
      .append("g")
      .attr("id", "arrow")
      .attr(
        "transform",
        "translate(" +
        (w + padding.left + padding.right - 20) +
        "," +
        (h / 2 + padding.top) +
        ")",
      )
      .append("path")
      .attr("d", "M-" + r * 0.25 + ",0L0," + r * 0.05 + "L0,-" + r * 0.05 + "Z")
      .style('stroke', '#f5f5f2')
      .style("stroke-width", "2px")
      .style('fill', 'url(#grad2)');

    function rotTween() {
      let i = d3.interpolate(oldrotation % 360, rotation);
      return function (t) {
        return `rotate(${i(t)})`;
      };
    }
  }, [nameList]);

  return (
    <div className="wheelHolder" style={{
      width: '100%',
    }}>
      <div id="chart" ref={domRef}></div>
    </div>
  );
}
