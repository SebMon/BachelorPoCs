import React, { useEffect, useState } from "react";

export default function FileComponent(props) {
    const [preview, setPreview] = useState(false)
    const [text, setText] = useState()
    const [dataType, setDataType] = useState()

    // some files don't have a recognisable type, so if this were to be expanded, we'd have to perhaps look at the file extensions instead
    const writableFiles = ["application/json", "text/plain"] 

    useEffect(() => {
        async function fetchData() {
            setText(await (await props.value.getFile()).text())
            setDataType((await props.value.getFile()).type)
        }
        fetchData()
        
    }, [props.value])

    const saveToFile = async () => {
        const writable = await props.value.createWritable()
        await writable.write(text)
        await writable.close()
    }

    return (
        <div>
            <p>{props.value.kind}: {props.name}</p>
            {
                writableFiles.includes(dataType) &&
                <button onClick={() => preview ? setPreview(false) : setPreview(true)}>Toggle Preview</button>
            }
            {
                preview &&
                <div>
                    <textarea value={text} onChange={e => setText(e.target.value)}></textarea>
                    <button onClick={saveToFile}>Save</button>
                </div>
            }
            
        </div>
    )
}