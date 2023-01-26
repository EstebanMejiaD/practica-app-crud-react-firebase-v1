import { useState, useEffect } from "react";
import "./App.css";
import { firebase } from "./firebase";

function App() {
  const [listUser, setListUser] = useState([]);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [id, setId] = useState("");
  const [moodEdit, setMoodEdit] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const db = firebase.firestore();
        const data = await db.collection("usuarios").get();

        const arrayData = data.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));
        setListUser(arrayData);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

    const saveData = async (e)=> {
      e.preventDefault()

      if (!nombre.trim()) {
        alert("ingrese un nombre")
        return
      }
      if (!apellido.trim()) {
        alert("ingrese un apellido")
        return
      }


      try {

        const db =firebase.firestore()
        const newUser = {
          nombre,
          apellido
        }

          const data = db.collection("usuarios").add(newUser)

        setListUser([
          ...listUser,
          {
            id: data.id,
            ...newUser
          }
        ])
      } catch (error) {
        console.log(error)
      }
      setApellido("")
      setNombre("")
    }

    const deleteUser = async(id)=> {
      try {
        const db = firebase.firestore()
        await db.collection("usuarios").doc(id).delete()

        const filterList = listUser.filter((user)=> user.id!==id )
        setListUser(filterList)
      } catch (error) {
        console.log(error)
      }
    }

    const modeEdit = (user)=> {
      setMoodEdit(true)
      setNombre(user.nombre)
      setApellido(user.apellido)
      setId(user.id)
    }


    const editData = async (e)=> {
      e.preventDefault()

      if (!nombre.trim()) {
        alert("Ingresa nombre")
        return
      }
      if (!apellido.trim()) {
        alert("Ingresa apellido")
        return
      }

      try {
          const db = firebase.firestore()
          await db.collection("usuarios").doc(id).update({
            nombre, apellido
          })
          const editedUser = listUser.map((user)=> user.id===id ? {
            id: id,
            nombre,
            apellido
          }: user)
          setListUser(editedUser)
          setNombre("")
          setApellido("")
          setId("")
          setMoodEdit(false)
      } catch (error) {
        console.log(error)
      }

    }

  return (
    <div className="container">
      <form onSubmit={moodEdit ? editData : saveData}>
        <div>
          <h2 className="text-center">
            {
              moodEdit ? "Editar usuario" : "Formulario de registro"
            }
          </h2>
        </div>

        <input
          onChange={(e) => {
            setNombre(e.target.value);
          }}
          type="text"
          className="form-control my-2 mt-3"
          placeholder="Ingrese nombre"
          value={nombre}
        />
        <input
          onChange={(e) => {
            setApellido(e.target.value);
          }}
          type="text"
          className="form-control my-2"
          placeholder="Ingrese apellido"
          value={apellido}
        />
        <div className="d-grid gap-2">

          {
          moodEdit ? <button className="btn btn-warning">Editar</button>
          : 
          <button className="btn btn-success">Registrar</button>
          }
        </div>
      </form>

      <div className="container mt-4">
        <div className="text-center">
          <h2>Lista de usuarios registrados</h2>
        </div>
        <ul className="mt-4">
          {listUser.map((user) => (
            <li key={user.id}>
              {user.nombre} - {user.apellido}

              <button onClick={()=> deleteUser(user.id)} className="btn btn-danger mx-2">Delete</button>
              <button onClick={()=> modeEdit(user)} className="btn btn-warning">Edit</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
