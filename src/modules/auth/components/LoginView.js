import React from 'react';

export default function LoginView({onSubmit}) {
    return (
        <form>
            <div className="row">
                <div className="small-3 columns">
                    <label htmlFor="email">Email:</label>
                </div>
                <div className="small-9 columns">
                    <input id="email" name="email" type="text"/>
                </div>
            </div>
            <div className="row">
                <div className="small-3 columns">
                    <label htmlFor="username">Password:</label>
                </div>
                <div className="small-9 columns">
                    <input id="password" name="password" type="password"/>
                </div>
            </div>
            <div className="row">
                <div className="small-12 columns text-right">
                    <button className="button success" type="button"
                        onClick={(e) => {
                            onClick()
                        }} >Log in</button>
                </div>
            </div>
            
        </form>
    );
}