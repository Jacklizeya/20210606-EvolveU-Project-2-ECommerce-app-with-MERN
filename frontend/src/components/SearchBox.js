import React, {useState} from 'react'
import {Form, Button, Col, Row} from "react-bootstrap"


export const SearchBox = ({history}) => {
    const [keyword, setKeyword] = useState("")

    const submitHandler = (e) => {
        e.preventDefault()
        console.log("currentkeyword is ", keyword)
        console.log("I am going to ", '/search/${keyword}' )
        if (keyword.trim()) {history.push(`/search/${keyword}`)} else {history.push("/")}
    }

    return (
        <Form onSubmit={submitHandler} inline>
            <Row>
                <Col>
                    <Form.Control type="text" name="q" onChange={e => setKeyword(e.target.value)} placeholder="SearchProducts..." className="mr-sm-2 ml-sm-5"/>  
                </Col>
                <Col>
                
                    <Button type="submit"  className="btn btn-success"> Search </Button>
                </Col>
            </Row>
        </Form>
    )
}
