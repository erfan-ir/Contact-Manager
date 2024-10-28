import { Field, Formik, Form, ErrorMessage } from "formik";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ContactContext } from "../../context/contactContext";
import { contactSchema } from "../../validation/contactValidation.js";

const AddContact = () => {
  const { groups, createContact } = useContext(ContactContext);

  return (
    <>
      <section id="section-from">
        <Formik
          initialValues={{
            fullname: "",
            photo: "",
            mobile: "",
            email: "",
            job: "",
          }}
          onSubmit={(values) => {
            createContact(values);
          }}
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
            {}
            <div>
              <button type="submit">افزودن مخاطب</button>
              <Link to="/contacts">انصراف</Link>
            </div>
          </Form>
        </Formik>

        <img src={require("../../assets/gears.gif")} alt="gif" />
      </section>
    </>
  );
};

export default AddContact;
