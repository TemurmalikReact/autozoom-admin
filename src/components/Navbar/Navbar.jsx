import { Button } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useSidebarCollapse } from "../../zustand/SidebarCollapseStore";
import { useTokenStore } from "../../zustand/TokenStore";
import styles from "./Navbar.module.scss";

function Navbar(props) {
  const { isSidebarCollapse, toggleSidebarCollapse } = useSidebarCollapse();
  const clearToken = useTokenStore((state) => state.clearToken);

  return (
    <div className={`${styles.navbar__container} ${isSidebarCollapse ? styles.navbar__container__collapsed : null}`}>
      <button onClick={toggleSidebarCollapse} className={styles.navbar__button}>
        {isSidebarCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </button>
      <div className={styles.navbar__user}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" xmlSpace="preserve"><path d="M16 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zm0-12c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zM27 32a1 1 0 0 1-1-1v-6.115a6.95 6.95 0 0 0-6.942-6.943h-6.116A6.95 6.95 0 0 0 6 24.885V31a1 1 0 1 1-2 0v-6.115c0-4.93 4.012-8.943 8.942-8.943h6.116c4.93 0 8.942 4.012 8.942 8.943V31a1 1 0 0 1-1 1z" /></svg>
        <p className={styles.navbar__user_admin}>Admin</p>
        <button className={styles.navbar__user_logout} onClick={clearToken}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
