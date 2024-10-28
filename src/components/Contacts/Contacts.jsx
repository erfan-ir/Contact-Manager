import React, { useContext } from "react";
import { ContactContext } from "../../context/contactContext";
import Spinner from "../Spinner";
import Contact from "./Contact";

const Contacts = () => {
  const { loading, contacts, removeContact } = useContext(ContactContext);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="contacts-container">
          {contacts.length > 0 ? (
            contacts.map((c) => <Contact key={c.id} contact={c} />)
          ) : (
            <div>مخاطبی یافت نشد</div>
          )}
        </div>
      )}
    </>
  );
};

export default Contacts;
