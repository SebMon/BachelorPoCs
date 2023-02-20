import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Row } from 'react-bootstrap'
import { BsFolder } from 'react-icons/bs'
import './App.css'

export default function FolderComponent(props) {
    const openFolder = async () => {
        let newFiles = []
        let newFolders = []
        
        for await (const [key, value] of props.value.entries()) {
            if (value.kind === "file") {
                newFiles.push({key: key, value: value})
            }
            else if (value.kind === "directory") {
                newFolders.push({key: key, value: value})
            }
        }

        props.setFiles(newFiles)
        props.setFolders(newFolders)
    }

    return (
        <Row onClick={openFolder} className="Pointer">
            <p><BsFolder/> {props.name}</p>
        </Row>
    )
}