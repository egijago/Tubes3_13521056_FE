import { useState, useEffect } from 'react';
import sidebar from '../styles/SideBar.module.css'
import { ChatBox } from "./ChatBox";
import send from './api/send';

export default function SideBar() {
  const [isOn1, setIsOn1] = useState(true);
  const [isOn2, setIsOn2] = useState(false);
  const [buttons, setButtons] = useState([]);
  
  useEffect(() => {
    initializeButton();
  }, []);



  const handleToggle1 = async () => {
    setIsOn1(prev => !prev);
    setIsOn2(prev => !prev);
    await send(String.fromCharCode(6));
  };
  
  const handleToggle2 = async () => {
    setIsOn1(prev => !prev);
    setIsOn2(prev => !prev);
    await send(String.fromCharCode(6));
  };

  const handleAddButton = async () => {
    const response = await send(String.fromCharCode(2));;
    const idChat = response[0].id_chat;
    await send(String.fromCharCode(1) + (idChat + 1).toString());
    window.location.reload();
  };
  
  
  const handleButtonClick = async (button) => {
    const idChat = button.id;
    await send(String.fromCharCode(1) + (idChat).toString());
    window.location.reload();
  };

  const initializeButton = async () => {
    const response = await send(String.fromCharCode(9));
    const initialButtons = response.map((msg) => ({ id: msg.id_chat, title: (msg.topic.length > 15) ? msg.topic.slice(0, 20) + '...' : msg.topic}));
    setButtons(initialButtons);
  };

  return (
    <div className={sidebar.sidebar}>
      
      <div className={sidebar.sidebarTop} style={{ height: 'calc(100% - 150px)', overflowY: 'auto', overflowX: 'hidden' }}>
        <ul>
          <li><button className={sidebar.newButton} onClick={handleAddButton}>+ New Chat</button></li>
          {buttons.map(button => (
            <li key={button.id}>
              <button onClick={() => {handleButtonClick(button)}}>{button.title}</button>
            </li>
          ))}
        </ul>
      </div>
      <div className={sidebar.sidebarBottom}>
        <ul>
          <li>
            <label className={sidebar.switch}>
              <input type="checkbox" checked={isOn1} onChange={handleToggle1} />
              <span className={sidebar.slider}></span>
            </label>
            <span className={sidebar.labelOn}>   BM</span>
          </li>
        </ul>
        <ul>
          <li>
            <label className={sidebar.switch}>
              <input type="checkbox" checked={isOn2} onChange={handleToggle2} />
              <span className={sidebar.slider}></span>
            </label>
            <span className={sidebar.labelOff}>  KMP</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
