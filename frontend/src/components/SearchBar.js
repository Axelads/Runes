import React from "react";

const SearchBar = ({ searchQuery, setSearchQuery, placeholder }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder || "Rechercher..."}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
