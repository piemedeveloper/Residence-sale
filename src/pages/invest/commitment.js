import React from 'react'
import { Modal, notification } from 'antd';
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { numberFormatter } from '../../utils/utils';
import postData from '../../hooks/useFetch';

const { confirm } = Modal;

function Commitment({ unit, invest, commitment }) {
    const commit = () => {
        confirm({
            title: `Are you sure you want to commit $${numberFormatter(invest)}?`,
            icon: <ExclamationCircleOutlined />,
            content: `When you click 'ok' you will be commit $${numberFormatter(invest)}`,
            onOk() {
                return new Promise((resolve, reject) => {
                    postData({
                        service: "commitment",
                        data: {
                            "unit_id": unit.id,
                            "amount": invest
                        },
                    }).then((data) => {
                        if (data.success !== 1) {
                            notification.error({
                                message: "Commitment",
                                description: data.message,
                            });
                            resolve()
                        } else {
                            notification.success({
                                message: "Commitment",
                                description: data.message,
                            });
                            setTimeout(function () {
                                window.location.reload(false);
                            }, 2500);
                        }
                    });

                }).catch(() => console.log('Oops errors!'));
            },
            onCancel() { },
        });
    };


    const cancel = () => {
        confirm({
            title: `Are you sure you want to cancel your commitment?`,
            icon: <ExclamationCircleOutlined />,
            content: `When you click 'ok' you will be cancel the commitment`,
            onOk() {
                return new Promise((resolve, reject) => {
                    postData({
                        service: "cancel_commitment",
                        data: {},
                    }).then((data) => {
                        if (data.success !== 1) {
                            notification.error({
                                message: "Commitment",
                                description: data.message,
                            });
                            resolve()
                        } else {
                            notification.success({
                                message: "Commitment",
                                description: data.message,
                            });
                            setTimeout(function () {
                                window.location.reload(false);
                            }, 2500);
                        }
                    });

                }).catch(() => console.log('Oops errors!'));
            },
            onCancel() { },
        });
    };

    return (
        <div className="flex justify-center pt-4">
            {commitment.unit === 0 ? <button
                className="w-full py-3.5 text-sm text-center text-white rounded-full main-light-bg"
                onClick={commit}
            >
                Commit to Unit
            </button> : <button
                className="w-full py-3.5 text-sm text-center text-white rounded-full danger-bg"
                onClick={cancel}
            >
                Cancel Commitment
            </button>}

        </div>
    )
}

export default Commitment
