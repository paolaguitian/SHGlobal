import React, { useRef, useState, useEffect, useCallback } from 'react'
import { Modal, Form, Select, Upload, Switch, Radio, Button, Alert } from 'antd'

import InboxOutlined from '@ant-design/icons/InboxOutlined'
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined'
import './styles.css'

const { Dragger } = Upload;

type Props = {
    visible: boolean
    closeModal: () => void
}

type Pokemon = {
    name: string,
    url: string
}

export const DocUpload: React.FC<Props> = (props: Props) => {
    const [isOnOff, setisOnOff] = useState('OFF');
    const formRef = useRef<any>()
    const [options, setOptions] = useState([]);
    const [notificationStatus, setNotificationStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    const getDummyData = useCallback(async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/berry/');
            const data = await response.json()
            const options = data?.results?.map((item: Pokemon) => ({ value: item?.name, label: item?.name }));
            setOptions(options)
        } catch (error) {
            console.error('fetching options', error)
        }
    }, [])

    useEffect(() => {
        getDummyData()
    }, [getDummyData])

    const submitDoc = async (values: any) => {
        console.table(values)
        setIsLoading(true)
        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: JSON.stringify(values),
            });
            const submitStatus = await response.json()
            setIsLoading(false)
            setNotificationStatus('success')
        } catch (error) {
            console.error('submitting doc', error)
            setIsLoading(false)
            setNotificationStatus('error')

        }
    }

    //returns all file uploaded to form value
    const getFileList = (e: any) => {
        if (Array.isArray(e)) return e
        return e?.fileList
    }

    const renderDragandDrop = () => {
        return (
            <Dragger beforeUpload={() => false}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                    banned files.
                </p>
            </Dragger>
        )
    }

    const getTestingCenter = (name: string, label: string) => (
        <div className='docUp-form-item-row'>
            <div className=''>{label}</div>
            <Form.Item name={name}>
                <Select
                    placeholder='Client Name'
                    options={options}
                    style={{ width: '190px', height: '50px' }}
                />
            </Form.Item>
        </div>
    )

    //placeholder f(x) for whatever logic PO asks
    const getChecking = (label: string, status: string) => (
        <div className='docUp-form-checks'>
            <div className='docUp-form-checks-label'>{label}</div>
            <div className='docUp-form-checks-status'>{status}</div>
        </div>
    )

    const renderNotificationStatus = () => {
        switch (notificationStatus) {
            case 'success':
                return <Alert message="Your document has been uploaded" type="success" />
            case 'error':
                return <Alert message="Could not upload document. Try again later" type="error" />
            default:
                return null
        }
    }

    const renderForm = () => (
        <Form
            layout='vertical'
            className='docUp-modal-body'
            onFinish={submitDoc}
            ref={formRef}
        >
            <div className='docUp-form-col'>
                <Form.Item name='demoName'>
                    <Select placeholder='Select Import Name:' options={options} />
                </Form.Item>
                <Form.Item label="Select a manifest you'd like to import" valuePropName="fileList" getValueFromEvent={getFileList} name='docBlob'>
                    {renderDragandDrop()}
                </Form.Item>
                {getChecking('Elapse Data Checking', 'No Elapsed Dates!')}
                <div className='docUp-form-item-row'>
                    <Form.Item label='Tolerance Window' name='toleranceWindow' valuePropName="checked">
                        <Switch onChange={(checked) => checked ? setisOnOff('ON') : setisOnOff('OFF')} />
                    </Form.Item>
                    <div className='docUp-form-row'>
                        <div>{`Toggle ${isOnOff}`}</div>
                        <div className='docUp-form-divider' />
                        <div>Select Tolerance Level</div>
                        <ClockCircleOutlined />
                    </div>
                </div>
            </div>
            <div className='docUp-form-col'>
                <Form.Item label="Split schedule using social distancing?" name='scheduleSplit'>
                    <Radio.Group>
                        <Radio value="0"> Yes </Radio>
                        <Radio value="1"> No </Radio>
                    </Radio.Group>
                </Form.Item>
                {getChecking('Location Checking', 'All Available!')}
                <Form.Item label="Client" name='client'>
                    <Radio.Group>
                        <Radio value="0"> Single </Radio>
                        <Radio value="1"> Multiple </Radio>
                    </Radio.Group>
                </Form.Item>
                {getTestingCenter('tc1', 'Testing Center 1')}
                {getTestingCenter('tc2', 'Testing Center 2')}
                {getTestingCenter('tc3', 'Testing Center 3')}
                {getTestingCenter('tc4', 'Testing Center 4')}
            </div>
        </Form>
    )


    return (
        <div className='doc-upload-container'>
            <Modal
                open={props.visible}
                footer={null}
                width={1000}
                onCancel={props.closeModal}
            >
                <div className='docUp-modal'>
                    <div className='docUp-modal-header'>
                        <div className='docUp-modal-title'>
                            Document Upload
                        </div>
                    </div>
                    {renderNotificationStatus()}
                    <div>
                        {renderForm()}
                    </div>
                    <div className='docUp-modal-footer'>
                        <div className='docUp-modal-submit-title'>
                            Data in the import file is correct. Please press Continue to import.
                        </div>
                        <div className='docUp-modal-submit-buttons'>
                            <Button
                                type="primary"
                                className='docUp-modal-submit-button'
                                loading={isLoading}
                                onClick={() => formRef?.current?.submit()}
                            >
                                Continue Import
                            </Button>
                            <Button
                                className='docUp-modal-cancel-button'
                                onClick={props.closeModal}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )

} 