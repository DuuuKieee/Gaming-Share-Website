import React, { useState, useRef, useEffect } from "react";
import "./SearchBar.scss";
import { HiSearch } from "react-icons/hi";
import Activity from "../../HomePage/Body/Activity/Activity";

const SearchBar = () => {
  const [isSearching, setIsSearching] = useState(false);
  const searchBarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setIsSearching(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [searchBarRef]);

  const handleInputClick = () => {
    setIsSearching(true);
  };

  return (
    <div className="SearchBar grid" ref={searchBarRef}>
      <div className="SearchBox flex">
        <HiSearch className="icon" />
        <input
          type="text"
          placeholder="Search..."
          onClick={handleInputClick}
        />
      </div>
      <div>
        {isSearching && (
          <div className="SearchList grid">
            <Activity />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
