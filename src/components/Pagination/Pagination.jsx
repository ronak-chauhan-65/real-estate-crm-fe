import { useState, useEffect } from "react";

const Pagination = ({
  perPage = 20,
  total = 100,
  value: initialValue = 1,
  onClick = (page) => {},
}) => {
  const defaultPagesToDisplay = 5;
  const [value, setValue] = useState(initialValue);
  const [minPage, setMinPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  const limitMaxValue = Math.ceil(total / perPage);
  const limitPageValue =
    limitMaxValue < defaultPagesToDisplay
      ? limitMaxValue
      : defaultPagesToDisplay;

  // Function to calculate minPage and maxPage based on current value
  const calculatePagination = (currentValue) => {
    let newMinPage, newMaxPage;

    if (limitPageValue < defaultPagesToDisplay) {
      newMinPage = 1;
      newMaxPage = limitPageValue;
    } else {
      const limitValidation =
        currentValue + 1 < limitMaxValue
          ? 0
          : defaultPagesToDisplay === 5
          ? 2
          : 1;

      const defaultPageCounter = (defaultPagesToDisplay - 1) / 2;

      const minusValue = currentValue - defaultPageCounter - limitValidation;
      const addValue = currentValue + defaultPageCounter - limitValidation;

      newMinPage =
        currentValue === 2
          ? 1
          : currentValue === 1 || minusValue === 0
          ? limitPageValue <= defaultPagesToDisplay
            ? 1
            : currentValue
          : minusValue;

      newMaxPage =
        currentValue === 1 || minusValue === 0
          ? limitMaxValue > defaultPagesToDisplay
            ? defaultPagesToDisplay
            : limitMaxValue
          : addValue;
    }

    setMinPage(newMinPage);
    setMaxPage(newMaxPage);
  };

  // Update pagination whenever value changes
  useEffect(() => {
    calculatePagination(value);
    // onClick(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, total, perPage]);

  // Arrow handlers
  const rightArrowClick = () => {
    if (value < limitMaxValue) setValue(value + 1);
  };

  const leftArrowClick = () => {
    if (value > 1) setValue(value - 1);
  };

  // Generate range array
  const range = (min, max) => {
    const arr = [];
    for (let i = min; i <= max; i++) arr.push(i);
    return arr;
  };

  return (
    <div className="flex gap-2">
      {/* Left arrow */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer border ${
          minPage === 1 && value === 1
            ? "pointer-events-none border-secondary text-secondary bg-secondary/10"
            : "border-info text-info hover:bg-info/10"
        }`}
        onClick={leftArrowClick}
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </div>

      {/* Page buttons */}
      {range(minPage, maxPage).map((i) => (
        <div
          key={i}
          className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${
            value === i
              ? "bg-info text-accent"
              : "border border-info text-info hover:bg-info/10"
          }`}
          onClick={() => setValue(i)}
        >
          <h6>{i}</h6>
        </div>
      ))}

      {/* Right arrow */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer border ${
          limitMaxValue === maxPage && value === maxPage
            ? "pointer-events-none border-secondary text-secondary bg-secondary/10"
            : "border-info text-info hover:bg-info/10"
        }`}
        onClick={rightArrowClick}
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </div>
    </div>
  );
};

export default Pagination;
