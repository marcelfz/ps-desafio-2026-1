'use client'

import styles from './navbar.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { getSession } from 'next-auth/react'

export function NavBar() {
  const [activeLink, setActiveLink] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth > 1000) {
      setMenuOpen(false)
    }
  }
  window.addEventListener('resize', handleResize) 
  return () => window.removeEventListener('resize', handleResize) 
  }, [])

  useEffect(() => {
    const requestDataSession = async () => {
      const sessionResponse = await getSession()
      if (sessionResponse) {
        setIsAuth(!!sessionResponse.user)
      }else{
        setIsAuth(false)
      }
    }
    requestDataSession()
  }, [])

  return (


    <nav className={styles.nav}>

      <a href="/" className={styles.navLogo}>
        <div className={styles.logo}>Z</div>
        SPORTs
      </a>

      <button className={styles.menuLateral} onClick={() => setMenuOpen(v => !v)}>
        <span />
        <span />
        <span />
      </button>

      <ul className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ''}`}>
        <li><a href="/" className={activeLink === 'home' ? styles.active : ''} onClick={() => setActiveLink('home')}>home</a></li>
        <li><a href="#catalogo" className={activeLink === 'catalogo' ? styles.active : ''} onClick={() => setActiveLink('catalogo')}>Catálogo</a></li>
        <li><a href="#destaques" className={activeLink === 'destaques' ? styles.active : ''} onClick={() => setActiveLink('destaques')}>Destaques</a></li>
        <li className={styles.actionsMobile}>
          <a href="/admin"> {isAuth ? 'Logado' : 'Logar'} </a>
        </li>
      </ul>

      <div className={styles.navActions}>
          <a href='/admin' className={styles.btn + ' ' + styles.btnOutline}>
            {isAuth ? 'Logado' : 'Logar'}
          </a>
      </div>
    </nav>
  )
}

export default NavBar