//HOC - a component renders another component
//Goal is to reuse code
//render hijacking
//prop manipulation
//abstract state


import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info </h1>
        <p>The info is {props.info} </p>
    </div>
)

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div> 
            { props.isAdmin && <p> This is private info pleases dont shareplease</p>} 
            <WrappedComponent {...props} />           
        </div>
    )
}


const requireAuthentication = (WrappedComponent) => 
{
    return (props) => (
        <div>
           {props.isAuthenticated ? (<WrappedComponent {...props} />) : (<p> Please Login to view the info </p>) }
        </div>
    )
}


const AuthInfo = requireAuthentication(Info);
const AdminInfo = withAdminWarning(Info);

// ReactDOM.render( <AdminInfo isAdmin={false} info="These are the details"/>, document.getElementById('app') )
ReactDOM.render( <AuthInfo isAuthenticated={true} info="These are the details"/>, document.getElementById('app') )