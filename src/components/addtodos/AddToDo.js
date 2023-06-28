import { useEffect, useState } from "react";
import classes from "./AddToDo.module.css";
import UserInput from "./UserInput";
import Button from "../button/Button";

const AddToDo = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isValidTitle, setIsValidTitle] = useState(false);
  const [titleHasError, setTitleHasError] = useState(false);

  const minTitleLength = 3;

  useEffect(() => {
    checkValidity();
  }, [title, description]);

  const onChangeHandler = (event) => {
    if (event.target.id === "title") {
      setTitle(event.target.value);
    } else if (event.target.id === "description") {
      setDescription(event.target.value);
    }
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (isValidTitle) {
      props.onAddToDo(title, description);
      event.target.reset(); // UserInput wird nach submit geleert

      setTitle("");
      setDescription("");

      setIsValidTitle(false);
      setTitleHasError(false);
    } else {
      if (!isValidTitle) {
        setTitleHasError(true);
        alert("Title must be >= " + minTitleLength + " letters!");
      }
    }
  };

  const checkValidity = () => {
    if (title.length >= minTitleLength) {
      setIsValidTitle(true);
      setTitleHasError(false);
    }
  };

  return (
    <div className={classes.wrapper}>
      <h2>Create a new ToDo</h2>
      <form onSubmit={onSubmitHandler} className={classes.form}>
        <UserInput
          title="Title"
          description="give it a name"
          id="title"
          onChangeHandler={onChangeHandler}
          hasError={titleHasError}
        ></UserInput>
        <UserInput
          title="Description"
          description="describe your ToDo"
          id="description"
          onChangeHandler={onChangeHandler}
        ></UserInput>
        <Button>Add</Button>
      </form>
    </div>
  );
};

export default AddToDo;
