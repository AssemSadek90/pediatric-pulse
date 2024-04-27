import styles from "../styles/navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

const Navbar = () => {
  return (
    <nav className="bg-black w-screen h-24 grid grid-cols-2 items-center px-24 sticky top-0 z-50">
      <div className="pl-10">
        <Link className="w-72 flex" href="/">
          <Image
            className="w-72 h-24 p-2"
            src="/logoSmall.png"
            alt="logo"
            width={1080}
            height={1}
          />
        </Link>
      </div>
      <div className="flex justify-end gap-2 h-full">
        <Link href="/Login">
          <button className={styles.btn}>Existing User</button>
        </Link>
        <Link href="/Signup">
          <button className={styles.btn}>New User</button>
        </Link>

      </div>
    </nav>
  );
};
export default Navbar;
