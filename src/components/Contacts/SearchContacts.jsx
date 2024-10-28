import React, { useContext } from "react";
import { BsSearch } from "react-icons/bs";
import { ContactContext } from "../../context/contactContext";

const SearchContacts = () => {
  const { contactSearch } = useContext(ContactContext);
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="جستجوی مخاطب"
        onChange={(e) => contactSearch(e.target.value)}
      />
      <i>
        <BsSearch />
      </i>
    </div>
  );
};

export default SearchContacts;
