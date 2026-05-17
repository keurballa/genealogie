import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Person } from '../../types';
import { motion } from 'motion/react';
import { User, Plus } from 'lucide-react';

interface TreeViewProps {
  data: Person[];
  onSelectPerson: (person: Person) => void;
}

export const TreeView: React.FC<TreeViewProps> = ({ data, onSelectPerson }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const width = 800;
    const height = 600;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg.append("g");

    // Simple horizontal tree layout logic
    // In a real app, this would be a complex graph layout
    const stratify = d3.stratify<Person>()
      .id(d => d.id)
      .parentId(d => d.parents[0]); // Simple case: only one parent for visual tree

    try {
      const root = stratify(data);
      const treeLayout = d3.tree<Person>().size([height - 100, width - 200]);
      treeLayout(root);

      // Links
      g.append("g")
        .attr("fill", "none")
        .attr("stroke", "#5A5A40")
        .attr("stroke-opacity", 0.4)
        .attr("stroke-width", 1.5)
        .selectAll("path")
        .data(root.links())
        .join("path")
        .attr("d", d3.linkHorizontal<any, any>()
          .x(d => d.y)
          .y(d => d.x) as any
        );

      // Nodes
      const node = g.append("g")
        .selectAll("g")
        .data(root.descendants())
        .join("g")
        .attr("transform", d => `translate(${d.y},${d.x})`)
        .on("click", (event, d) => onSelectPerson(d.data));

      node.append("circle")
        .attr("fill", d => d.children ? "#5A5A40" : "#fff")
        .attr("stroke", "#5A5A40")
        .attr("stroke-width", 2)
        .attr("r", 6);

      node.append("text")
        .attr("dy", "0.31em")
        .attr("x", d => d.children ? -10 : 10)
        .attr("text-anchor", d => d.children ? "end" : "start")
        .text(d => `${d.data.firstName} ${d.data.lastName}`)
        .attr("class", "text-[10px] font-sans fill-gray-900")
        .clone(true).lower()
        .attr("stroke", "white")
        .attr("stroke-width", 3);

    } catch (e) {
      // Fallback for non-tree structures (graphs)
      console.error("D3 Stratify failed, using force layout fallback (not implemented for simplicity)");
    }

    // Zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 3])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom as any);

  }, [data]);

  return (
    <div className="relative w-full h-[600px] bg-white rounded-xl overflow-hidden">
      <div className="absolute top-4 left-4 z-10">
        <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-400">Rendu du Graphe Harmonique</h3>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]" />
      <svg
        ref={svgRef}
        className="relative w-full h-full cursor-grab active:cursor-grabbing z-0"
        viewBox="0 0 800 600"
      />
      <button className="absolute bottom-6 right-6 w-12 h-12 bg-amber-600 text-white rounded-lg flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform">
        <Plus size={24} />
      </button>
    </div>
  );
};
