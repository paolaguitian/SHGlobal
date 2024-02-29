import React, { useRef, useState } from 'react'
import { Modal, Form, Select, Upload, Switch, Radio, Button } from 'antd'
import type { UploadProps, message } from 'antd';

import InboxOutlined from '@ant-design/icons/InboxOutlined'
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined'
import './styles.css'

const { Dragger } = Upload;


type Props = {
    visible: boolean
    closeModal: () => void
}

/**
 * TODO:
 * add API call for dummy dropdown values
 * expand on file list, check on base64
 */
export const DocUpload: React.FC<Props> = (props: Props) => {
    const [isOnOff, setisOnOff] = useState('OFF');
    const formRef = useRef(null)

    const submitDoc = (values: any) => {
        //send data to BE
        console.table(values)
    }

    //returns all file uploaded to form value
    const getFileList = (e: any) => {
        if (Array.isArray(e)) return e
        return e?.fileList
    }

    const renderDragandDrop = () => {
        return (
            <Dragger>
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
        <Form.Item name={name}>
            <div className='docUp-form-row'>
                <div>{label}</div>
                <Select placeholder='Client Name' style={{ width: '190px', height: '50px' }}>
                    <Select.Option
                        value={'getCode'}
                    >
                        Demo
                    </Select.Option>
                    <ClockCircleOutlined />

                    {/* todo: fetch dummy data for showacase */}
                </Select>
            </div>
        </Form.Item>
    )

    //placeholder f(x) for whatever logic PO asks
    const getChecking = (label: string, status: string) => (
        <div className='docUp-form-checks'>
            <div className='docUp-form-checks-label'>{label}</div>
            <div className='docUp-form-checks-status'>{status}</div>
        </div>
    )

    const renderForm = () => (
        <Form
            initialValues={{}}
            layout='vertical'
            className='docUp-modal-body'
            onFinish={submitDoc}
            ref={formRef}
        >
            <div className='docUp-form-col'>
                <Form.Item name='demoName'>
                    <Select placeholder='Select Import Name:'>
                        <Select.Option value="importName">
                            Demo
                        </Select.Option>
                        {/* todo: fetch dummy data for showacase */}
                    </Select>
                </Form.Item>
                <Form.Item label="Select a manifest you'd like to import" valuePropName="fileList" getValueFromEvent={getFileList} name='docBlob'>
                    {renderDragandDrop()}
                </Form.Item>
                {getChecking('Elapse Data Checking', 'No Elapsed Dates!')}
                <Form.Item label='Tolerance Window' name='toleranceWindow' valuePropName='checked'>
                    <div className='docUp-form-row'>
                        <Switch onChange={(checked) => checked ? setisOnOff('ON') : setisOnOff('OFF')} />
                        <div>{`Toggle ${isOnOff}`}</div>
                        <div className='docUp-form-divider' />
                        <ClockCircleOutlined />
                        <div>Select Tolerance Level</div>
                    </div>
                </Form.Item>
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