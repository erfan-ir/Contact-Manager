import React from "react";
import SearchContacts from "./Contacts/SearchContacts";
import { Link, useLocation } from "react-router-dom";
import { BsPersonPlusFill } from "react-icons/bs";
import Spinner from "./Spinner";

const Navbar = ({ loading }) => {
  const location = useLocation();
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section>
          {location.pathname === "/contacts" ? (
            <nav className="navbar">
              <h1>وب اپلیکیشن جستجوی مخاطبین</h1>
              <SearchContacts />
            </nav>
          ) : (
            <h1
              style={{
                margin: "0 auto",
                textAlign: "center",
                marginTop: "10px",
                color: "#fecc1b",
              }}
            >
              وب اپلیکیشن جستجوی مخاطبین
            </h1>
          )}
          <div className="add-contact">
            {location.pathname === "/contacts" ? (
              <Link to={"contacts/add"}>
                {" "}
                <button>
                  {" "}
                  <BsPersonPlusFill />
                </button>
              </Link>
            ) : null}
          </div>
        </section>
      )}
    </>
  );
};

export default Navbar;
