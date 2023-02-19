import React, { useState } from "react";
import FolderComponent from "./Folder";

export default function FileSystemComponent () {
    const [files, setFiles] = useState([])
    const [folders, setFolders] = useState([])

    const onSelectFolder = async () => {
        const directoryHandle = await window.showDirectoryPicker()

        let newFiles = []
        let newFolders = []
        
        for await (const [key, value] of directoryHandle.entries()) {
            if (value.kind === "file") {
                console.log("File")
                newFiles.push({key: key, value: value})
            }
            else if (value.kind === "directory") {
                console.log("Folder")
                newFolders.push({key: key, value: value})
            }
        }

        setFiles(newFiles)
        setFolders(newFolders)
    }

    return (
        <div>
            <ul>
                {folders.map((x) => (
                    <li key={x.key}>
                        <FolderComponent name={x.key} value={x.value} setFolders={setFolders} setFiles={setFiles}></FolderComponent>
                    </li>
                ))}
                {files.map((x) => (
                    <li key={x.key}>{x.value.kind}: {x.key}</li>
                ))}
            </ul>
            <p>Folders: {folders.length}</p>
            <p>Files: {files.length}</p>
            <button onClick={onSelectFolder}>Select Folder</button>
        </div>
    )
}