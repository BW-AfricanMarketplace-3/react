  <div>
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit}>
                <div className={ "form-group" + (submitted && !username ? " has error" : ''  )}>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" value={username} onChange={this.handleChange} />
                    {submitted && !username && 
                    <div> username is requires</div>
                    }
                </div>
                <div className={ "form-group" + (submitted && !username ? " has error" : ''  )}>
                        <label htmlFor="password">password</label>
                        <input type="password" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                        <div> password is required</div>
                        }
                </div>
                <div>
                    <button>Login</button>
                    {loggingIn}
                    <Link to="/register">Register</Link>
                </div>

                </form>
            </div>