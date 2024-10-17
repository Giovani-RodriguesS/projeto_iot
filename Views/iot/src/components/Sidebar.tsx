
import React from "react";
import Image from "next/image";
import Navbar from "./Navbar";

export default function Sidebar() {

  return (
    <aside className="sidebar">
      <Image src="/images/logo.png" width={750} height={0}
        className="h-20 mb-4 rounded-lg"alt="logo"
      />
    <Navbar />
    </aside>
    
  );
}


//mb => <margin-bottom>
// mr - margin-right
// p - padding
