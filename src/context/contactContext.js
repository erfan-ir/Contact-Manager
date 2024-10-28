import { createContext } from "react";

export const ContactContext = createContext({
  loading: false,
  setloading: () => {},
  contacts: [],
  setContacts: () => {},
  groups: [],
  createContact: () => {},
  contactSearch: () => {},
});
