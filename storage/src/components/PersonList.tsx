import React, { useEffect, useState } from 'react';
import { Person, PersonDatabase } from '../dataStorage/PersonDatabase';
import { useLiveQuery } from 'dexie-react-hooks';

export default function PersonList(props: {db: PersonDatabase}) {

    const people = useLiveQuery(() => props.db.getPeople())

    const list = people?.map(p => {
        return (<div className='person-div'>
            <p>name: {p.name}</p>
            <p>age: {p.age}</p>
            <button onClick={() => props.db.deletePerson(p)}>Delete</button>
        </div>)
    })

    return (
        <div>
            {list}
        </div>
    )
}