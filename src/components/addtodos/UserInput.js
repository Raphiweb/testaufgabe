import classes from "./UserInput.module.css";

const UserInput = (props) => {
  const onChangeHandler = (event) => {
    props.onChangeHandler(event);
  };

  const invalidClass = props.hasError ? "invalid" : "";

  return (
    <div className={`${classes.wrapper} ${classes[invalidClass]}`}>
      <p className={classes.para}>{props.title}</p>
      <br></br>
      <input
        id={props.id}
        type="text"
        className={`${classes.userinput} ${classes[invalidClass]}`}
        placeholder={props.description}
        onChange={onChangeHandler}
      ></input>
    </div>
  );
};

export default UserInput;
