import React from "react";


const Loan = () => {

  const handleLoan = () => {
    const uniqueID = 1, bookedStatus = true;
    window.location.href = `/gare_bookings/loan?uniqueID=${uniqueID}&bookedStatus=${bookedStatus}`
  }

  return (
    <div>
      <button type="submit" onClick={handleLoan}>Get a Loan</button>
    </div>
  )
}

export default Loan;