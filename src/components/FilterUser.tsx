import React, { useState } from "react";
import { BsCalendar } from "react-icons/bs";

interface FilterUserProps {
  onApplyFilter: (startDate: string, endDate: string, type: string) => void;
}

const FilterUser: React.FC<FilterUserProps> = ({ onApplyFilter }) => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const validateInputs = (): boolean => {
    if (filterType === "both" && (!startDate || !endDate)) {
      setError("Please select both start and end dates.");
      return false;
    }

    if (filterType === "loadDate" && !startDate) {
      setError("Please select a load date.");
      return false;
    }

    if (filterType === "returnDate" && !endDate) {
      setError("Please select a return date.");
      return false;
    }

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      setError("Start date cannot be later than end date.");
      return false;
    }

    setError("");
    return true;
  };

  const handleDateFilter = () => {
    if (validateInputs()) {
      console.log("Validation passed. Applying filter...");
      onApplyFilter(startDate, endDate, filterType);
      setIsModalOpen(false);
    }
  };

  const handleAllData = () => {
    setStartDate("");
    setEndDate("");
    onApplyFilter("", "", "");
  };

  const isApplyButtonDisabled = (): boolean => {
    if (filterType === "") {
      return false;
    }

    if (filterType === "both" && (!startDate || !endDate)) return true;

    if (filterType === "loadDate" && !startDate) return true;

    if (filterType === "returnDate" && !endDate) return true;

    if (startDate && endDate && new Date(startDate) > new Date(endDate))
      return true;

    return false;
  };

  return (
    <div className="relative flex flex-col w-56 gap-2">
      <button
        className="bg-sky-500 flex items-center p-2 text-white font-bold rounded cursor-pointer hover:bg-sky-600 transition"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <BsCalendar className="mr-2" />
        Filter Date :{" "}
        {filterType
          ? filterType
              .replace(/([A-Z])/g, " $1")
              .trim()
              .toUpperCase()
          : "ALL DATA"}
      </button>

      {isModalOpen && (
        <div className="absolute top-full mt-2 bg-white border border-gray-300 rounded shadow-lg flex flex-col gap-4 p-4 z-10">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Filter By: </label>
            <select
              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={filterType}
              onChange={(e) => {
                const value = e.target.value;
                setFilterType(value);
                if (value === "") {
                  handleAllData();
                }
              }}
            >
              <option value="">All Data</option>
              <option value="both">Both</option>
              <option value="loadDate">Load Date</option>
              <option value="returnDate">Return Date</option>
            </select>
          </div>

          {(filterType === "loadDate" || filterType === "both") && (
            <div className="flex flex-col gap-2">
              <label htmlFor="loadDate" className="text-sm font-medium">
                Load Date:
              </label>
              <input
                type="date"
                id="loadDate"
                className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
          )}

          {(filterType === "returnDate" || filterType === "both") && (
            <div className="flex flex-col gap-2">
              <label htmlFor="returnDate" className="text-sm font-medium">
                Return Date:
              </label>
              <input
                type="date"
                id="returnDate"
                className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          )}

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <button
            className={`p-2 rounded w-full transition ${
              isApplyButtonDisabled()
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            onClick={handleDateFilter}
          >
            Apply Filter
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterUser;
