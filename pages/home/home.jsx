import Head from 'next/head'
import Image from 'next/image'
import styles from './home.module.scss'

export default function Home() {
  return(
    <div className={styles.container}> 
      <h1> hello </h1>
      <h1> world </h1>
      <p> test </p>
    </div>
  )
}