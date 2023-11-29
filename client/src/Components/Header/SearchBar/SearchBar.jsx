import React, { useState, useEffect } from "react";
import "./SearchBar.scss";
import { HiSearch } from "react-icons/hi";
import GameList from "../../HomePage/Body/Activity/GameList/GameList";

export const SearchBar = ({ setResults }) => {
  const [productdata, setProductdata] = useState([]);
  const [filter, setFilter] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await fetch('http://localhost:8000/api/getdata');
        const res = await req.json();
        setProductdata(res.gameData);
        setFilter(res.gameData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleInput = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    const result = productdata.filter((item) =>
      item.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilter(result);
  };

  return (
    <React.Fragment>
      <div className="SearchBar grid">
              <div className="SearchBox flex">
                <HiSearch className="icon"/>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleInput}
                />
              </div>
              <div className={query.length ? "SearchList" : ''}>
                {query.length > 0 &&
                  filter.map((pdata, index) => (
                    <GameList imgSrc={`http://localhost:8000/games/${pdata.image}`} key={index} gameName={pdata.name}/>
                  ))}
              </div>
      </div>
    </React.Fragment>
  );
};

export default SearchBar;