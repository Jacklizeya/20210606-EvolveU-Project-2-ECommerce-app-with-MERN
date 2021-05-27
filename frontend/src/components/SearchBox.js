import React, {useState} from 'react'
import {Form, Button} from "react-bootstrap"


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

                <Form.Control type="text" name="q" onChange={e => setKeyword(e.target.value)} placeholder="Search Products..." className="mr-sm-2 ml-sm-5"/>  

                <Button type="submit" variant="outline-success" className="p-2"> Search </Button>
   
        </Form>
    )
}
