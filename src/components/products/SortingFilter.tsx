import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface SortingFilterProps {
  sortPrice: "asc" | "desc";
  onChange: (event: SelectChangeEvent) => void;
}

const SortingFilter = ({ sortPrice, onChange }: SortingFilterProps) => {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Select value={sortPrice} onChange={onChange} displayEmpty fullWidth>
        <MenuItem value="asc">Price: Low to High</MenuItem>
        <MenuItem value="desc">Price: High to Low</MenuItem>
      </Select>
    </Box>
  );
};

export default SortingFilter;
