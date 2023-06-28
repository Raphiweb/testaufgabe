import classes from "./ToDoList.module.css";

const ToDoList = (props) => {
  const todos = [
    ...props.toDos
      .filter((todo) => todo !== undefined)
      .map((todo) => {
        return (
          <li className={classes.listElement} key={todo.props.identifier}>
            {todo}
          </li>
        );
      }),
  ];

  return (
    <div className={classes.toDoList}>
      {props.toDos.length === 0 ? (
        <p>No more things to do!</p>
      ) : (
        <ul className={classes.list}>{todos}</ul>
      )}
    </div>
  );
};

export default ToDoList;
