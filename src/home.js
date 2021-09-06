import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { FaSearch } from "react-icons/fa";
import BookComponent from "./book-list";

import "./home.css";

const HomeComponent = () => {

  const [listOfAllBooks, setBookList] = useState();
  const [listOfFilteredBooks, setFilteredList] = useState();
  const [showList, setShowList] = useState();
  const [userInput, setUserInput] = useState();

  useEffect(() => {
    // On load fetch data, as dataset is smaller. 
      fetch(
        "https://dk-frontend-test.s3.eu-west-1.amazonaws.com/test-index.json"
      )
        .then((response) => response.json())
        .then((data) => {
          setBookList(data.response.docs);
        })
        .catch((error) => console.log(error.json()));
  },[]);

  const searchList = (event) => {
    const userInput = event.currentTarget.value.toLowerCase();
    setUserInput(userInput);
    const listOfItems = listOfAllBooks
      .filter((book) => book.displayName.toLowerCase().includes(userInput))
      .sort((a, b) => (a.price > b.price ? -1 : 1));
    setFilteredList([...listOfItems]);
    !showList && setShowList(true);
  };

  const sortList = (event) => {
    const sortOrder = event.currentTarget.value;
    const sortedList =
      sortOrder === "desc"
        ? listOfFilteredBooks.sort((a, b) => (a.price > b.price ? -1 : 1))
        : sortOrder === "asc"
        ? listOfFilteredBooks.sort((a, b) => (a.price < b.price ? -1 : 1))
        : sortOrder === "new"
        ? listOfFilteredBooks.sort((a, b) =>
            a.publishDate > b.publishDate ? -1 : 1
          )
        : listOfFilteredBooks.sort((a, b) => (a.price > b.price ? -1 : 1));
    setFilteredList([...sortedList]);
  };

  return (
    <div>
      <div className="search-wrapper wrapper-skin">
        <img src="https://www.dk.com/assets/images/dk-logo.svg" alt="logo" className="brand-logo"></img>
        <input
          type="text"
          onChange={searchList}
          onKeyPress={(e) => e.key === 'Enter' && setShowList(false)}
          className="search-skin text-box"
        />
        <IconContext.Provider value={{ color: "white", size: "20px" }}>
          <button className="search-skin search-btn" onClick={() => setShowList(false)}>
            <FaSearch />
          </button>
        </IconContext.Provider>
      </div>
      {showList && (
        <div className="wrapper-skin">
          <div className="list-wrapper">
            <BookComponent
              list={listOfFilteredBooks}
              listOfFilteredBooks={listOfFilteredBooks}
            />
            <button className="list-btn" onClick={() => setShowList(false)}>
              View All {listOfFilteredBooks && listOfFilteredBooks.length}{" "}
              Book(s)
            </button>
          </div>
        </div>
      )}
      {(!showList && listOfFilteredBooks) && (
        <div className="dropdwn-wrapper">
          <p id="search-title">{`Search result for "${userInput}"`}</p>
          <div className="sort-dropdwn">
            <div>
              <p>Sort By:</p>
              <select onChange={sortList}>
                <option value="desc">Price(high to low)</option>
                <option value="asc">Price(low to high)</option>
                <option value="new">Newest First</option>
              </select>
            </div>
          </div>
          <div className="search-list-wrapper">
            <BookComponent list={listOfFilteredBooks} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeComponent;
