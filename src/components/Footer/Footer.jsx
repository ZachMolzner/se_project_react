import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">Developed by Zach Molzner</p>
      <p className="footer__text">© {new Date().getFullYear()} WTWR</p>
    </footer>
  );
}

export default Footer;
