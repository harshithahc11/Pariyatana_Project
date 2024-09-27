import React, { useState } from "react";
import "../styles/searchbar.css";
import SearchIcon from "@mui/icons-material/Search";
const SearchComponent = ({ onSearch, onKeyPress }) => {
  const [query, setQuery] = useState("");
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
      if (onKeyPress) {
        onKeyPress(query);
      }
    }
  };

  return (
    <>
      <div className="search-container">
        <SearchIcon color="grey" />
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          value={query}
          onChange={handleInputChange}
          // onSearch={handleSearch}
          onKeyPress={handleKeyPress}
        />
      </div>
    </>
  );
};

export default SearchComponent;
