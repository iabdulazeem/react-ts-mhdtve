/**
 * This component is a workflow node with all constituent components rendered inside.
 *
 * Props:
 * - node: a workflow Node object
 *
 * Usage:
 * 
 *   <WorkflowNode 
 *    node={{id: 2,
        title: "Case switcher",
        color: "yellow",
        label: "Manipulator",
        imageName: "manipulator.png"}
      }
    />
 */

import * as React from 'react';
import type { Node } from '../utilities/types';
import styled from 'styled-components';

const NodeContentWrapper = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
    `;
const NodeTitle = styled.p`
      font-size: 14px;
      font-weight: bold;
    `;

const ColoredBox = styled.div`
      width: 50px;
      height: 50px;
    `;

const NodeLabel = styled.p`
      font-size: 14px;
    `;

interface WorkflowNodeProps {
  node: Node;
}

const WorkflowNode: React.FC<WorkflowNodeProps> = ({ node }) => {
  return (
    <NodeContentWrapper>
      <NodeTitle data-testid={`added-node-title-${node.id}`}>
        {node.title}
      </NodeTitle>
      <ColoredBox style={{ background: node.color }} />
      <NodeLabel>{node.label}</NodeLabel>
    </NodeContentWrapper>
  );
};

export default WorkflowNode;
