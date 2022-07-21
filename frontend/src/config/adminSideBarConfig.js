import React from "react";
import {
    FaFire,
    FaUsers,
    FaBoxOpen,
    FaTag,
    FaMailBulk,
    FaSubscript,
    FaComment,
    FaCommentDots,
    FaRegCommentDots
} from "react-icons/fa";

export const ADMIN_SIDEBAR_CONFIG = [
    {
        label: "dashboard"
    },
    {
        name: "Das",
        url: "",
        icon: <FaFire className="mx-2 icon" />,
        subheading: 'dashboard'
    },
    {
        label: "shop"
    },
    {
        name: "Users",
        url: "users",
        icon: <FaUsers className="mx-2 icon" />,
        subheading: 'users',
    },
    {
        name: "Products",
        url: "products",
        icon: <FaBoxOpen className="mx-2 icon" />,
        subheading: 'shop'
    },
    {
        label: "users"
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
     {
        name: "Comments",
        url: "comments",
        icon: <FaCommentDots className="mx-2 icon" />,
        subheading: 'users'
    },

]
