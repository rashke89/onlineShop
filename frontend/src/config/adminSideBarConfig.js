import React from "react";
import {FaFire, FaUsers, FaBoxOpen, FaTag, FaMailBulk, FaSubscript} from "react-icons/fa";

export const ADMIN_SIDEBAR_CONFIG = [
    {
        name: "Das",
        url: "",
        icon: <FaFire className="mx-2 icon" />,
        subheading: 'dashboard'
    },
    {
        name: "Users",
        url: "users",
        icon: <FaUsers className="mx-2 icon" />,
        subheading: 'users'
    },
    {
        name: "Products",
        url: "products",
        icon: <FaBoxOpen className="mx-2 icon" />,
        subheading: 'shop'
    },
    {
        name: "Categories",
        url: "categories",
        icon: <FaTag className="mx-2 icon" />,
        subheading: 'shop'
    },
    {
        name: "Mails",
        url: "emails",
        icon: <FaMailBulk className="mx-2 icon" />,
        subheading: 'users'
    },
    {
        name: "Subs",
        url: "subs",
        icon: <FaSubscript className="mx-2 icon" />,
        subheading: 'users'
    },

]
