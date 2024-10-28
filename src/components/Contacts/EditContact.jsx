import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getAllContacts,
  getContact,
  updateContact,
} from "../../services/contactService";
import Spinner from "../Spinner";
import { ContactContext } from "../../context/contactContext";
import { toast } from "react-toastify";
import { contactSchema } from "../../validation/contactValidation";

const EditContact = () => {
  let { contactId } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState({});
  const { groups, setLoading, setContacts, contacts, loading } =
    useContext(ContactContext);

  /**NOTE
   * start Coding
   */
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: contactData } = await getContact(contactId);
        setContact(contactData);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err.message);
      }
    };
    fetchData();
  }, [contactId, setLoading]);

  const submitForm = async (values) => {
    try {
      setLoading(true);
      const { data, status } = await updateContact(values, contactId);
      if (status === 200) {
        setLoading(false);
        toast.success("مخاطب ویرایش شد");
        const allContact = [...contacts];
        const contactIndex = allContact.findIndex(
          (c) => c.id === parseInt(contactId)
        );
        allContact[contactIndex] = { ...data };
        setContacts(allContact);
        const { data: newAllContacts } = await getAllContacts();
        navigate("/contacts");
        setContacts(newAllContacts);
      }
    } catch (err) {
      setLoading(false);
      toast.error(`${err.message}`);
      navigate("/contacts");
      console.log(err.message);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section id="edit-container">
          <Formik
            initialValues={contact}
            onSubmit={(values) => submitForm(values)}
            validationSchema={contactSchema}
          >
            <Form>
              <Field
                type="text"
                name="fullname"
                placeholder={"نام و نام خانوادگی"}
              />
              <ErrorMessage name="fullname">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>

              <Field type="text" name="photo" placeholder="آدرس تصویر" />
              <ErrorMessage name="photo">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>
              <Field type="email" name="email" placeholder="آدرس ایمیل" />
              <ErrorMessage name="email">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>
              <Field type="number" name="mobile" placeholder="شماره موبایل" />
              <ErrorMessage name="mobile">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>
              <Field type="text" name="job" placeholder="شغل" />
              <ErrorMessage name="job">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>
              <Field as="select" name="group" placeholder="گروه" id="select">
                <ErrorMessage name="select">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
                <option>انتخاب گروه</option>
                {groups.map((group) => (
                  <option
                    value={group.name}
                    name="group"
                    id="group"
                    key={group.id}
                  >
                    {`${group.name}`}
                  </option>
                ))}
              </Field>
              <div>
                <button type="submit">ویرایش مخاطب</button>
                <Link to="/contacts">انصراف</Link>
              </div>
            </Form>
          </Formik>
          <div className="edit-img-info">
            <img src={contact.photo} alt="contact" />
          </div>
        </section>
      )}
    </>
  );
};

export default EditContact;
