'use client'

import Image from "next/image";
import styles from "./page.module.css";
import React, { useState } from "react";
import { Button } from "antd";
import { DocUpload } from "./components/docUpload/docUpload";

export default function Home() {
  const [showModal, setShowModal] = useState(false)

  const renderDocUpload = () => <DocUpload visible={showModal} />
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/sh-logo.png"
          alt="Sky Hop Logo"
          width={300}
          height={40}
          priority
        />
      </div>
      <Button
        onClick={() => (setShowModal(true))}
        type='text'
      >
        Upload a Document
      </Button>
      {showModal && renderDocUpload()}
    </main>
  );
}
