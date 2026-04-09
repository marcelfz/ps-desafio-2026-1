'use client'

import style from './footer.module.css'
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

export default function Footer() {

    return (

        <footer className={style.footer} id='destaques'>
            <div className={style.footerContent}>
                <div className={style.footerContacts}>
                    <h2>O melhor site de artigos esportivos!</h2>
                    <p>Aproveite, entrega grátis para todo o Brasil!</p>
                    <div className={style.socialMedia}>
                        <a href="https://www.instagram.com/marceloferraz.ac/" className={style.socialLink} id='instagram'>
                            <FaInstagram />
                        </a>
                        <a href="https://www.linkedin.com/in/marcelo-ferraz-a08ba4253/" className={style.socialLink} id='linkedin'>
                            <FaLinkedin />
                        </a>
                        <a href="https://github.com/marcelfz" className={style.socialLink} id='github'>
                            <FaGithub />
                        </a>
                    </div>
                </div>

            <ul className={style.list}>
                <li><h3>Nossa empresa</h3></li>
                <li><a href="https://www.instagram.com/marceloferraz.ac/" className={style.sobreLink}>Sobre nós</a></li>
                <li><a href="https://www.instagram.com/marceloferraz.ac/" className={style.sobreLink}>Trabalhe conosco</a></li>
                <li><a href="https://www.instagram.com/marceloferraz.ac/" className={style.sobreLink}>Contato</a></li>
            </ul>
            </div>

            <div className={style.copyright}>
                &copy; 2026 zSport. Todos os direitos reservados.
            </div>

        </footer>

    )
}