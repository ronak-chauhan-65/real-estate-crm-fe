export const paginationEntries = ({
  perPage = 0,
  currentPage = 0,
  total = 0,
}) => {
  return `Showing ${from({ perPage, currentPage }) + 1} to ${to({
    perPage,
    currentPage,
    total,
  })} of
      ${total} records`;
};

export const from = ({ perPage = 0, currentPage = 0 }) => {
  return perPage * (currentPage - 1);
};

export const to = ({ perPage = 0, currentPage = 0, total = 0 }) => {
  let highBound = perPage * (currentPage - 1) + perPage;

  if (total < highBound) {
    highBound = total;
  }
  return highBound;
};
