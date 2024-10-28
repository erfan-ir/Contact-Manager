import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ContactContext } from "./context/contactContext.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAllContacts,
  getAllGroups,
  createContact,
  deleteContact,
} from "./services/contactService.js";
import {
  Navbar,
  AddContact,
  Contacts,
  EditContact,
  ViewContact,
} from "./components/index.jsx";

/**NOTE
 * useNavigate
 */

function App() {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();
        setContacts(contactsData);
        setGroups(groupsData);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        if (err) {
          console.log(err.message);
          setLoading(false);
        }
      }
    };
    fetchData();
  }, []);

  const createContactFrom = async (values) => {
    try {
      setLoading(true);
      const { status, data } = await createContact(values);
      const allContacts = [...contacts, data];
      if (status === 201) {
        toast.success("مخاطب با موفقیت ساخته شد 🚀");
        setLoading(false);
        navigate("/contacts");
        setContacts(allContacts);
      }
    } catch (err) {
      <div>مشکلی پیش آمده مجدد تلاش کنید</div>;
    }
  };
  const removeContact = async (contactId) => {
    const allContacts = [...contacts];
    try {
      const updateContacts = contacts.filter((c) => c.id !== contactId);
      setContacts(updateContacts);
      const { status } = await deleteContact(contactId);
      if (status === 200) {
        toast.success("مخاطب حذف شد");
      }
    } catch (err) {
      console.log(err.message);
      setContacts(allContacts);
      toast.error("وای! نتونستم پاکش کنم.");
      setLoading(false);
    }
  };
  const contactSearch = async (v) => {
    if (v) {
      const searchUser = contacts.filter((c) => {
        return c.fullname.toLowerCase().includes(v.toLowerCase());
      });
      setContacts(searchUser);
    } else {
      const { data: newData } = await getAllContacts();
      setContacts(newData);
    }
  };

  return (
    <ContactContext.Provider
      value={{
        loading,
        setLoading,
        contacts,
        groups,
        setContacts,
        createContact: createContactFrom,
        removeContact,
        contactSearch,
      }}
    >
      <div className="container">
        <ToastContainer rtl={true} autoClose={1000} />
        <Navbar />
        <Routes>
          console.log(getAllContacts())
          <Route path="/" element={<Navigate to="/contacts" />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="contacts/add" element={<AddContact />} />
          <Route path="contacts/view/:contactId" element={<ViewContact />} />
          <Route path="contacts/:contactId" element={<EditContact />} />
        </Routes>
      </div>
    </ContactContext.Provider>
  );
}

export default App;
