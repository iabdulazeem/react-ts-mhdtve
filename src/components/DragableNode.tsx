/**
 * This component is a blackbox container that can be dragged on the canvas.
 *
 * Props:
 * - node: a workflow Node object
 * - x: the x position of the node
 * - y: the y position of the node
 *
 * Usage:
 * 
 *   <DragableNode node={{id: 2,
        title: "Case switcher",
        color: "yellow",
        label: "Manipulator",
        imageName: "manipulator.png"}
      }
      x={10}
      y={10}
    />
 */

import * as React from 'react';
import styled from 'styled-components';
import WorkflowNode from '../components/WorkflowNode';
import type { Node } from '../utilities/types';

const Dragable = styled.div`
      position: absolute;
    `;

interface DragableNodeProps {
  node: Node;
  x: number;
  y: number;
}

const DragableNode: React.FC<DragableNodeProps> = ({ x, y, node }) => {
  const [divX, setDivX] = React.useState(x);
  const [divY, setDivY] = React.useState(y);
  const [isDragging, setIsDragging] = React.useState(false);

  // Refference to the dragable box, used to manage the updated position of the box when dragged
  const divRef = React.useRef<HTMLDivElement>(null);

  // When mouse is over the box and cliked to drag the node
  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true);
  };

  // Mouse released after the drag
  const handleMouseUp = (event: React.MouseEvent) => {
    setIsDragging(false);
  };

  // Handles all the positions of the node during the dragging of the node, updates those positions to the state
  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isDragging) {
      return;
    }
    setDivX(event.movementX + divX);
    setDivY(event.movementY + divY);
  };

  // This handles the case when mouse is clicked outside of any of the draggable nodes, to inactivate dragging on all nodes
  const handleClick = (e: MouseEvent) => {
    if (!divRef.current) return;

    if (e.target !== divRef.current) {
      setIsDragging(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <Dragable
      ref={divRef}
      style={{ left: `${divX}px`, top: `${divY}px` }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <WorkflowNode node={node} />
    </Dragable>
  );
};

export default DragableNode;
