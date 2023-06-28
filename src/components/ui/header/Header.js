import classes from "./Haeder.module.css";

const Header = (props) => {
  return (
    <header className={classes.header}>
      <h2 className={classes.heading}>ToDo List</h2>
    </header>
  );
};

export default Header;
