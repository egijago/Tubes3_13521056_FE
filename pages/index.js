import Head from 'next/head';
import { useState } from 'react';
import  SideBar  from './SideBar';
import  ChatBox  from './ChatBox';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [chatBoxText, setChatBoxText] = useState('');

  const clearChatBox = () => {
    setChatBoxText('');
  };

  return (
    <div>
      <Head>
        <title>gpt at home:</title>
        <link rel="icon" href="/favicon.ico" />
        <style>{`
          body {
            margin: 0;
            padding: 0;
            overflow: hidden; /*scrolling */
          }
        `}</style>
      </Head>
      <div className={`${styles.column} ${styles.sidebar}`}>
        <SideBar clearChatBox={clearChatBox} />
      </div>
      <div className={`${styles.column} ${styles['home']}`}>
        <div className={styles.bottomBarContainer}>
          <ChatBox chatBoxText={chatBoxText} setChatBoxText={setChatBoxText} />
        </div>
      </div>
    </div>
  );
}
