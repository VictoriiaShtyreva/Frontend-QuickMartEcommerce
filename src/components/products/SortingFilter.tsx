import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface SortingFilterProps {
  sortBy: string;
  onChange: (event: SelectChangeEvent) => void;
}

const SortingFilter = ({ sortBy, onChange }: SortingFilterProps) => {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Select
        value={sortBy}
        onChange={onChange}
        displayEmpty
        fullWidth
        color="secondary"
      >
        <MenuItem value="priceAsc">Price: Low to High</MenuItem>
        <MenuItem value="priceDesc">Price: High to Low</MenuItem>
        <MenuItem value="titleAsc">Title: A to Z</MenuItem>
        <MenuItem value="titleDesc">Title: Z to A</MenuItem>
      </Select>
    </Box>
  );
};

export default SortingFilter;
