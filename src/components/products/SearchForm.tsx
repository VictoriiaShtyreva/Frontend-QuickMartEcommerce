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
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
    //Trigger the search function on input change
    onSearch(event.target.value);
  };

  const handleClear = () => {
    setUserInput("");
    //Trigger the clear function on clearing the input
    onClear();
  };

  return (
    <TextField
      sx={{ mb: 2 }}
      label="Search products..."
      variant="outlined"
      color="primary"
      value={userInput}
      onChange={handleOnChange}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={handleClear}
              aria-label="search products by name"
            >
              <SearchOffIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchForm;
