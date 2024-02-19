import { Box, MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";

import { Category } from "../../types/Category";

interface CategorySelectionProps {
  categories: Category[];
  selectedCategory: string;
  onChange: (event: SelectChangeEvent) => void;
}

const CategorySelection = ({
  categories,
  selectedCategory,
  onChange,
}: CategorySelectionProps) => {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Select
        value={selectedCategory}
        onChange={onChange}
        displayEmpty
        fullWidth
      >
        <MenuItem value="all">All Categories</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default CategorySelection;
