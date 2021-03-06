import React from 'react';
import axios from 'axios';

class App extends React.Component{

  state = {
    users : [],
    name : '',
    email: '',
    password : '',
    id : 0
  }

  componentDidMount(){
    axios.get('http://localhost:5000/')
    .then((res) => 
      this.setState({
        users : res.data,
        name : '',
        email: '',
        password : '',
        id : 0
      })
    )
  }

  namechange = e => {
    this.setState({
      name:e.target.value
    })
  }

  emailchange = e => {
    this.setState({
      email:e.target.value
    })
  }

  passwordchange = e => {
    this.setState({
      password:e.target.value
    })
  }

  submit(e,id){
    
    if(id===0){
      axios.post('http://localhost:5000',{"name":this.state.name,"email":this.state.email,"password":this.state.password})
      .then(() => {
        this.componentDidMount();
      })
    }else{
      
      axios.put(`http://localhost:5000/${id}`,{"name":this.state.name,"email":this.state.email,"password":this.state.password})
      .then(() => {
        this.componentDidMount();
      })
    }
  }

  delete(id){
    axios.delete(`http://localhost:5000/${id}`)
    .then(()=> {
      this.componentDidMount();
    })
  }

  getone(id){
    axios.get(`http://localhost:5000/getone/${id}`)
    .then((res1)=> {
      this.setState({
        name:res1.data.name,
        email:res1.data.email,
        password:res1.data.password,
        id:res1.data._ID
      })
    })
  }

  render(){
    return (
      <div className="container mt-5">
        <div className="row mt-5">
          <div className="col-lg-6 mt-5">
            <form  onSubmit={(e) => {this.submit(e,this.state.id)}}>
              <div className="form-group">
                <input type="text" onChange={(e) => {this.namechange(e)}} className="form-control" placeholder="Enter your name" />
              </div>
              <div className="form-group">
                <input type="email" onChange={(e) => {this.emailchange(e)}} className="form-control" placeholder="Enter your email" />
              </div>
              <div className="form-group">
                <input type="password" onChange={(e) => {this.passwordchange(e)}} className="form-control" placeholder="Enter your password" />
              </div> 
              <button className="btn btn-block btn-primary">Submit</button>
            </form>
          </div>
          <div className="col-lg-6">
            <table className="table mt-5">
              <thead>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Edit</th>
                <th>Delete</th>
              </thead>
              <tbody>

                {this.state.users.map(user=> 
                  <tr>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>
                    <button onClick={(e) => this.getone(user._ID)} className="btn btn-sm btn-primary">
                      <i className="fa fa-pencil"></i>
                    </button>
                  </td>
                  <td>
                  <button onClick={(e) => this.delete(user._ID)} className="btn btn-sm btn-danger">
                  <i className="fa fa-trash"></i>
                  </button>
                  </td>
                </tr>
                )}
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
