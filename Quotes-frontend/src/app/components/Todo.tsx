import React, { useState, useEffect } from "react";

function Todo() {
  let [todos, setTodos]:any = useState([]);
  let [editing, setEditing] = useState(false);

  let [inputValue, setInputValue]:any = useState({
    title: "",
    todoText: "",
    _id: "",
  });

  let getData = async () => {
    fetch(`http://localhost:8000/quote`)
      .then((res) =>  res.json())
      .then((d) => {
        

        console.log(d);
        setTodos((preData:any)=>{
          return [preData,...d]
        });
      })
      .catch((e) => console.log(e));
    // let data = await res.json();
    // if (data) {
    //    console.log(data);
    //   setTodos([...data]);
    //   //  console.log(todos)
    // }
  };

  let handleInputs = (event:any) => {
    let inputName = event.target.name;
    let inputVal = event.target.value;

    setInputValue({ ...inputValue, [inputName]: inputVal });
    //  console.log(inputValue)
  };
  let handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:8000/quote", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputValue),
      });
      console.log(res);
      let data = await res.json();
      setTodos([...todos, data]);
      console.log(data, "posted");
      setInputValue({ title: "", todoText: "" });
      // return data
      console.log(todos);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  let deleteTodo = async (_id:string) => {
    if (_id) {
      setTodos((todos:any) => {
        return todos.filter((todo:any) => {
          return todo._id !== _id;
        });
      });

      fetch("http://localhost:8000/quote/" + _id, {
        method: "DELETE"
      })
        .then((res) => {
          res.json();
        })
        .then((data) => {
          console.log(data, "deleted");
        })
        .catch((err) => {
          console.log(err);
        });
      // let data = await res.json()

      //  console.log(data,'delete')
      // return data
    }
  };

  useEffect(() => {
    getData();
  }, []);

  let editTodo = async (id:string) => {
    setEditing(true);
    let editedTodo = todos.find((todo:any) => {
      return todo._id === id;
    });
    setInputValue({
      title: editedTodo.title,
      todoText: editedTodo.todoText,
      _id: editedTodo._id,
    });
    console.log(editedTodo);
    setTodos((todos:any) => {
      return todos.filter((todo:any) => {
        return todo._id !== id;
      });
    });
  };

  let handleEdit = async (e:any) => {
    e.preventDefault();
    setTodos([...todos, inputValue]);
    let { _id } = inputValue;
    await fetch("http://localhost:8000/quote/" + _id, {
      method: "put" ,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputValue),
    });
    setInputValue({
      title: "",
      todoText: "",
      _id: "",
    });
    setEditing(false);
  };

  return (
    <div>
      <div className="blueCircle"></div>
      <div className="redCircle"></div>
      <div className="greenCircle"></div>
      <div className="yellowCircle"></div>

      <form className="inputContainer">
        <input
          type="text"
          maxLength={15}
          placeholder="Add a title"
          name="title"
          value={inputValue.title}
          onChange={handleInputs}
          required
        />

        <textarea
          maxLength={200}
          placeholder="Add a todo"
          name="todoText"
          value={inputValue.todoText}
          onChange={handleInputs}
          required
        ></textarea>
        <button onClick={editing ? handleEdit : handleSubmit}>
          {" "}
          {editing ? "edit" : "Save todo"}
        </button>
      </form>

      <div className="todoList">
        {todos &&
          todos.map((todo:any) => {
            let { title, _id, todoText } = todo;
            return (
              <div key={_id} className="todoUl">
                <li className="text"> ' {todoText} , </li>
                <li className="title"> - {title}</li>
                <button
                  className="deleteBtn"
                  onClick={() => {
                    deleteTodo(_id);
                  }}
                >
                  Delete
                </button>

                <button
                  className="editBtn"
                  onClick={() => {
                    editTodo(_id);
                  }}
                >
                  Edit
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Todo;
