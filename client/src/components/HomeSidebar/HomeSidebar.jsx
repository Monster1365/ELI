"use client";

import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems, SidebarLogo } from "flowbite-react";
import { HiArrowSmRight, HiInbox, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import styles from "./HomeSidebar.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import getUserData from "../../api/getUserData";

export default function HomeSidebar() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: "",
    username: "",
    email: ""
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await getUserData();
        console.log("User: ", res);
        setUser(res)
      } catch (err) {
        console.error("유저 정보 불러오기 실패:", err);
      }
    };
    getUser();
  }, []);

  return (
    <Sidebar aria-label="Sidebar with logo branding example" className={styles.board}>
      <SidebarLogo href="#" img="./favicon.ico" imgAlt="Flowbite logo">
        ELI WEB
      </SidebarLogo>
      <SidebarItems>
        <SidebarItemGroup className={styles.group}>
          <SidebarItem className={styles.user} href="#" icon={HiUser}>
            <label>ID: </label>
            {user.id}
            <br/>
            <label>NAME: </label>
            {user.username}
          </SidebarItem>
          <SidebarItem href="#" icon={HiViewBoards}>
            My posts
          </SidebarItem>
          <SidebarItem href="#" icon={HiInbox}>
            New post
          </SidebarItem>
          <SidebarItem href="#" icon={HiTable}>
            My Contract
          </SidebarItem>
          <SidebarItem
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
            href="#" icon={HiArrowSmRight}
          >
            Log Out
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
