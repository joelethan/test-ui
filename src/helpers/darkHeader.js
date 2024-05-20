const darkHeader = {
  rows: {
    style: {
      minHeight: "72px",
      fontWeight: "bold !important",
      borderBottom: "1px solid #dfe6e9",
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
      fontWeight: "bold",
      background: "#636e72",
      textTransform: "uppercase",
      color: "#f5f6fa",
    },
    activeSortStyle: {
      color: "#fffff",
      "&:hover:not(:focus)": {
        color: "#ffffff",
      },
    },
    inactiveSortStyle: {
      "&:focus": {
        color: "#ffffff",
      },
      "&:hover": {
        color: "#ffffff",
      },
    },
  },
  cells: {
    style: {
      paddingLeft: "8px",
      fontWeight: "600 !important",
    },
  },
};

export default darkHeader;
