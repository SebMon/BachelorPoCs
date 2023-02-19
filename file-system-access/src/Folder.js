import React from "react";

export default function FolderComponent(props) {
    const openFolder = async () => {
        let newFiles = []
        let newFolders = []
        
        for await (const [key, value] of props.value.entries()) {
            if (value.kind === "file") {
                console.log("File")
                newFiles.push({key: key, value: value})
            }
            else if (value.kind === "directory") {
                console.log("Folder")
                newFolders.push({key: key, value: value})
            }
        }

        props.setFiles(newFiles)
        props.setFolders(newFolders)
    }

    return (
        <div>
            <p>{props.value.kind}: {props.name}</p>
            <button onClick={openFolder}>Open</button>
        </div>
    )
}