import Dexie from "dexie";

export class PersonDatabase extends Dexie {

    people!: Dexie.Table<Person, number>

    constructor() {
        super("PersonDatabase")

        this.version(1).stores({
            people: "++id, name, age"
        })
    }

    async savePerson(person: Person) {
        if ("id" in person) {
            await this.people.put(person)
        } else {
            await this.people.add(person)
        }
    }

    async getPeople() {
        return this.people.toArray()
    }

    async deletePerson(person: Person) {
        if ("id" in person && typeof person.id === "number") {
            await this.people.delete(person.id)
        } else {
            throw Error(`Can't delete a person not already in the database. trying to delete ${person.name}`)
        }
    }
}

export interface Person {
    name: string
    age: number
}