import * as React from 'react';
import type { Node } from '../utilities/types';
import SearchListItem from './SearchListItem';
import styled from 'styled-components';

const SearchComponent = styled.input`
  height: 40px;
  width: 400px;
  font-size: 14px;
  padding: 10px;
  box-sizing: border-box;
  border: 2px solid black;
`;

interface SearchBoxProps {
  nodes: Node[];
  addNodeToCanvas: (nodeId: number) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ nodes, addNodeToCanvas }) => {
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [searchResults, setSearchResults] = React.useState<string[]>([]);

  const nodeTitles = nodes.map((item) => item.title);

  // Captures the search term from the input box and updates the search results to the state
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    setSearchResults(
      nodeTitles.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    if (searchTerm.trim() === '') setSearchResults([]);
  };

  const filterArrayByTitle = (title: string): Node | undefined => {
    return nodes.find((node) => node.title === title);
  };

  return (
    <>
      <SearchComponent
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder={'Add new node...'}
      />
      <ul>
        {searchResults.map((result) => (
          <SearchListItem
            node={filterArrayByTitle(result)}
            addNodeToCanvas={addNodeToCanvas}
            key={result}
          />
        ))}
      </ul>
    </>
  );
};

export default SearchBox;
