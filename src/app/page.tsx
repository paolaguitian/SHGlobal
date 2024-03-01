'use client'

import Image from "next/image";
import styles from "./page.module.css";
import React, { useState } from "react";
import { Button } from "antd";
import { DocUpload } from "./components/docUpload/docUpload";
import Logo from './shg-horiz.png';

export default function Home() {
  const [showModal, setShowModal] = useState(false)

  const renderDocUpload = () => <DocUpload visible={showModal} closeModal={() => setShowModal(false)} />
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <Image
          className={styles.logo}
          src={Logo}
          alt="Sky Hop Logo"
          width={400}
          height={60}
          priority
        />
      </div>
      <Button
        onClick={() => (setShowModal(true))}
        className={styles.mainButton}
      >
        Upload a Document
      </Button>
      {showModal && renderDocUpload()}
    </main>
  );
}
