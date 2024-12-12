"use client";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import GroupsIcon from "@mui/icons-material/Groups";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import WebIcon from "@mui/icons-material/Web";
import QuizIcon from "@mui/icons-material/Quiz";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { IconButton, Typography } from "@mui/material";
import { useTheme } from "next-themes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MenuItem, ProSidebar, Menu } from "react-pro-sidebar";
// import {
//   ArrowBackIosIcon,
//   ArrowForwardIosIcon,
//   OndemandVideoIcon,
//   VideoCallIcon,
//   ExitToAppIcon,
// } from "./icon";
import Image from "next/image";
import avatarDefault from "../../../../public/asstes/avatar.png";

interface ItemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: (value: string) => void;
}

const Item = ({ title, to, icon, selected, setSelected }: ItemProps) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
      className={`menu-item ${selected === title ? "active" : ""}`}
      style={{
        margin: "10px 0",
        transition: "background-color 0.3s, color 0.3s",
        borderRadius: "8px",
        padding: "10px",
        backgroundColor: selected === title ? "#3f51b5" : "transparent",
        color: selected === title ? "#fff" : "inherit",
      }}
    >
      <Link href={to} passHref>
        <Typography
          className="!text-[15px] !font-Poppins cursor-pointer hover:underline"
          component="a"
          style={{
            color: selected === title ? "#fff" : "inherit",
          }}
        >
          {title}
        </Typography>
      </Link>
    </MenuItem>
  );
};

const TeacherSidebar = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [logout, setLogout] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return null;
  }

  const logoutHandler = () => {
    setLogout(true);
  };

  return (
    <div
      style={{
        background: theme === "dark"
          ? "linear-gradient(180deg, #1a1f37 0%, #1c253c 100%)"
          : "linear-gradient(180deg, #ffffff 0%, #f4f6fa 100%)",
        boxShadow: theme === "dark"
          ? "0 4px 15px 0 rgba(0,0,0,0.3)"
          : "0 4px 15px 0 rgba(0,0,0,0.05)",
        height: "100vh",
        overflowY: "auto",
        transition: "all 0.3s ease",
        width: isCollapsed ? "5rem" : "16rem",
        position: "fixed",
        top: 0,
        left: 0,
      }}
      className={`transition-all duration-300 ${isCollapsed ? "w-[5rem]" : "w-[16rem]"}`}
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          height: "100vh",
          transition: "all 0.3s ease-in-out",
          width: isCollapsed ? "5rem" : "16rem",
        }}
      >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <ArrowForwardIosIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              position: "sticky",
              top: 0,
              background: "inherit",
              zIndex: 1,
            }}
          >
            {!isCollapsed && (
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginLeft: "15px" }}
              >
                <Link href="/">
                  <h3 className="text-[22px] font-semibold tracking-wide dark:text-white text-gray-800 hover:opacity-90 transition-opacity">
                    ELearning
                  </h3>
                </Link>
                <IconButton
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="hover:bg-opacity-10 hover:bg-gray-600 rounded-full transition-all duration-200"
                >
                  <ArrowBackIosIcon className="text-gray-600 dark:text-gray-300 w-5 h-5" />
                </IconButton>
              </div>
            )}
          </MenuItem>

          {!isCollapsed && (
            <div
              style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "2rem", paddingBottom: "1.5rem", position: "sticky", top: "4rem", background: "inherit", zIndex: 1 }}
              className="transition-all duration-300"
            >
              <div className="relative group">
                <Image
                  alt="profile-user"
                  width={90}
                  height={90}
                  src={user.avatar ? user.avatar.url : avatarDefault}
                  className="rounded-full transition-transform duration-300 group-hover:scale-105"
                  style={{
                    border: `3px solid ${theme === "dark" ? "#5b6fe6" : "#3f51b5"}`,
                  }}
                />
                <div className="absolute inset-0 rounded-full bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              </div>
              <Typography
                variant="subtitle1"
                className="mt-3 font-semibold text-base tracking-wide"
                style={{ color: theme === "dark" ? "#e3e4ff" : "#3f51b5" }}
              >
                {user?.name}
              </Typography>
              <Typography
                variant="caption"
                className="text-sm opacity-80"
                style={{ color: theme === "dark" ? "#aaa" : "#666" }}
              >
                {user?.role}
              </Typography>
            </div>
          )}

          <div
            style={{ paddingLeft: isCollapsed ? undefined : "10%", marginTop: "1.5rem" }}
            className="space-y-2"
          >
            <Item
              title="Live Courses"
              to="/teacher/courses"
              icon={<OndemandVideoIcon className="w-5 h-5" />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Create Course"
              to="/teacher/create-course"
              icon={<VideoCallIcon className="w-5 h-5" />}
              selected={selected}
              setSelected={setSelected}
            />
            <div onClick={logoutHandler} className="mt-4">
              <Item
                title="Logout"
                to="/"
                icon={<ExitToAppIcon w-5 h-5 />}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
          </div>
        </Menu>
      </ProSidebar>
    </div>
  );
};

export default TeacherSidebar;
