import {
  Box,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import * as React from "react";
import { FaSearch } from "react-icons/fa";

type SearchPanelType = {
  onChange: (props: { searchString: string }) => void;
};
export const SearchPanel = ({ onChange }: SearchPanelType) => {
  const [searchString, setSearchString] = React.useState("");

  React.useEffect(() => {
    onChange({ searchString });
  }, [searchString]);

  return (
    <Box as="form">
      <FormControl>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <FaSearch aria-label="Search" />
          </InputLeftElement>
          <Input
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            placeholder="Search for titles, categories and keywords"
          />
        </InputGroup>
      </FormControl>
    </Box>
  );
};
