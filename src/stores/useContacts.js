import { create } from 'zustand';

const useContacts = create((set) => ({
  contacts: [],
  addContact: (id, name, phoneNumber, profile) =>
    set((state) => ({ contacts: [...state.contacts, { id, name, phoneNumber, profile }] })),
  deleteContact: (id) =>
    set((state) => ({
      contacts: state.contacts.filter((contact) => contact.id !== id),
    })),
}));

export default useContacts;
