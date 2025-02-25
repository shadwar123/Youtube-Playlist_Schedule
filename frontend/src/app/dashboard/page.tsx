import Navbar from "@/components/base/Navbar";
// import AddClash from "@/components/clash/AddClash";
import React from "react";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Home from "./Home";
// import { fetchClashs } from "../fetch/clashFetch";
// import ClashCard from "@/components/clash/ClashCard";

export default async function dashboard() {
  const session: CustomSession | null = await getServerSession(authOptions);
//   const clashs: Array<ClashType> | [] = await fetchClashs(
//     session?.user?.token!
//   );
  return (
    <div className="container">
      <Navbar />
      <Home/>
    </div>
  );
}