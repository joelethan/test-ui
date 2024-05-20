const darkHeader = {
  rows: {
    style: {
      minHeight: "72px",
      fontSize: "12px",
      fontWeight: "600",
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
      fontWeight: "bold",
      background: "#57606f",
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
      paddingRight: "8px",
    },
  },
};

export default darkHeader;
