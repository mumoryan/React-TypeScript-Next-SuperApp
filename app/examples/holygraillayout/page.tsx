'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';

const shortText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

const HolyGrailLayoutDemo = () => {
  const [content, setContent] = useState({
    text: shortText,
    longText: '',
    longTextFetched: false
  });
  useEffect(() => {
    //Runs only on the first render
    fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()).then(data => {
      setContent(prevState => ({
        ...prevState,
        longText: JSON.stringify(data, null, 2),
        longTextFetched: true
      }));
    });
  }, []);

  const switchText = () => {
    setContent(prevState=>({
      ...prevState,
      text: prevState.text.length<100?content.longText:shortText
    }));
  }
  
  return (
    <div id={styles.page}>
      <div id={styles.header}>header</div>
      <div id={styles.body}>
        <div id={styles.navleft}>nav left</div>
        <div id={styles.main}>
          <p>main</p>
          <button className='btn btn-md' onClick={switchText}>Toggle text</button>
          <p>{content.text}</p>
        </div>
        <div id={styles.navright}>nav right</div>
      </div>
      <div id={styles.footer}>footer</div>
    </div>
  )
}

export default HolyGrailLayoutDemo
