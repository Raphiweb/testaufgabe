import { useState } from "react";
import classes from "./App.module.css";

import AddToDo from "./components/addtodos/AddToDo";
import ToDoList from "./components/todolist/ToDoList";
import ToDo from "./components/todo/ToDo";
import Header from "./components/ui/header/Header";
import Footer from "./components/ui/footer/Footer";
import Login from "./components/login/Login";
import Button from "./components/button/Button";

function App() {
  const onDeleteHandler = (deleteKey) => {
    setToDos((prevToDos) =>
      prevToDos.filter((todo) => todo.props.identifier !== deleteKey)
    );
  };

  // Drag
  let draggedId = null;
  let draggedOverId = null;

  const onDragHandler = (id) => {
    draggedId = id;
  };

  const onDragEndHandler = () => {
    draggedId = null;
    draggedOverId = null;
  };

  const onDragOverHandler = (id) => {
    draggedOverId = id;

    if (draggedId === draggedOverId) {
      return;
    } else {
      setToDos((prevToDos) => {
        // die Implementierung des Drag and Drops produziert (manchmal) undefined Einträge im Array, wenn neue ToDos hinzugefügt werden. Diese können also (manchmal) nicht verschoben werden.
        const toDos = prevToDos.filter((todo) => todo !== undefined);

        const draggedToDo = toDos.filter(
          (todo) => todo.props.identifier === draggedId
        )[0];

        const draggedOverIndex = toDos.findIndex(
          (todo) => todo.props.identifier === draggedOverId
        );

        // das dragged ToDo wird entfernt
        const filteredToDos = toDos.filter(
          (todo) => todo.props.identifier !== draggedId
        );

        // und anschließend an die Stelle des draggedOver ToDos eingefügt
        filteredToDos.splice(draggedOverIndex, 0, draggedToDo);

        return filteredToDos;
      });
    }
  };

  const FAKEDATA = [
    <ToDo
      identifier={999}
      key={999}
      onDeleteHandler={onDeleteHandler}
      onDragHandler={onDragHandler}
      onDragOverHandler={onDragOverHandler}
      onDragEndHandler={onDragEndHandler}
      title="Lineare Algebra - Übungsserie 10"
      text="Aufgabe 3 a) und b) mit Kommilitonen vergleichen"
    />,
    <ToDo
      identifier={998}
      key={998}
      onDeleteHandler={onDeleteHandler}
      onDragHandler={onDragHandler}
      onDragOverHandler={onDragOverHandler}
      onDragEndHandler={onDragEndHandler}
      title="Wäsche waschen"
      text="Sportzeug nicht vergessen - liegt im Wohnzimmer"
    />,
    <ToDo
      identifier={997}
      key={997}
      onDeleteHandler={onDeleteHandler}
      onDragHandler={onDragHandler}
      onDragOverHandler={onDragOverHandler}
      onDragEndHandler={onDragEndHandler}
      title="Wocheneinkauf"
      text="Äpfel, Blaubeeren, Brötchen, Käse, Joghurt, Kartoffeln"
    />,
    <ToDo
      identifier={996}
      key={996}
      onDeleteHandler={onDeleteHandler}
      onDragHandler={onDragHandler}
      onDragOverHandler={onDragOverHandler}
      onDragEndHandler={onDragEndHandler}
      title="Geburtstagsgeschenk besorgen"
      text=""
    />,
    <ToDo
      identifier={995}
      key={995}
      onDeleteHandler={onDeleteHandler}
      onDragHandler={onDragHandler}
      onDragOverHandler={onDragOverHandler}
      onDragEndHandler={onDragEndHandler}
      title="Baumarkt"
      text="neuer Fettfilter, Gang 42"
    />,
  ];

  const [toDos, setToDos] = useState(FAKEDATA);
  // counter wird für den einzigartigen Key der einzelnen ToDos benötigt
  const [counter, setCounter] = useState(0);

  const onAddToDo = (title, description) => {
    const id = counter + 1;
    const newToDo = (
      <ToDo
        identifier={id}
        key={id}
        onDeleteHandler={onDeleteHandler}
        onDragHandler={onDragHandler}
        onDragOverHandler={onDragOverHandler}
        onDragEndHandler={onDragEndHandler}
        title={title}
        text={description}
      />
    );
    setToDos((prevToDos) => [newToDo, ...prevToDos]);
    setCounter((prevCounter) => prevCounter + 1);
  };

  // Login
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const onLoginHandler = () => {
    setIsLoggedIn(true);
  };

  const onLogoutHandler = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className={classes.app}>
      <Header></Header>

      {!isLoggedIn && (
        <div className={classes.login}>
          <Login onLoginHandler={onLoginHandler}></Login>
        </div>
      )}
      {isLoggedIn && (
        <div className={classes.body}>
          <Button onClickHandler={onLogoutHandler}>Logout</Button>
          <div className={classes.addToDo}>
            <AddToDo onAddToDo={onAddToDo}></AddToDo>
          </div>
          <ToDoList toDos={toDos}></ToDoList>
        </div>
      )}
      <Footer></Footer>
    </div>
  );
}

export default App;
