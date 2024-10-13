import { useSidebarCollapse } from "../../zustand/SidebarCollapseStore";
import { Link, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.scss";

const items = [
  {
    key: "1",
    icon: <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>dashboard-tile</title> <g id="Layer_2" data-name="Layer 2"> <g id="invisible_box" data-name="invisible box"> <rect width="48" height="48" fill="none"></rect> </g> <g id="icons_Q2" data-name="icons Q2"> <path d="M18,34v6H10V34h8m2-4H8a2,2,0,0,0-2,2V42a2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V32a2,2,0,0,0-2-2Z"></path> <path d="M18,8V22H10V8h8m2-4H8A2,2,0,0,0,6,6V24a2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V6a2,2,0,0,0-2-2Z"></path> <path d="M38,8v6H30V8h8m2-4H28a2,2,0,0,0-2,2V16a2,2,0,0,0,2,2H40a2,2,0,0,0,2-2V6a2,2,0,0,0-2-2Z"></path> <path d="M38,26V40H30V26h8m2-4H28a2,2,0,0,0-2,2V42a2,2,0,0,0,2,2H40a2,2,0,0,0,2-2V24a2,2,0,0,0-2-2Z"></path> </g> </g> </g></svg>,
    title: "Dashboard",
    link: "/",
  },
  {
    key: "2",
    icon: <svg viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="m1739.34 1293.414-105.827 180.818-240.225-80.188-24.509 22.25c-69.91 63.586-150.211 109.666-238.644 136.771l-32.076 9.94-49.468 244.065H835.584l-49.468-244.179-32.076-9.939c-88.432-27.105-168.734-73.185-238.644-136.771l-24.508-22.25-240.226 80.189-105.826-180.82 189.74-164.442-7.453-32.978c-10.39-45.742-15.586-91.483-15.586-135.869 0-44.386 5.195-90.127 15.586-135.868l7.454-32.979-189.741-164.442 105.826-180.819 240.226 80.075 24.508-22.25c69.91-63.585 150.212-109.665 238.644-136.884l32.076-9.826 49.468-244.066h213.007l49.468 244.18 32.076 9.825c88.433 27.219 168.734 73.186 238.644 136.885l24.509 22.25 240.225-80.189 105.826 180.819-189.74 164.442 7.453 32.98c10.39 45.74 15.586 91.481 15.586 135.867 0 44.386-5.195 90.127-15.586 135.869l-7.454 32.978 189.741 164.556Zm-53.76-333.403c0-41.788-3.84-84.48-11.634-127.284l210.184-182.062-199.454-340.856-265.186 88.433c-66.974-55.567-143.322-99.388-223.85-128.414L1140.977.01H743.198l-54.663 269.704c-81.431 29.139-156.424 72.282-223.963 128.414L199.5 309.809.045 650.665l210.07 182.062c-7.68 42.804-11.52 85.496-11.52 127.284 0 41.789 3.84 84.48 11.52 127.172L.046 1269.357 199.5 1610.214l265.186-88.546c66.974 55.68 143.323 99.388 223.85 128.527l54.663 269.816h397.779l54.663-269.703c81.318-29.252 156.424-72.283 223.85-128.527l265.186 88.546 199.454-340.857-210.184-182.174c7.793-42.805 11.633-85.496 11.633-127.285ZM942.075 564.706C724.1 564.706 546.782 742.024 546.782 960c0 217.976 177.318 395.294 395.294 395.294 217.977 0 395.294-177.318 395.294-395.294 0-217.976-177.317-395.294-395.294-395.294m0 677.647c-155.633 0-282.353-126.72-282.353-282.353s126.72-282.353 282.353-282.353S1224.43 804.367 1224.43 960s-126.72 282.353-282.353 282.353" fill-rule="evenodd"></path> </g></svg>,
    title: "Settings",
    link: "/categories",
  },
  {
    key: "3",
    icon: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M5.13238 1C4.07859 1 3.10207 1.5529 2.5599 2.45651L0.615776 5.69672C0.17816 6.42608 0.0121122 7.42549 0.508798 8.32014C0.789678 8.82607 1.27459 9.55181 2 10.1205V20C2 21.6569 3.34315 23 5 23H8C9.10457 23 10 22.1046 10 21V15H14V21C14 22.1046 14.8954 23 16 23H19C20.6569 23 22 21.6569 22 20V10.1205C22.7254 9.55181 23.2103 8.82607 23.4912 8.32014C23.9879 7.42548 23.8218 6.42608 23.3842 5.69672L21.4401 2.45651C20.8979 1.5529 19.9214 1 18.8676 1H5.13238ZM20 10.9697C19.8391 10.9895 19.6725 11 19.5 11C18.1259 11 17.1126 10.3216 16.4364 9.60481C16.2632 9.4211 16.1082 9.23119 15.9705 9.04325C15.2167 9.98812 13.9542 11 12 11C10.0458 11 8.7833 9.98812 8.02952 9.04325C7.89183 9.23119 7.73684 9.4211 7.56355 9.60481C6.8874 10.3216 5.87405 11 4.5 11C4.32752 11 4.16089 10.9895 4 10.9697V20C4 20.5523 4.44772 21 5 21H8V15C8 13.8954 8.89543 13 10 13H14C15.1046 13 16 13.8954 16 15V21H19C19.5523 21 20 20.5523 20 20V10.9697ZM4.27489 3.4855C4.45561 3.1843 4.78112 3 5.13238 3H18.8676C19.2189 3 19.5444 3.1843 19.7251 3.4855L21.6692 6.72571C21.8324 6.99765 21.8127 7.2231 21.7426 7.34937C21.2851 8.17345 20.5493 9 19.5 9C18.8448 9 18.323 8.69006 17.8913 8.23245C17.4506 7.76524 17.1659 7.20393 17.0284 6.88399C16.8114 6.37951 16.3329 6.21388 16.0033 6.21248C15.674 6.21109 15.1982 6.37172 14.9752 6.8683C14.6702 7.54754 13.7982 9 12 9C10.2018 9 9.32978 7.54754 9.0248 6.8683C8.80182 6.37172 8.32598 6.21109 7.99667 6.21248C7.66706 6.21388 7.18855 6.37951 6.97164 6.88399C6.83407 7.20393 6.5494 7.76524 6.10869 8.23245C5.67703 8.69006 5.15524 9 4.5 9C3.45065 9 2.71491 8.17345 2.2574 7.34937C2.1873 7.2231 2.1676 6.99765 2.33076 6.72571L4.27489 3.4855Z" fill="#0F0F0F"></path> </g></svg>,
    title: "Brands",
    link: "/brands",
  },
  {
    key: "4",
    icon: <svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M13,14H9a1,1,0,0,0,0,2h4a1,1,0,0,0,0-2ZM17,4H15.82A3,3,0,0,0,13,2H11A3,3,0,0,0,8.18,4H7A3,3,0,0,0,4,7V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V7A3,3,0,0,0,17,4ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm8,14a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V7A1,1,0,0,1,7,6H8V7A1,1,0,0,0,9,8h6a1,1,0,0,0,1-1V6h1a1,1,0,0,1,1,1Zm-3-9H9a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2Z"></path></g></svg>,
    title: "Models",
    link: "/models",
  },
  {
    key: "5",
    icon: <svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M19 2H9c-1.103 0-2 .897-2 2v6H5c-1.103 0-2 .897-2 2v9a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4c0-1.103-.897-2-2-2zM5 12h6v8H5v-8zm14 8h-6v-8c0-1.103-.897-2-2-2H9V4h10v16z"></path><path d="M11 6h2v2h-2zm4 0h2v2h-2zm0 4.031h2V12h-2zM15 14h2v2h-2zm-8 .001h2v2H7z"></path></g></svg>,
    title: "Cities",
    link: "/cities",
  },
  {
    key: "6",
    icon: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M3 7.29412V8V11C3 10.4477 2.55228 10 2 10C1.44772 10 1 10.4477 1 11V13C1 13.5523 1.44772 14 2 14C2.55228 14 3 13.5523 3 13V14V16V17.8824C3 18.7868 3.37964 19.6274 4 20.2073V22C4 22.5523 4.44772 23 5 23H6C6.55228 23 7 22.5523 7 22V21H17V22C17 22.5523 17.4477 23 18 23H19C19.5523 23 20 22.5523 20 22V20.2073C20.6204 19.6274 21 18.7868 21 17.8824V16V14V13C21 13.5523 21.4477 14 22 14C22.5523 14 23 13.5523 23 13V11C23 10.4477 22.5523 10 22 10C21.4477 10 21 10.4477 21 11V8V7.29412C21 5.99868 20.7518 4.90271 20.2417 4.00093C19.727 3.091 18.9841 2.44733 18.1114 2.00201C16.4263 1.14214 14.2016 1 12 1C9.79836 1 7.57368 1.14214 5.88861 2.00201C5.01594 2.44733 4.27305 3.091 3.7583 4.00093C3.24816 4.90271 3 5.99868 3 7.29412ZM18 19C18.4992 19 19 18.5542 19 17.8824V16V14C19 13.4477 18.5523 13 18 13H6C5.44772 13 5 13.4477 5 14V16V17.8824C5 18.5542 5.5008 19 6 19H18ZM18 7C18.5523 7 19 7.44772 19 8V11.1707C18.6872 11.0602 18.3506 11 18 11H6C5.64936 11 5.31278 11.0602 5 11.1707V8C5 7.44772 5.44772 7 6 7H18ZM18.5009 4.98568C18.5124 5.006 18.5238 5.02663 18.535 5.04757C18.3614 5.01632 18.1826 5 18 5H6C5.8174 5 5.63862 5.01631 5.46502 5.04756C5.47622 5.02663 5.48757 5.006 5.49906 4.98568C5.79396 4.46439 6.22263 4.07691 6.79768 3.78347C8.00804 3.16583 9.78336 3 12 3C14.2166 3 15.992 3.16583 17.2023 3.78347C17.7774 4.07691 18.206 4.46439 18.5009 4.98568ZM6 15.5C6 14.6716 6.67157 14 7.5 14C8.32843 14 9 14.6716 9 15.5C9 16.3284 8.32843 17 7.5 17C6.67157 17 6 16.3284 6 15.5ZM16.5 14C15.6716 14 15 14.6716 15 15.5C15 16.3284 15.6716 17 16.5 17C17.3284 17 18 16.3284 18 15.5C18 14.6716 17.3284 14 16.5 14Z" fill="#000000"></path> </g></svg>,
    title: "Cars",
    link: "/cars",
  },
];

function Sidebar() {
  const { isSidebarCollapse } = useSidebarCollapse();
  const location = useLocation();

  return (
    <div className={`${styles.sidebar} ${isSidebarCollapse ? styles.sidebar__collapsed : null}`}>
      <Link to="/" className={`${styles.sidebar__logo} ${location.pathname === '/' ? styles.none : null}`}>
        <img
          src="https://autozoom-admin-nine.vercel.app/assets/autozoom-CM99tOti.svg"
          alt="logo"
          className={styles.sidebar__logo__img}
        />
        <p className={styles.sidebar__logo__text}>autozoom-admin</p>
      </Link>

      {items.map((item) => (
        <Link to={item.link} key={item.key}>
          <div
            className={`${styles.sidebar__menu_item} ${location.pathname === item.link ? styles.active : null}`}
          >
            <div className={styles.sidebar__menu_item__icon}>{item.icon}</div>
            <div className={styles.sidebar__menu_item__title}>{item.title}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Sidebar;
