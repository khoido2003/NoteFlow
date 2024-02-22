import { create } from "zustand";

type SearchStore = {
  isOpen: boolean;
  onOpen: () => void;
  onLCose: () => void;
  toggle: () => void;
};
