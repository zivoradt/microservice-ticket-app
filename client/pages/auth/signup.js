import { useState } from "react";
import Router from 'next/router';
import useRequest from "../../hooks/use-request";


export default () =>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {doRequest, errors} = useRequest({
      url:'/api/users/signup',
      method: 'post',
      body: {
        email, password
      },
      onSuccess: ()=> Router.push('/')
    })

    const onSubmit = async event =>{
      event.preventDefault();    
      doRequest();
    }


    return (
      <form onSubmit={onSubmit}>
        <div className="container mt-5 w-25 p-3">
        <div className="mb-3">
            <h1>Sign Up</h1>
        <label value = {email} onChange = {e=>setEmail(e.target.value)} className="form-label">Email address</label>
        <input  value = {email} onChange = {e=>setEmail(e.target.value)}
        type="email" className="form-control" placeholder="name@example.com"></input>
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" className="form-control" id="inputPassword"></input>
      </div>
      {errors}
      <button className="btn btn-primary">Sign Up</button>
      </div>
      </form>
    )
}