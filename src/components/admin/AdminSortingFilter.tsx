import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface SortingFilterProps {
  sortBy: string;
  onChange: (event: SelectChangeEvent) => void;
}

const AdminSortingFilter = ({ sortBy, onChange }: SortingFilterProps) => {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Select
        value={sortBy}
        onChange={onChange}
        displayEmpty
        fullWidth
        color="secondary"
      >
        <MenuItem value="nameAsc">Name: A to Z</MenuItem>
        <MenuItem value="nameDesc">Name: Z to A</MenuItem>
      </Select>
    </Box>
  );
};

export default AdminSortingFilter;
