import * as React from 'react';
import SearchBox from '../components/SearchBox';
import type { Node } from '../utilities/types';
import { CANVAS_BACKGROUND } from '../utilities/constants';
import styled from 'styled-components';
import DragableNode from '../components/DragableNode';

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Canvas = styled.div`
  width: 100%;
  height: 500px;
  background-color: ${CANVAS_BACKGROUND};
  position: relative;
`;

interface WorkflowNodeProps {}

const WorkflowCanvas: React.FC<WorkflowNodeProps> = () => {
  const [nodesOnCanvas, setNodesOffCanvas] = React.useState<Node[]>([]);

  // Dummy workflow nodes
  const nodes: Node[] = [
    {
      id: 1,
      title: 'Data Generator',
      color: 'green',
      label: 'Source',
      imageName: 'generator.png',
    },
    {
      id: 3,
      title: 'Cluster Assigner',
      color: 'red',
      label: 'Predictor',
      imageName: 'predictor.png',
    },
    {
      id: 2,
      title: 'Case switcher',
      color: 'yellow',
      label: 'Manipulator',
      imageName: 'manipulator.png',
    },
    {
      id: 4,
      title: 'Image Processor',
      color: 'blue',
      label: 'transformer',
      imageName: 'transformer.png',
    },
  ];

  const findNodeById = (id: number): Node | undefined => {
    return nodes.find((node) => node.id === id);
  };

  /**
   * If current node is not present, then this function adds it to the list of nodes which are shown on the canvas
   * Multiple nodes of the same type are not handelded in current implementation, the solution for that would be
   * to add a separate identifier to the nodes array which represents the nodes on the canvas
   **/
  const addNodeToCanvas = (nodeId: number) => {
    const nodeToBeAdded = findNodeById(nodeId);
    if (nodeToBeAdded) {
      const nodeIndex = nodesOnCanvas.findIndex(
        (n) => n.id === nodeToBeAdded.id
      );
      if (nodeIndex === -1) {
        setNodesOffCanvas([...nodesOnCanvas, nodeToBeAdded]);
      }
    }
  };

  return (
    <ContentWrapper>
      <SearchBox nodes={nodes} addNodeToCanvas={addNodeToCanvas} />
      <Canvas>
        {nodesOnCanvas.map((node) => {
          return (
            <DragableNode
              x={50 * node.id}
              y={75 * node.id}
              node={node}
              key={node.title}
            />
          );
        })}
      </Canvas>
    </ContentWrapper>
  );
};

export default WorkflowCanvas;
