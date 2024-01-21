import React from 'react'
const numWords = require('num-words')


const salesDetail = ({fiscalyear,billno,partyname,address,paymentMethod,refferedId,lists,partypan,total,subTotal,engdate}) => {
  return (
    <>
    <h5>Sales Detail</h5>
    <form className="form" >                
            <div className="sc_top">
                <div className="sct_left">
                    <div className="form-group ">
                        <div className="form-group-wrap">
                            <label for="fiscalyear">Fiscal Year :</label>
                            <input
                                type="text"
                                id="fiscalyear"
                                name="fiscalyear"
                                value={fiscalyear.date}
                                disabled
                                />
                        </div>
                    </div>
                    <div className="form-group ">
                        <div className="form-group-wrap">
                            <label for="billno">Bill No:</label>
                            <input
                                type="text"
                                id="billno"
                                name="billno"
                                value={billno}
                                disabled
                                />
                        </div>
                    </div>     
                </div>
                <div className="sct_right">
                    <div className="form-group ">
                        <div className="form-group-wrap">
                            <label for="engdate">English Date :</label>
                            <input type ="text" value={engdate.slice(0,10)} disabled/>
                        </div>
                    </div> 
                    {/* <div className="form-group ">
                        <div className="form-group-wrap">
                            <label for="nepalidate">Nepali. Date :</label>
                            <NepaliDatePicker 
                            inputClassName="form-control"
                              className=""
                              value={nepalidate}
                              options={{ calenderLocale: "ne", valueLocale: "en" }} />
                        </div>
                    </div> */}
                </div>
                    
        </div>
        <div className="sc_mid">
            <div className="scm_left">
                <div className="form-group ">
                    <div className="form-group-wrap">
                        <label for="partyname">Party Name :</label>
                        <input
                            type="text"
                            placeholder="Party name"
                            id="partyname"
                             name="partyname"
                            value={partyname}
                            disabled
                            />
                    </div>
                </div>
                <div className="form-group ">
                    <div className="form-group-wrap">
                        <label for="address">Address :</label>
                        <input
                            type="text"
                            placeholder="address"
                            id="address"
                            name="address"
                            value={address}
                            disabled
                            />
                    </div>
                </div>

            </div>
            <div className="scm_right">
                <div className="form-group ">
                        <div className="form-group-wrap">
                            <label for="paymentmode">Payment Mode :</label>
                            <input 
                                type="text"
                                value={paymentMethod}
                                disabled
                            />
                            
                        </div>
                </div>
                <div className="form-group ">
                    <div className="form-group-wrap">
                        <label for="partypan">Party PAN :</label>
                        <input
                            type="text"
                            id="partypan"
                            name="partypan"
                            value={partypan}
                            disabled
                            />
                    </div>
                </div>
                <div className="form-group ">
                    <div className="form-group-wrap">
                        <label for="refferalUser">Refferal User :</label>
                        <input 
                                type="text"
                                value={refferedId ? refferedId.name : ''}
                                disabled
                            />
                    </div>
                </div>

            </div>
        </div>
        <div className="sc_bottom">
            <div className="scb_table">
                <div className = 'table_wrap' >
            <table style={{width:'100%'}}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Particulars</th>
                        <th>Type</th>
                        <th>तौल</th>
                        <th>जर्ती</th>
                        <th>जर्ती समेतको तौल</th>
                        <th>Rate</th>
                        <th>ज्याला</th>
                        <th>पत्थर/पोते</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {lists.map((list,index) => (
                        <tr key={index}>
                            <td>{index + 1 }</td>
                            <td>{list.particulars.name}</td>
                            <td>{list.ornamentType}</td>
                            <td>{list.weight}</td>
                            <td>{list.jarti}</td>
                            <td>{list.totalWeight}</td>
                            <td>{list.rate}</td>
                            <td>{list.jyala}</td>
                            <td>{list.patthar}</td>
                            <td>{list.price}</td>

                        </tr>
                    ))} 
                </tbody>
            </table>
           
            </div>
            </div>               
        </div>
        <div className="sc_footer">
            <div className="scf_left">
                    In Words: {numWords(total)} rupees only
            </div>
            <div className="scf_right">
                <div className="form-group ">
                    <div className="form-group-wrap">
                        <label for="subtotal">SubTotal :</label>
                        <input
                            type="text"
                            id="subtotal"
                            name="subTotal"
                            value={subTotal}
                            disabled
                        />
                    </div>
                </div>
               
                <div className="form-group ">
                    <div className="form-group-wrap">
                        <label for="total">Total :</label>
                        <input
                            type="text"
                            id="total"
                            name="total"
                            value={total}
                            disabled
                        />
                        
                    </div>
                </div>
            </div>
        </div>
            </form>
            </>
  )
}

export default salesDetail