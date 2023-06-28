import { useState } from "react";
import classes from "./ToDo.module.css";

const ToDo = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  const [title, setTitle] = useState(props.title);
  const [text, setText] = useState(props.text);

  const onDeleteHandler = () => {
    props.onDeleteHandler(props.identifier);
  };

  const onCheckHandler = () => {
    setIsChecked(!isChecked);
  };

  // Edit
  const onEditHandler = () => {
    setIsEdited(!isEdited);
  };

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const textChangeHandler = (event) => {
    setText(event.target.value);
  };

  // Drag and Drop
  const onDragStartHandler = () => {
    props.onDragHandler(props.identifier);
  };

  const onDragOverHandler = (event) => {
    event.preventDefault(); // verhindert "fallback" vom dragged Item zur ursprünglichen Position
    props.onDragOverHandler(props.identifier);
  };

  const onDragEndHandler = () => {
    props.onDragEndHandler();
  };

  let overlay = "";
  if (isChecked) {
    overlay = "overlay";
  }

  return (
    <div className={classes.outerWrapper}>
      <div className={classes.optionsDiv}>
        <div onClick={onCheckHandler}>
          {!isChecked && (
            <span className={`material-symbols-outlined ${classes.checkBox}`}>
              check_box_outline_blank
            </span>
          )}
          {isChecked && (
            <span
              className={`material-symbols-outlined ${classes.checkBox} ${classes.checkedBox}`}
            >
              check_box
            </span>
          )}
        </div>
        <div onClick={onDeleteHandler} className={classes.trashWrapper}>
          <span className={`material-symbols-outlined ${classes.trash}`}>
            delete
          </span>
        </div>
        <div className={classes.editWrapper} onClick={onEditHandler}>
          {!isEdited && (
            <span className={`material-symbols-outlined ${classes.edit}`}>
              edit_note
            </span>
          )}
          {isEdited && (
            <span className={`material-symbols-outlined ${classes.edit}`}>
              save
            </span>
          )}
        </div>
      </div>
      <div
        className={`${classes.todo} ${classes[overlay]}`}
        draggable
        onDragStart={onDragStartHandler}
        onDragOver={onDragOverHandler}
        onDragEnd={onDragEndHandler}
      >
        {!isEdited && (
          <div className={classes.titleDiv}>
            <h2>{title}</h2>
          </div>
        )}
        {isEdited && (
          <textarea
            className={classes.titleInput}
            type="text"
            value={title}
            rows={2}
            onChange={titleChangeHandler}
          ></textarea>
        )}
        <div className={classes.line}></div>
        {!isEdited && (
          <div className={classes.textDiv}>
            <p className={classes.text}>{text}</p>
          </div>
        )}
        {isEdited && (
          <textarea
            className={classes.textInput}
            type="text"
            value={text}
            rows={5}
            onChange={textChangeHandler}
          ></textarea>
        )}
      </div>
    </div>
  );
};

export default ToDo;
