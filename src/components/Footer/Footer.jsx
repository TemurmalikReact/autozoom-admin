import React from "react";
import { useSidebarCollapse } from "../../zustand/SidebarCollapseStore";
import styles from "./Footer.module.scss";

function Footer(props) {
  const { isSidebarCollapse } = useSidebarCollapse();

  return (
    <div className={styles.footer__container}>
      <div
        className={`${styles.footer__content} ${
          isSidebarCollapse ? styles.footer__sidebar_collapsed : styles.footer__sidebar_expanded
        }`}
      >
        <span className={styles.footer__text}>
          © Copyright Autozoom.uz 2023-2024
        </span>
      </div>
    </div>
  );
}

export default Footer;
