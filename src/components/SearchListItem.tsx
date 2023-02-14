import React from 'react';
import type { Node } from '../utilities/types';
import styled from 'styled-components';

const ListItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ListItem = styled.li`
  width: 70%;
  padding: 10px;
  text-align: center;
  border: 1px solid #ccc;
  margin-right: 10px;
  list-style: none;
`;

interface SearchListItemProps {
  node: Node | undefined;
  addNodeToCanvas: (nodeId: number) => void;
}

const SearchListItem: React.FC<SearchListItemProps> = ({
  node,
  addNodeToCanvas,
}) => {
  return (
    <>
      {node && (
        <ListItemContainer>
          <ListItem key={node.id}>{node.title}</ListItem>
          <button
            onClick={() => {
              addNodeToCanvas(node.id);
            }}
            data-testid={`add-node-btn-${node.id}`}
          >
            Add
          </button>
        </ListItemContainer>
      )}
    </>
  );
};

export default SearchListItem;
