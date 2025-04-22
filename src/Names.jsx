import { useState, useEffect } from 'react';
import './Names.css';

// This component should stay in sync with our
// backend API, which supports following:
//
// C: Add a name to the list & save it (via POST) to the API.
// R: Read a list of names (via GET)
// U: Ability to update or change a name in the list (via PUT)
// D: Delete a name from the list (via DELETE)

//const URL = "https://brad.ngrok.io/api"
const URL = "http://127.0.0.1:3000/api"


function Names() {
    const [ names, setNames ] = useState([]);

    function fetchNames() {  // GET the list of names
        const request = new Request(URL);
        fetch(request)
            .then((response) => response.json())
            .then((namesArray) => {
                setNames(namesArray);
            })
    }

    // Keep our component's state in sync with the external api.
    useEffect(() => {
        fetchNames();
    }, []);
    

    function createName(event) {  // POST a new name to the API
        event.preventDefault();

        // Pull all of the data from the form.
        const data = new FormData(event.target);
        const payload = {name: data.get('newName')}
        console.log("Submitting via POST: ", payload);

        // Send it to the API.
        const request = new Request(URL, {
           method: "POST",
           mode: "cors", // important!!!! 
           headers: {'Content-Type': 'application/json'}, // MIME type.
           body: JSON.stringify(payload)
        });
        fetch(request)
            .then((response) => response.json()) // decode JSON into JavaScript objects.
            .then((newItem) => {
                console.log(newItem);
                // Add the newItem to our array of names
                setNames([...names, newItem]); // Trigger a re-render.
                event.target.value = "";
            });
    }

    function enableEditing(event) {
        const id = parseInt(event.target.dataset.id);
        const results = names.map((obj) => {
            if(obj.id === id) {
                obj.isEditing = true;
            }
            return obj;
        });
        setNames(results);
    }

    function updateName(event) {  // Send a PUT request to update a name
        event.preventDefault();

        // Ensure we're handling the Submit Event.
        if(event.type === "submit") {
            const data = new FormData(event.target);
            const payload = {"name": data.get("newName")}
            console.log("Update: ", payload)

            const url = URL + "/" + parseInt(data.get('id'))
            const request = new Request(url, {
                method: "PUT",
                mode: "cors", // important!
                headers: {"Content-Type": "application/json"},  // MIME.
                body: JSON.stringify(payload)
            })
            fetch(request)
                .then((response) => response.json())
                .then((newItem) => {
                    console.log(newItem);
                    // newItem will be somethign like: { id: 5, name: "whatever" }
                    // Get all the existing names, except for the one we just updated.
                    const oldNames = names.filter((obj) => obj.id != newItem.id);
                    newItem.isEditing = false; // Ensure our UI knows we're no longer editing this.
                    oldNames.push(newItem)

                    //names.push(newItem); // React: NEVER mutate your state variables.
                    // We're sorting all names based on .id before updating the state.
                    setNames(oldNames.toSorted((obj1, obj2) => obj1.id - obj2.id));
                })
        }
            
    }

    function deleteName(event) {  // Send a DELETE request to remove a name.
        const id = parseInt(event.target.dataset.id);
        const url = URL + '/' + id;
        console.log("Deleting: ", url);

        const request = new Request(url, {
            method: "DELETE"
        });
        fetch(request)
            .then((resp) => resp.json())
            .then((data) => {
                console.log("After deleting: ", data);
                // remove the deleted item from our react state.
                const result = names.filter((obj) => obj.id != id);
                setNames(result);
            })
    }

    // Render our list of names
    const items = names.map((obj) => {
        return (
            <li key={'id-' + obj.id}>
                {obj.isEditing && 
                    <form action="#" onSubmit={updateName}>
                        <input type="hidden" name="id" value={obj.id} readOnly/>
                        <input type="text" name="newName" defaultValue={obj.name} onKeyUp={updateName} />
                    </form>
                }
                {!obj.isEditing && 
                    <>
                        <span onClick={enableEditing} data-id={obj.id}>{obj.name} &nbsp;</span>
                        <button onClick={deleteName} 
                            id={'delete-' + obj.id} 
                            data-id={obj.id} 
                            title="Delete">🗑️</button>
                    </>
                }
            </li>
        )
    });

    return (
        <div id="names-container">
            <h1>Names!</h1>
            <p>
                <em>
                    ⚠️ This component requires a working API to power it.
                </em>
            </p>
            <form action="#" onSubmit={createName}>
                <p>
                    <input type="text" name="newName" placeholder="Enter a name" defaultValue="" />
                </p>
                <p>
                    <input type="submit" />
                </p>
            </form>
            <ul>{items}</ul>
        </div>
    );
}

export default Names;