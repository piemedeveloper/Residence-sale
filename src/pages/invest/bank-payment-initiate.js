import { Spin, notification } from 'antd'
import React, { useState } from 'react'
import postData from '../../hooks/useFetch'
import { useNavigate } from 'react-router-dom'
import { numberFormatter } from '../../utils/utils'
import { ceil } from 'lodash'

function BankPaymentInitiate({ user, invest, unit, pdfDoc, cValue, commitment }) {
    const [initiate, setInitiate] = useState(false)

    const navigate = useNavigate();

    const initiatePayment = () => {

        setInitiate(true)
        postData({
            service: "bank_initiate",
            data: {
                "unit_id": unit.id,
                "amount": parseFloat(invest),
                "signature": "signat5678765ure.png",
                "contract": pdfDoc,
                "currency": 800,
                "is_commitment": commitment
            },
        })
            .then((data) => {
                if (data.success === 1) {
                    notification.success({
                        message: "Bank payment",
                        description: data.message,
                    });

                    navigate("/dashboard");
                    setTimeout(function () {
                        window.location.reload(false);
                    }, 2500);

                }
                else notification.error({
                    message: "Bank payment",
                    description: data.message,
                });
                setInitiate(false)

            })
            .catch((err) => {
                setInitiate(false)
            });
    }


    return (
        <div className="bank-pay">
            <h2 className="mb-3 text-lg font-medium main-color">Bank deposit to Account below</h2>
            {user.phone_no.toString().substring(0, 3) === "256" ? <table>
                <tbody>
                    <tr>
                        <td>Account Name</td>
                        <td> Pie tech Limited</td>
                    </tr>
                    <tr>
                        <td>Account No</td>
                        <td>1036201669567</td>
                    </tr>
                    <tr>
                        <td>Bank Name</td>
                        <td>Equity bank Uganda</td>
                    </tr>
                    <tr>
                        <td>Branch</td>
                        <td>Oasis Mall</td>
                    </tr>
                    <tr>
                        <td>Amount</td>
                        <td>$ {numberFormatter(parseFloat(invest) + ceil(parseFloat(invest) * 0.03))}</td>
                    </tr>
                    <tr>
                        <td>Amount to Pay</td>
                        <td>UGX. {numberFormatter(
                            ceil(
                                parseFloat(cValue) *
                                (parseFloat(invest) + parseFloat(invest) * 0.03)
                            )
                        )}</td>
                    </tr>
                </tbody>
            </table> : <table>
                <tbody>
                    <tr>
                        <td>Bank Name</td>
                        <td>EQUITY BANK UGANDA LIMITED</td>
                    </tr>
                    <tr>
                        <td>Bank Address</td>
                        <td>PLOT 34, KAMPALA RD, CHURCH HOUSE BL, KAMPALA CEN UG</td>
                    </tr>
                    <tr>
                        <td>Account Name</td>
                        <td> Pie tech Limited</td>
                    </tr>
                    <tr>
                        <td>Account No</td>
                        <td>1036202841840</td>
                    </tr>
                    <tr>
                        <td>Branch</td>
                        <td>Oasis Mall</td>
                    </tr>
                    <tr>
                        <td>Branch Code</td>
                        <td>303647</td>
                    </tr>
                    <tr>
                        <td>Swift Code</td>
                        <td>EQBLUGKA</td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>Najeera Wakiso</td>
                    </tr>
                    <tr>
                        <td>ZIP/Box Number</td>
                        <td>70764</td>
                    </tr>
                    <tr>
                        <td>Country</td>
                        <td>Uganda</td>
                    </tr>
                    <tr>
                        <td>Amount</td>
                        <td>$ {numberFormatter(parseFloat(invest) + ceil(parseFloat(invest) * 0.03))}</td>
                    </tr>

                </tbody>
            </table>}
            <button disabled={initiate} onClick={initiatePayment} className="flex items-center justify-center w-full gap-3 p-3 mt-3 text-center text-white rounded-md main-bg">{initiate && <Spin />} Initiate bank payment</button>
        </div>
    )
}

export default BankPaymentInitiate
