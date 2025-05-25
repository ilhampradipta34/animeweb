import { FaFacebook, FaHome, FaInstagram, FaLinkedin, FaListUl, FaMedal, FaTiktok, FaYoutube } from "react-icons/fa"
import { GrSchedules } from "react-icons/gr";
import { FaXTwitter } from "react-icons/fa6";


const NAV_ITEMS = [
    {label: "Home", href:"/"},
    {label: "List Anime", href:"/list-anime"},
    {label: "Top Anime", href:"/top-anime"},
    {label: "Jadwal Rilis", href:"/jadwal-rilis"},
]

const NAV_ITEMS_MOBILE = [
    {label: "Home", href:"/", icon: <FaHome />},
    {label: "List Anime", href:"/list-anime", icon: <FaListUl />},
    {label: "Top Anime", href:"/top-anime", icon: <FaMedal />},
    {label: "Jadwal Rilis", href:"/jadwal-rilis", icon: <GrSchedules />},
]


const SOCIALS_ITEMS = [
    {label: "Facebook", href:"https://facebook.com", icon: <FaFacebook/> },
    {label: "Instagram", href:"https://instagram.com", icon: <FaInstagram/> },
    {label: "Linkedin", href:"https://linkedin.com", icon: <FaLinkedin/> },
    {label: "Tiktok", href:"https://tiktok.com", icon: <FaTiktok/> },
    {label: "X", href:"https://x.com", icon: <FaXTwitter /> },
    {label: "Youtube", href:"https://youtube.com", icon: <FaYoutube/> },
]

export {NAV_ITEMS, SOCIALS_ITEMS, NAV_ITEMS_MOBILE}