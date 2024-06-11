import React from 'react';
import { Button, Box } from "@mui/material";
import { useTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';

interface FilterButtonsProps {
  filters: string[];
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ filters, selectedFilter, onFilterChange }) => {
  const theme = useTheme();
  // const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        gap: 1,
        marginTop: 1
      }}
    >
      {filters.map((filter) => (
        <Button
          key={filter}
          variant={selectedFilter === filter ? "contained" : "outlined"}
          sx={{
            color: selectedFilter === filter ? theme.palette.secondary.main : theme.palette.primary.dark,
            borderColor: selectedFilter === filter ? theme.palette.primary.main : theme.palette.primary.dark,
            minWidth: '100px'
          }}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </Button>
      ))}
    </Box>
  );
};

export default FilterButtons;
