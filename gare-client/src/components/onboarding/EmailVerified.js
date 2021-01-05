import React, { useEffect, useState } from "react";

const BASE_URL = process.env.REACT_APP_API_URL;

const EmailVerified = () => {
  const [ message, setMessage ] = useState("");
  const [ errMsg, setError ] = useState([]);
  const [ tok, setToken ] = useState("");

  useEffect(() => {
    const tok = window.location.pathname.slice(14);
    setToken(tok)
  }, []);

  useEffect(() => {
    const data = { email_verification_token: tok }
    console.log(data, " this is the data content")
    fetch(`${BASE_URL}/user/verify_email`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(resp => {
        if (resp.error) return setError(resp.error);
        console.log(resp)
        setMessage(resp)
      })
      .catch(err => {
        setError(err.message);
      })
  }, [ tok ]);

  
  return (
    <div>
      {errMsg.length ? <p>{errMsg[0] && errMsg[0].msg}</p> : null}
      <h1>Verified page</h1>
      {/* <h2>{message}</h2> */}
    </div>
  );
}

export default EmailVerified;