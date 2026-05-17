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

    // Classic tree layout logic
    // We use parents[0] as the parent for the visual tree hierarchy
    const stratify = d3.stratify<Person>()
      .id(d => d.id)
      .parentId(d => d.parents[0]); 

    try {
      const root = stratify(data);
      const treeLayout = d3.tree<Person>().size([width - 100, height - 150]);
      treeLayout(root);

      // Links (Orthogonal steps for a cleaner "photo-like" look)
      g.append("g")
        .attr("fill", "none")
        .attr("stroke", "#94A3B8")
        .attr("stroke-opacity", 0.4)
        .attr("stroke-width", 2)
        .selectAll("path")
        .data(root.links())
        .join("path")
        .attr("d", d3.linkVertical<any, any>()
          .x(d => d.x)
          .y(d => d.y) as any
        );

      // Nodes as Styled Rectangles
      const node = g.append("g")
        .selectAll("g")
        .data(root.descendants())
        .join("g")
        .attr("transform", d => `translate(${d.x},${d.y})`)
        .on("click", (event, d) => onSelectPerson(d.data))
        .attr("class", "cursor-pointer");

      const boxWidth = 140;
      const boxHeight = 55;

      // Rectangle border based on gender
      node.append("rect")
        .attr("x", -boxWidth / 2)
        .attr("y", -boxHeight / 2)
        .attr("width", boxWidth)
        .attr("height", boxHeight)
        .attr("fill", "white")
        .attr("stroke", d => {
          if (d.data.gender === 'male') return "#3B82F6"; // Blue
          if (d.data.gender === 'female') return "#EC4899"; // Pink
          return "#94A3B8"; // Gray
        })
        .attr("stroke-width", 2)
        .attr("rx", 6)
        .attr("class", "drop-shadow-sm");

      // Name inside box
      node.append("text")
        .attr("dy", "-5")
        .attr("text-anchor", "middle")
        .text(d => `${d.data.firstName} ${d.data.lastName}`)
        .attr("class", "text-[11px] font-sans font-bold fill-stone-900");

      // Unique Code inside box
      node.append("text")
        .attr("dy", "12")
        .attr("text-anchor", "middle")
        .text(d => d.data.uniqueCode)
        .attr("class", "text-[9px] font-mono font-bold fill-stone-400 uppercase tracking-widest");

      // Birth year inside box
      node.append("text")
        .attr("dy", "26")
        .attr("text-anchor", "middle")
        .text(d => d.data.birthDate ? `* ${d.data.birthDate.split('-')[0]}` : '')
        .attr("class", "text-[8px] font-mono fill-amber-600/70 font-bold");

    } catch (e) {
      console.error("D3 Simple Tree failed:", e);
      g.append("text")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("text-anchor", "middle")
        .text("Erreur de rendu du graphe (Vérifiez les liens parents)");
    }

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
