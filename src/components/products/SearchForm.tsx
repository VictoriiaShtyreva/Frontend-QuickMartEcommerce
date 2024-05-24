import { useEffect, useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";

interface SearchFormProps {
  userInput: string;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
  onSearch: (value: string) => void;
  onClear: () => void;
}

const SearchForm = ({
  userInput,
  setUserInput,
  onSearch,
  onClear,
}: SearchFormProps) => {
  const [localInput, setLocalInput] = useState(userInput);

  // Debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(localInput);
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [localInput, onSearch]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalInput(event.target.value);
    setUserInput(event.target.value);
  };

  const handleClear = () => {
    setLocalInput("");
    setUserInput("");
    onClear();
  };

  return (
    <TextField
      sx={{ mb: 2 }}
      label="Search..."
      variant="outlined"
      color="secondary"
      value={localInput}
      onChange={handleOnChange}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleClear} aria-label="search item by name">
              <SearchOffIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchForm;
