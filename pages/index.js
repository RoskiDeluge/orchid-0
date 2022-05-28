import { useState, useEffect } from 'react';
import { app } from '../firebase/initFirebase';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [orchidURL, setOrchidURL] = useState('');

  const storage = getStorage(app);

  const storageRef = ref(storage, 'orchid/');

  const getImgURL = () => {
    listAll(storageRef)
      .then((res) => {
        // // res.prefixes.forEach((folderRef) => {
        // //   console.log(folderRef);
        // //   // All the prefixes under listRef.
        // //   // You may call listAll() recursively on them.
        // // });
        res.items.forEach((itemRef) => {
          getDownloadURL(itemRef).then((url) => {
            // console.log(url);
            setOrchidURL(url);
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getImgURL();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Orchid 0</title>
        <meta
          name="description"
          content="Image generated by the StyleGan2 ML algorithm trained on an evolving personal collection of photos of an orchid."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Orchid 0</h1>
      {orchidURL && (
        <Image
          src={orchidURL}
          alt="Image generated by the StyleGan2 ML algorithm trained on an evolving personal collection of photos of an orchid."
          width={1024}
          height={1024}
        />
      )}
      {/* {images.map((imgURL) => (
        <Image
          src={imgURL}
          alt="Image generated by the StyleGan2 ML algorithm trained on an evolving personal collection of photos of an orchid."
          width={1024}
          height={1024}
        />
      ))} */}
    </div>
  );
}
