import { useState, useEffect, useRef } from 'react';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import send from './api/send';
import styles from '../styles/ChatBox.module.css';

export default function ChatBox({ id }) {
  const [messages, setMessages] = useState([]);

  const initializeChat = async () => {
    const response = await send(String.fromCharCode(7));
    const initialMessages = response.map((msg) => ({
      sender: 'me',
      message: msg.question,
      response: msg.answer,
    }));
    setMessages(initialMessages);
  };
  
  useEffect(() => {
    initializeChat();
  }, []);
  
  
  
  const messageContainerRef = useRef(null);


  const handleSendMessage = async (e) => {
    e.preventDefault();
    const inputEl = e.target.elements.message;
    const message = inputEl.value.trim();
    if (message) {
      const newMessage = { sender: 'me', message, response: '' };
      setMessages((prevMessages) => [...prevMessages, newMessage]); // Use the callback function form of setMessages to avoid losing old messages
      inputEl.value = '';
      const response = await send(message);
      newMessage.response = response;
      setMessages((prevMessages) => {
        const index = prevMessages.findIndex((msg) => msg === newMessage);
        const updatedMessages = [...prevMessages];
        updatedMessages[index] = newMessage;
        return updatedMessages;
      });
    }
  };

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTo({
        top: messageContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <div>
      <div id={id} className={styles.chatbox}>
        <div ref={messageContainerRef} className={styles.messageContainer}>
          {messages.map((msg, idx) => (
            <div key={idx} className={styles.bubbleContainer}>
              <div
                className={`${styles.bubble} ${
                  msg.sender === 'me' ? styles.right : styles.left
                }`}
              >
                {msg.message}
              </div>
              <div
                className={`${styles.bubble} ${
                  msg.sender === 'me' ? styles.left : styles.right
                }`}
              >
                {msg.response}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.TextBox}>
        <form onSubmit={handleSendMessage} className={styles.form}>
          <input
            type="text"
            name="message"
            placeholder="Type a message..."
            className={styles.input}
          />
          <button type="submit" className={styles.sendButton}>
            <FontAwesomeIcon
              icon={faPaperPlane}
              className={styles.faPaperPlane}
            />
          </button>
        </form>
      </div>
    </div>
  );
}

