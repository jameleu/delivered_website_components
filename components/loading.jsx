import styles from "./loading.module.scss"

export default function Loading() {
    return (
        <div className={styles.container}>
            <svg
              id="logo"
              xmlns="http://www.w3.org/2000/svg"
              width="124"
              height="124"
              viewBox="0 0 24 24"
              className="icon icon-tabler grabby bounce infinite"
              stroke-width="1"
              stroke="none"
              fill="#fff"
            
            >
              <path
                d="m19,2.6l-7,4.9L5,2.6H0v18.8h5.8v-10.7l6.2,4.1,6.2-4.1v10.7h5.8V2.6h-5Zm-7,10l-7.5-5.4c.5.2,2.9,1.7,2.9,1.7,0,0,1.5.8,3.2,1.6,1.3.6,1.5.9,1.5,1,0,0,.2-.3,1.5-1,1.7-.8,3.2-1.6,3.2-1.6,0,0,2.3-1.5,2.9-1.7l-7.5,5.4Z"
              />
            </svg>
        </div>
  );
}

