
import { Tabs } from "antd";

import React, { useMemo, useState } from "react";
import postData from "../../hooks/useFetch";
import { formatDate } from "../../utils/utils";

function Wallet() {

    const [credit, setCredit] = useState([])
    const [debit, setDebit] = useState([])

    React.useEffect(() => {
        postData({
            service: "investor_payments",
            data: {
                "is_all": false,
                "is_credit": true
            },
        }).then((data) => {
            if (data.success === 1) {
                setCredit(data.data)
            }
        });

        postData({
            service: "investor_payments",
            data: {
                "is_all": false,
                "is_credit": false
            },
        }).then((data) => {
            if (data.success === 1) {
                setDebit(data.data)
            }
        });

        // eslint-disable-next-line
    }, []);


    const items = useMemo(() => [
        {
            key: "1",
            label: "Deposits",
            children: (
                <div>
                    {credit.length === 0 ? <p className="text-lg font-medium text-center">No Deposits made yet</p> :
                        <table className="w-full">
                            <thead>
                                <tr className="font-medium">
                                    <td>#</td>
                                    <td>Amount</td>
                                    <td>Status</td>
                                    <td>Date</td>
                                </tr>
                            </thead>
                            <tbody>
                                {credit.map((c, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{c.amount}</td>
                                        <td>{c.status}</td>
                                        <td>{formatDate(c.creation_datetime)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>}
                </div>
            ),
        },
        {
            key: "2",
            label: "Withdraw",
            children: <div>
                {debit.length === 0 ? <p className="text-lg font-medium text-center">No Withdraws made yet</p> :
                    <table className="w-full">
                        <thead>
                            <tr className="font-medium">
                                <td>#</td>
                                <td>Amount</td>
                                <td>Status</td>
                                <td>Date</td>
                            </tr>
                        </thead>
                        <tbody>
                            {debit.map((c, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{c.amount}</td>
                                    <td>{c.status}</td>
                                    <td>{formatDate(c.creation_datetime)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>}
            </div>,
        },
    ], [credit, debit]);


    return (
        <div className="container mx-auto">
            <h2 className="mb-3 font-medium ms-2">Your Portfolio</h2>
            <Tabs
                defaultActiveKey="1"
                centered
                destroyInactiveTabPane
                items={items}
            />

        </div>
    )
}

export default Wallet
