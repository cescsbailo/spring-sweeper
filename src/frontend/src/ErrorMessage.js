import React from "react";

export default class ErrorMessage extends React.Component{
    constructor(props){
        super(props)

        this.state = {}
    }

    render = ()=>{
        return(
            <>
                <p>
                    Timestamp: <span>{this.props.error.timestamp}</span><br/>
                    Path: <span>{this.props.error.path}</span><br/>
                    Status: <span>{this.props.error.status}</span><br/>
                    Error: <span>{this.props.error.error}</span><br/>
                    Message: <span>{this.props.error.message}</span><br/>
                </p>
                Trace: <pre>{this.props.error.trace}</pre>
            </>
        )
    }
}