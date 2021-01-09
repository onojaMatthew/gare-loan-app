import React, { useState, useEffect } from "react";
import querystring from "query-string";

const BASE_URL = process.env.REACT_APP_API_URL;

const Prepage = (props) => {
  const [ uniqueId, setUniqueId ] = useState("");
  const [ bookedStatus, setBookedStatus ] = useState("");
  const params = querystring.parse(props.location.search, { ignoreQueryPrefix: true });

  useEffect(() => {
    setBookedStatus(params.bookedStatus);
    setUniqueId(params.uniqueID)
  }, [ params ]);

  useEffect(() => {
    const data = { uniqueID: uniqueId, bookedStatus }
    if (bookedStatus && uniqueId) {
      fetch(`${BASE_URL}/gare_bookings/loan`, {
        method: "POST",
        headers: {
          ACCEPT: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(resp => {
          console.log(resp, " server ressponse")
        })
        .catch(err => {
          // if (err) console.log(err.message)
        });
    }
    

  }, [ bookedStatus, uniqueId ]);

  return (
    <div>
      <h1>Prepage component</h1>
    </div>
  );
}

export default Prepage;