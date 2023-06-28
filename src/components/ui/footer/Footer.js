import classes from "./Footer.module.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={classes.footer}>
      <p className={classes.footing}>&copy; {year} Raphael </p>
    </footer>
  );
};

export default Footer;
