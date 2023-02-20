import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Col, Container, Row } from 'react-bootstrap'
import { BsFileEarmark, BsFileEarmarkFont,  BsSave } from 'react-icons/bs'
import './App.css'

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

    let fileRow = (<Row><p><BsFileEarmark/> {props.name}</p></Row>)

    if (writableFiles.includes(dataType)) {
        fileRow = (<Row className="Pointer" onClick={() => preview ? setPreview(false) : setPreview(true)}><p><BsFileEarmarkFont/> {props.name}</p></Row>)
    }

    return (
        <Container>
            {fileRow}
            {
                preview &&
                <div>
                    <Row>
                        <textarea rows="10" className="form-control" value={text} onChange={e => setText(e.target.value)}></textarea>
                    </Row>
                    <Row>
                        <Col sm={1}>
                            <BsSave onClick={saveToFile} className="Pointer HoverInvert"/>
                        </Col>
                    </Row>
                </div>
            }
            
            
        </Container>
    )
}