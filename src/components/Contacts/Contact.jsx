import React, { useContext } from "react";
import { FaEye, FaPen, FaRecycle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ContactContext } from "../../context/contactContext";

const Contact = ({ contact }) => {
  const { removeContact } = useContext(ContactContext);
  return (
    <>
      <div className="card-container">
        <div className="card-photo">
          <img src={contact.photo} alt="contact.fullname" />
        </div>
        <div className="card-info">
          <ul>
            <li>
              نام و نام خانوادگی: <span>{`${contact.fullname}`}</span>
            </li>
            <li>
              شماره تماس: <span>{`${contact.mobile}`}</span>
            </li>
            <li>
              ادرس ایمیل: <span>{`${contact.email}`}</span>
            </li>
          </ul>
        </div>
        <div className="card-buttons">
          <Link to={`/contacts/view/${contact.id}`}>
            <i className="view-icon">
              <FaEye />
            </i>
          </Link>
          <Link to={`/contacts/${contact.id}`}>
            <i className="edit-icon">
              <FaPen />
            </i>
          </Link>
          <button onClick={() => removeContact(contact.id)}  id="btn-edit">
            <i className="delete-icon">
              <FaRecycle />
            </i>
          </button>
        </div>
      </div>
    </>
  );
};

export default Contact;
