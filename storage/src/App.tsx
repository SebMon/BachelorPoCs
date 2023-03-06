import React from 'react';
import './App.css';
import PersonList from './components/PersonList';
import { Person, PersonDatabase } from './dataStorage/PersonDatabase';

navigator.storage.persist().then(isPersisted => {
  console.log(`Persisted storage: ${isPersisted}`)
})

function App() {

  const personDB = new PersonDatabase()

  const onUserFormSubmitted = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      age: { value: string };
    };
    
    const newPerson: Person = {
      name: target.name.value,
      age: parseInt(target.age.value)
    } 

    personDB.savePerson(newPerson)
  }

  return (
    <div className="App">
      <form
        onSubmit={onUserFormSubmitted}
      >
        <div>
          <label>
            Name:
            <input type={"text"} name="name" />
          </label>
        </div>
        <div>
          <label>
            Age:
            <input type={"number"} name="age" />
          </label>
        </div>
        <div>
          <input type={"submit"} value="Add person" />
        </div>
      </form>
      <PersonList db={personDB}/>
    </div>
  );
}

export default App;
