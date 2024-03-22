

import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, update, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { app } from "./firebase";



function Curd() {
    var database = getDatabase(app)
    const [input, setInput] = useState();
    const [user, setUser] = useState([]);
    const [id, setId] = useState(null);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        userlist();
    }, []);

    const userlist = () => {
        const userRef = ref(database, "users");
        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const list = Object.keys(data).map((id) => ({ id, ...data[id] }));
                setUser(list)
            } else {
                console.log("data not Found")
            }
        });
    };

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (edit && id) {
            try {
                await update(ref(database, `users/${id}`), input);
                setId(null);
                setInput();
                setEdit(false);
            } catch (e) {
                console.error("Error updating document: ", e);
            }
        } else {

            console.log(input)
            try {
                await push(ref(database, "user"), input);
                setInput();
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            await remove(ref(database, `user/${id}`));
            setUser((prevUser) => prevUser.filter((item) => item.id !== id));
        } catch (e) {
            console.error("Error deleting document: ", e);
        }
    };

    const handleEdit = (id) => {
        console.log(id)
        setInput(user.find((item) => item.id === id) || {});
        setId(id);
        setEdit(true);
    };

    return (
        <div>
            <h1 className="text-center">Crud Operation</h1>
            <form onSubmit={handleSubmit} className="m-auto col-3">
                <label htmlFor="name">Name</label>
                <input type="text"  class="form-control" name="name" value={input ? input.name : ""} onChange={handleChange} />
                <label htmlFor="email">Email</label>
                <input type="email"  class="form-control mb-2" name="email"  value={input ? input.email : ""} onChange={handleChange} />
                <button className="btn btn-primary">{edit ? 'Update' : 'Add'}</button>
            </form>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {user && user.map((item,index) => (
                        <tr key={item.id}>
                            <td scope="row">{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>
                                <button className="btn btn-danger mx-2" onClick={() => handleDelete(item.id)}>Delete</button>
                                <button className="btn btn-warning" onClick={() => handleEdit(item.id)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Curd;