import React from "react"

import { BsBank } from "react-icons/bs";
import postData from "../../hooks/useFetch";
import { Modal, Upload, message, notification } from "antd";
import { base_url, numberFormatter } from "../../utils/utils";
import { InboxOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { ceil } from "lodash";
import { useSelector } from "react-redux";
import { user } from "../../features";
import { useCountdown } from "../../components/useCountdown";

const { Dragger } = Upload;



const { confirm } = Modal;
function BankPay() {
    const userData = useSelector(user.user);
    const [uploads, setUploads] = React.useState([]);

    Date.prototype.addHours = function (h) {
        this.setHours(this.getHours() + h);
        return this;
    }

    const addZero = (num) => {
        if (num < 10) return "0" + num;
        return num;
    };
    const DateTimeDisplay = ({ value, type }) => {
        return (
            <div className="text-center">
                <span className="text-[0.8rem] capitalize">{type}</span>
                <p className="text-lg font-semibold text-red-500">{addZero(value)}</p>
            </div>
        );
    };

    const ShowCounter = ({ days, hours, minutes, seconds }) => {
        return (
            <div className="flex gap-2 px-6 rounded-md">
                {/* <DateTimeDisplay value={days} type={"DAY"} /> */}
                <DateTimeDisplay value={hours} type={"HRS"} />
                :<DateTimeDisplay value={minutes} type={"MINS"} />
                :<DateTimeDisplay value={seconds} type={"SEC"} />
            </div>
        );
    };

    const CountdownTimer = ({ targetDate }) => {
        const [days, hours, minutes, seconds] = useCountdown(targetDate);

        if (days + hours + minutes + seconds <= 0) {
            return <p>Timed out</p>;
        } else {
            return ShowCounter({ days, hours, minutes, seconds });
        }
    };

    const props = {
        name: 'image',
        multiple: true,
        action: base_url + "image_upload",
        beforeUpload: (file) => {
            if (!(file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg')) {
                message.error("Only Image files are allowed")
                return false
            }
            return true
        },

        onChange(info) {
            const { status } = info.file;
            if (status === 'done') {
                info.fileList.map((upload) => {
                    if (uploads[upload.uid] === undefined)
                        uploads[upload.uid] = info.file.response.data[info.file.response.data.length - 1];
                    setUploads({ ...uploads });
                });
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            } if (status === "removed") {
                delete uploads[info.file.uid];
                setUploads({ ...uploads });
            }
        },
        onDrop(e) { },
    };


    const [bankPay, setBankPay] = React.useState({})

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    React.useEffect(() => {
        postData({
            service: "bank_pay_checker",
            data: {},
        }).then((data) => {
            setBankPay(data)
        });
    }, [])


    const submitProof = () => {
        if (uploads.length <= 2) message.error("Please upload atleast 2 proof images")
        else confirm({
            title: "Please verify that the proof payment submitted is correct",
            icon: <ExclamationCircleOutlined />,
            content: "When you click 'ok' Payment proof will be submitted for verification",
            onOk() {
                handleCancel()
                postData({
                    service: "bank_pay_proof",
                    data: { payment_id: bankPay.data.id, "proof": Object.values(uploads) },
                }).then((data) => {
                    if (data.success === 1) {
                        notification.success({ message: data.message });
                        setTimeout(function () {
                            window.location.reload(false);
                        }, 2500);

                    } else message.error(data.message);
                });
            },
            onCancel() { },
        })
    }

    const cancelPayment = () => {
        confirm({
            title: "Are you sure you want to cancel payment?",
            icon: <ExclamationCircleOutlined />,
            content: "When you click 'ok' payment will be cancelled",
            onOk() {
                handleCancel()
                postData({
                    service: "cancel_bank_pay",
                    data: { id: bankPay.data.id },
                }).then((data) => {
                    if (data.success === 1) {
                        message.success(data.message);
                        setTimeout(function () {
                            window.location.reload(false);
                        }, 2500);

                    } else message.error(data.message);
                });
            },
            onCancel() { },
        });
    }

    return (
        <>
            {Object.keys(bankPay).length !== 0 && bankPay.success === 0 && <>
                <Modal title="Pending Bank Payment"
                    maskClosable={false}
                    open={isModalOpen}
                    footer={[]}
                    onOk={handleOk}
                    width={800}
                    onCancel={handleCancel}>
                    <div className="mt-6 mb-3 bank-pay">
                        {bankPay.data.bank_proof == null ? <>
                            {userData.phone_no !== undefined && userData.phone_no.toString().substring(0, 3) === "256" ? <div>
                                <div className="w-32 mb-4">
                                    <CountdownTimer
                                        targetDate={new Date(bankPay.data.creation_datetime).addHours(12).getTime()}
                                    />
                                </div>
                                <table>
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
                                            <td>$ {numberFormatter(parseFloat(bankPay.data.amount + ceil(bankPay.data.fee)))}</td>
                                        </tr>
                                        <tr>
                                            <td>Amount to Pay</td>
                                            <td>UGX. {numberFormatter(bankPay.data.curreny_amount + bankPay.data.currency_fee)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div> : <table>
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
                                        <td>$ {numberFormatter(parseFloat(bankPay.data.amount + ceil(bankPay.data.fee)))}</td>
                                    </tr>

                                </tbody>
                            </table>
                            }


                            <p className="my-6 text-lg font-medium"> Upload Proof of payment</p>
                            <Dragger {...props} maxCount={2} accept="image/png, image/jpg/image/jpeg/image/gif">
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">
                                    Upload the bank proof of payment here (max 3 files)
                                </p>
                            </Dragger>

                            <div className="flex gap-6 mt-6">
                                <button className="cancel-btn" onClick={cancelPayment}>Cancel Payment</button>
                                <button className="login-btn" onClick={submitProof}>Upload Proof</button>
                            </div>
                        </> : <p className="text-lg">Under payment Verification<br />Please try again later or contact support for immediate feedback</p>}
                    </div>

                </Modal>
                <div className="fixed flex items-center p-2 bg-white border rounded-full cursor-pointer right-3 top-20" onClick={showModal}>
                    <div className="flex flex-col justify-center text-center ms-3">
                        <p className="text-lg font-medium">Bank Payment</p>
                        <CountdownTimer
                            targetDate={new Date(bankPay.data.creation_datetime).addHours(12).getTime()}
                        />
                    </div>
                    <div className="p-4 rounded-full main-bg gelatine">
                        <BsBank className="text-3xl text-white" />
                    </div>
                </div>
            </>}
        </>
    )
}

export default BankPay
