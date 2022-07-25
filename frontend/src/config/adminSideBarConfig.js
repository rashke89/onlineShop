import React from "react";
import {FaUsers, FaBoxOpen, FaTag, FaMailBulk, FaSubscript} from "react-icons/fa";

export const ADMIN_SIDEBAR_CONFIG = [
    {
        name: "Users",
        url: "users",
        icon: <FaUsers className="mx-2" />
    },
    {
        name: "Products",
        url: "products",
        icon: <FaBoxOpen className="mx-2" />
    },
    {
        name: "Categories",
        url: "categories",
        icon: <FaTag className="mx-2" />
    },
    {
        name: "Mails",
        url: "mails",
        icon: <FaMailBulk className="mx-2" />
    },
    {
        name: "Subs",
        url: "subs",
        icon: <FaSubscript className="mx-2" />
    },

]
