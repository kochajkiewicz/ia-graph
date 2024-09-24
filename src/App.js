import React, { useRef, useState } from 'react';
import { ForceGraph3D } from 'react-force-graph';
import * as THREE from 'three';  // Import THREE.js for the basic node shapes
import SpriteText from 'three-spritetext'; // Correct import for SpriteText
import * as d3 from 'd3-scale';
import { interpolateBlues } from 'd3-scale-chromatic';  // Import color interpolator


function App() {
  const graphRef = useRef();

  const graphData = {
    nodes: [
      { id: 'Sales insights', group: 1},
      { id: 'Schedule', group: 1},
      { id: 'Place order', group: 1},
      { id: 'Invoices', group: 1},
      { id: 'CPU orders', group: 1},
      { id: 'Labour', group: 1},
      { id: 'Counts', group: 1},
      { id: 'Timecards', group: 1},
      { id: 'People', group: 1},
      { id: 'Inventory insights', group: 1},
      { id: 'Waste', group: 1},
      { id: 'Shift action', group: 1},
      { id: 'Orders', group: 1},
      { id: 'Transfers', group: 1},
      { id: 'Recipes', group: 1},
      { id: 'Messenger', group: 1},
      { id: 'Credit notes', group: 1},
      { id: 'CPU invoices', group: 1},
      { id: 'View invoice', group: 1},
      { id: 'Batch', group: 1},
      { id: 'Create credit note', group: 1},
      { id: 'Approve timecards', group: 1},
      { id: 'Edit timecard', group: 1},
      { id: 'View employee', group: 1},
      { id: 'Accept delivery', group: 1},
      { id: 'Update invoice', group: 1},
      { id: 'Start stock count', group: 1},
      { id: 'Recon reports', group: 1},
      { id: 'Record waste', group: 1},
      { id: 'CPU production', group: 1},
      { id: 'Requests', group: 1},
      { id: 'Tipjar', group: 1},
      { id: 'Storage areas', group: 1},
      { id: 'CPU sales report', group: 1},
      { id: 'Cash management', group: 1},
      { id: 'Settings', group: 1},
      { id: 'Purchase report', group: 1},
      { id: 'Flash P&L', group: 1},
    ],
    links: [
      { source: 'Schedule', target: 'Shift action' },
      { source: 'Schedule', target: 'Sales insights' },
      { source: 'Schedule', target: 'Timecards' },
      { source: 'Schedule', target: 'People' },
      { source: 'Place order', target: 'Record waste' },
      { source: 'Place order', target: 'Invoices' },
      { source: 'Place order', target: 'CPU orders' },
      { source: 'Sales insights', target: 'Schedule' },
      { source: 'Sales insights', target: 'Inventory insights' },
      { source: 'Sales insights', target: 'Labour' },
      { source: 'Counts', target: 'Recon reports' },
      { source: 'Counts', target: 'Sales insights' },
      { source: 'Counts', target: 'Waste' },
      { source: 'Counts', target: 'Start stock count' },
      { source: 'Invoices', target: 'Update invoice' },
      { source: 'Invoices', target: 'Accept delivery' },
      { source: 'Invoices', target: 'Create credit note' },
      { source: 'Orders', target: 'Invoices' },
      { source: 'Orders', target: 'Place order' },
      { source: 'Orders', target: 'Sales insights' },
      { source: 'People', target: 'View employee' },
      { source: 'People', target: 'Schedule' },
      { source: 'People', target: 'Timecards' },
      { source: 'Timecards', target: 'Edit timecard' },
      { source: 'Timecards', target: 'Schedule' },
      { source: 'Timecards', target: 'Approve timecards' },
      { source: 'Labour', target: 'Schedule' },
      { source: 'Labour', target: 'Sales insights' },
      { source: 'Labour', target: 'Inventory insights' },
      { source: 'Requests', target: 'Schedule' },
      { source: 'Requests', target: 'People' },
      { source: 'Requests', target: 'Sales insights' },
      { source: 'Waste', target: 'Counts' },
      { source: 'Waste', target: 'Batch' },
      { source: 'Waste', target: 'Place order' },
      { source: 'Messenger', target: 'Schedule' },
      { source: 'Messenger', target: 'Sales insights' },
      { source: 'Messenger', target: 'Counts' },
      { source: 'Messenger', target: 'Place order' },
      { source: 'Inventory insights', target: 'Sales insights' },
      { source: 'Inventory insights', target: 'Labour' },
      { source: 'Inventory insights', target: 'Counts' },
      { source: 'CPU orders', target: 'Orders' },
      { source: 'CPU orders', target: 'Place order' },
      { source: 'CPU orders', target: 'Transfers' },
      { source: 'CPU orders', target: 'Messenger' },
      { source: 'Cash management', target: 'Schedule' },
      { source: 'Cash management', target: 'Sales insights' },
      { source: 'Cash management', target: 'Labour' },
      { source: 'Settings', target: 'Sales insights' },
      { source: 'Settings', target: 'Schedule' },
      { source: 'Settings', target: 'Place order' },
      { source: 'Purchase report', target: 'Invoices' },
      { source: 'Purchase report', target: 'Sales insights' },
      { source: 'Purchase report', target: 'Credit notes' },
      { source: 'CPU production', target: 'CPU orders' },
      { source: 'CPU production', target: 'Sales insights' },
      { source: 'CPU production', target: 'CPU invoices' },
      { source: 'Batch', target: 'Waste' },
      { source: 'Batch', target: 'Counts' },
      { source: 'Batch', target: 'Place order' },
      { source: 'Flash P&L', target: 'Sales insights' },
      { source: 'Flash P&L', target: 'Labour' },
      { source: 'Flash P&L', target: 'Schedule' },
      { source: 'Storage areas', target: 'Sales insights' },
      { source: 'Storage areas', target: 'Recipes' },
      { source: 'Storage areas', target: 'Place order' },
      { source: 'CPU invoices', target: 'CPU orders' },
      { source: 'CPU invoices', target: 'View invoice' },
      { source: 'CPU invoices', target: 'CPU production' },
      { source: 'Tipjar', target: 'Timecards' },
      { source: 'Tipjar', target: 'Schedule' },
      { source: 'Tipjar', target: 'People' },
      { source: 'CPU sales report', target: 'Sales insights' },
      { source: 'CPU sales report', target: 'Invoices' },
      { source: 'CPU sales report', target: 'CPU orders' },
    ],
  };

  // Function to calculate the number of connections for each node
  const calculateNodeDegree = (node, links) => {
    return links.reduce((count, link) => {
      return count + (link.source.id === node.id || link.target.id === node.id ? 1 : 0);
    }, 0);
  };

  // Create a color scale for gradient (from blue to red)
  const colorScale = d3.scaleSequential(interpolateBlues)
    .domain([1, 5]);  // Assume degree range is between 1 and 5, can change later

  // Function to create a custom 3D node (both a sphere and text label)
  const createNodeObject = (node) => {

    const nodeDegree = calculateNodeDegree(node, graphData.links);
    const size = Math.max(1, nodeDegree * 1.55); // Minimum size 5, increases with degree

    // Create a sphere geometry for the node
    const sphereGeometry = new THREE.SphereGeometry(size); // use size calculated above
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(colorScale(nodeDegree)) // Apply gradient color based on degree
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    // Create the text label
    const nodeLabel = new SpriteText(node.id);
    nodeLabel.color = 'white';
    nodeLabel.textHeight = 5;

    // Create a group to combine the node and the label
    const group = new THREE.Group();
    group.add(sphere);  // Add sphere (node)
    group.add(nodeLabel);  // Add text label

    // Adjust the label's position so it doesn't overlap the node
    nodeLabel.position.set(-3, 1.5* size, 5); // Offset the label slightly above the node

    return group;
  };

  return (
    <div style={{ height: '100vh' }}>
      <ForceGraph3D
        ref={graphRef}
        graphData={graphData}
        nodeAutoColorBy="group"
        // Customize the link width based on strength or another property
        linkWidth={link => link.strength || 1}  // Scale link width by strength
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={d => d.value * 0.001}
        onNodeClick={node => alert(`Clicked node: ${node.id}`)}
        nodeThreeObject={createNodeObject} // Attach 3D text to each node
        nodeThreeObjectExtend={true}  // Render both default node and custom node
      />
    </div>
  );
}

export default App;