import React from "react";
import {FaFire, FaUsers, FaBoxOpen, FaTag, FaMailBulk, FaSubscript} from "react-icons/fa";

export const ADMIN_SIDEBAR_CONFIG = [
    {
        name: "Das",
        url: "",
        icon: <FaFire className="mx-2 icon" />
    },
    {
        name: "Users",
        url: "users",
        icon: <FaUsers className="mx-2 icon" />
    },
    {
        name: "Products",
        url: "products",
        icon: <FaBoxOpen className="mx-2 icon" />
    },
    {
        name: "Categories",
        url: "categories",
        icon: <FaTag className="mx-2 icon" />
    },
    {
        name: "Mails",
        url: "emails",
        icon: <FaMailBulk className="mx-2 icon" />
    },
    {
        name: "Subs",
        url: "subs",
        icon: <FaSubscript className="mx-2 icon" />
    },

]
