import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { GoHistory } from "react-icons/go";
import { FaRegNoteSticky } from "react-icons/fa6";
import { BsGridFill } from "react-icons/bs";
import { PiFinnTheHuman } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa";

export const items = [
  {
    name: "Dashboard",
    Icon: BsGridFill,
    link: "/dashboard",
  },
  {
    name: "My Library",
    Icon: PiFinnTheHuman,
    link: "/mylibrary",
  },
  {
    name: "Test",
    Icon: FaRegNoteSticky,
    link: "/test",
    child: [
      {
        name: "Create a test",
        link: "/maketest",
      },
      {
        name: "History",
        link: "/history",
      },
    ],
  },
  {
    name: "Favorite",
    Icon: FaRegStar,
    link: "/favorite",
  },
  {
    name: "Adminstration",
    Icon: MdOutlineAdminPanelSettings,
    link: "/admin",
  },
];
