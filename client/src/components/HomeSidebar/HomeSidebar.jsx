"use client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./HomeSidebar.module.css";
import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems, SidebarLogo } from "flowbite-react";
import { HiArrowSmRight, HiInbox, HiTable, HiUser, HiViewBoards } from "react-icons/hi";

import getUserData from "../../api/getUserData";

export default function HomeSidebar() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: "",
    username: "",
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await getUserData();
        if (!res) {
          alert("토큰 유효시간 초과");
          return navigate("/");
        }
        setUser(res);
      } catch (err) {
        console.error("유저 정보 불러오기 실패:", err);
      }
    };
    getUser();
  }, [user]);

  return (
    <Sidebar aria-label="Sidebar with logo branding example" className={styles.board}>
      <SidebarLogo onClick={() => {
            navigate("/Home", {state: {content: "home"}});
          }} img="./favicon.ico" imgAlt="Flowbite logo">
        ELI WEB
      </SidebarLogo>
      <SidebarItems>
        <SidebarItemGroup className={styles.group}>
          <SidebarItem className={styles.user}>
            <label>ID: </label>
            {user.id}
            <br/>
            <label>NAME: </label>
            {user.username}
          </SidebarItem>
          <SidebarItem onClick={() => {
            navigate("/Home", {state: {content: "myPosts"}});
          }} icon={HiViewBoards}>
            My posts
          </SidebarItem>
          <SidebarItem onClick={() => {
            navigate("/Home", {state: {content: "newPost"}});
          }} icon={HiInbox}>
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
