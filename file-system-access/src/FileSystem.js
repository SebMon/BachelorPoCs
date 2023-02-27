import React, { useState } from "react";
import FileComponent from "./File";
import FolderComponent from "./Folder";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, ListGroup } from 'react-bootstrap'

export default function FileSystemComponent () {
    const [files, setFiles] = useState([])
    const [folders, setFolders] = useState([])

    const onSelectFolder = async () => {
        const directoryHandle = await window.showDirectoryPicker()

        let newFiles = []
        let newFolders = []
        
        for await (const [key, value] of directoryHandle.entries()) {
            if (value.kind === "file") {
                newFiles.push({key: key, value: value})
            }
            else if (value.kind === "directory") {
                newFolders.push({key: key, value: value})
            }
        }

        setFiles(newFiles)
        setFolders(newFolders)
    }

    return (
        <div>
                <ListGroup>
                    {folders.map((x) => (
                        <ListGroup.Item key={x.key}>
                            <FolderComponent name={x.key} value={x.value} setFolders={setFolders} setFiles={setFiles}></FolderComponent>
                        </ListGroup.Item>
                    ))}
                    {files.map((x) => (
                        <ListGroup.Item key={x.key}>
                            <FileComponent name={x.key} value={x.value}></FileComponent>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <Button onClick={onSelectFolder}>Select Folder</Button>           
        </div>
    )
}