import React, { useEffect, useState } from "react";
import { FaFastBackward } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { getContact } from "../../services/contactService";

const ViewContact = () => {
  const { contactId } = useParams();
  const [contact, setContact] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: contactData } = await getContact(contactId);
        setContact(contactData);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <section id="view-container">
        <div className="contact-info">
          <ul>
            <li>
              نام و نام خانوادگی: <span>{`${contact.fullname}`}</span>
            </li>
            <li>
              شماره تماس: <span>{`${contact.mobile}`}</span>
            </li>
            <li>
              ادرس ایمیل <span>{`${contact.email}`}</span>
            </li>
            <li>
              شغل: <span>{`${contact.job}`}</span>
            </li>
            <li>
              گروه: <span>{`${contact.group}`}</span>
            </li>
          </ul>
        </div>
        <div className="contact-photo">
          <img src={contact.photo} alt="contact" />
        </div>
        <Link to="/contacts">
          <FaFastBackward />
        </Link>
      </section>
    </>
  );
};

export default ViewContact;
