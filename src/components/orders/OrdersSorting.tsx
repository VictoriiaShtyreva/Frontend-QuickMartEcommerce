import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface SortingFilterProps {
  sortBy: string;
  onChange: (event: SelectChangeEvent) => void;
}

const OrdersSorting = ({ sortBy, onChange }: SortingFilterProps) => {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Select
        value={sortBy}
        onChange={onChange}
        displayEmpty
        fullWidth
        color="secondary"
      >
        <MenuItem value="createdAtAsc">Date: Oldest to Newest</MenuItem>
        <MenuItem value="createdAtDesc">Date: Newest to Oldest</MenuItem>
        <MenuItem value="totalPriceAsc">TotalPrice: Low to High</MenuItem>
        <MenuItem value="totalPriceDesc">TotalPrice: High to Low</MenuItem>
      </Select>
    </Box>
  );
};

export default OrdersSorting;
