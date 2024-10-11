import React from "react";
import SearchContacts from "./Contacts/SearchContacts";

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <h1>وب اپلیکیشن جستجوی مخاطبین</h1>
        <SearchContacts />
      </nav>
    </>
  );
};

export default Navbar;
