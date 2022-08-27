import React from 'react'

function LoginPage() {
  return (
    <div className="d-flex justify-content-center">
    <div className="form-image me-5">
      <img src="https://picsum.photos/400/400" alt="sample-movie" />
    </div>
    <div className="register-form">
      <h1 className="form-title display-3">Login</h1>
      <form id="register" //onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" placeholder="Enter your email address.." //onChange={(e) => setEmail(e.target.value)} 
          required/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Enter your password.." //onChange={(e) => setPassword(e.target.value)} 
          required />
        </div>
        <input type="submit" className="btn btn-primary form-control" value="Login" 
        //onClick={handleSubmit}
        />
      </form>
      <button className="btn btn-primary form-control" //onClick={handleProviderLogin}
      >
        Continue with Google
        </button>
    </div>

  </div>
  )
}

export default LoginPage