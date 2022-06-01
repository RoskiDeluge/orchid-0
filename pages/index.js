import { useState, useEffect } from 'react';
import Link from 'next/link';
import { app } from '../firebase/initFirebase';
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  list,
} from 'firebase/storage';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [orchidURL, setOrchidURL] = useState('');

  const storage = getStorage(app);

  const storageRef = ref(storage, '/orchid470/frames/');

  // Add function to cycle through numbers 1 through 361 and have it execute every 24 hrs.
  // Then use the number to update getDownloadURL()

  const getImgURL = async () => {
    const firstImg = await list(storageRef, { maxResults: 180 });

    getDownloadURL(firstImg.items[0])
      .then((url) => {
        setOrchidURL(url);
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
      <p>
        Made by{' '}
        <Link href="https://github.com/RoskiDeluge/orchid-0">
          <a className={styles.link}>RD</a>
        </Link>
      </p>
    </div>
  );
}
