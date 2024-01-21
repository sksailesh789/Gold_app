import React from 'react'

export const Pagination = ({productPerPage , totalProducts}) => {
    const pageNumbers = [];

    let totalpage = Math.ceil(totalProducts / 5);
    console.log(totalpage,'tp')
        for(let j = 1 ; j <= 5 ; j++) {
            pageNumbers.push( j);
        }
        console.log(pageNumbers,'pn')
    
        // const nextHandler = () => {

        // }

    return (
        <div className = "pagination pagcss">
            <ul>
                <li>prev</li>
                {pageNumbers.map(number => (
                    <li key={number}>
                        {number}
                    </li>
                ))}
                {/* <li onClick={nextHandler}>next</li> */}
            </ul>
        </div>
    )
}
