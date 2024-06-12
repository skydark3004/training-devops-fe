import Link from 'next/link';
import styles from './page.module.css';

export const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={`${styles.headerLeft}`}>
          <Link href={'/'}>
            <img src='/header/logo.png' alt='Logo'></img>
          </Link>
        </div>
        <div className={`${styles.headerRight}`}>
          <Link href={'#'} style={{ marginLeft: '20px' }}>
            <img src='/header/search-icon.png' style={{}} width={20} alt='search' className='logo'></img>
          </Link>
          <Link href={'#'} style={{ marginLeft: '20px' }}>
            <img src='/header/question-circle.png' width={20} alt='question' className='logo'></img>
          </Link>
          <Link href={'#'} style={{ marginLeft: '20px' }}>
            <img src='/header/bell.png' alt='bell' width={25} className='logo'></img>
          </Link>
          <Link href={'#'} style={{ marginLeft: '20px' }}>
            <img className={styles.avatar} src='/header/avatar-default.png' width={20} alt='avatar'></img>
          </Link>
          <span style={{ marginLeft: '20px' }} className={styles.userName}>
            David Fucking Man
          </span>
        </div>
      </header>
    </>
  );
};
