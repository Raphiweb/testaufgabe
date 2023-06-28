import classes from "./Button.module.css";

const Button = (props) => {
  const onClickHandler = () => {
    if (props.onClickHandler) {
      props.onClickHandler();
    }
  };

  return (
    <button onClick={onClickHandler} className={classes.btn}>
      {props.children}
    </button>
  );
};

export default Button;
