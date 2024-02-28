import React, { useRef } from 'react'
import { Modal, Form, Select, Upload, Switch, Slider } from 'antd'
import type { UploadProps, message } from 'antd';

import InboxOutlined from '@ant-design/icons/InboxOutlined'
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined'
import './styles.css'

const { Dragger } = Upload;


type Props = {
    visible: boolean
}

export const DocUpload: React.FC<Props> = (props: Props) => {
    const formRef = useRef(null)

    const submitDoc = (values: any) => {
        //create payload
        //send data to BE
        console.table(values)
    }

    //TODO: look into a working logic. basic imp
    const renderDragandDrop = () => {
        const props: UploadProps = {
            name: 'file',
            multiple: true,
            action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
            onChange(info) {
                const { status } = info.file;
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
            onDrop(e) {
                console.log('Dropped files', e.dataTransfer.files);
            },
        };

        return (
            <Dragger {...props}>
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

    const renderForm = () => (
        <Form
            onFinish={submitDoc}
            initialValues={{}}
            layout='vertical'
        >
            <div className='docUp-form-col'>
                <Form.Item name='demoName'>
                    <Select>
                        <Select.Option
                            placeholder='Select Import Name:'
                            value="importName"
                        >
                            Demo
                        </Select.Option>
                        {/* todo: fetch dummy data for showacase */}
                    </Select>
                </Form.Item>
                <Form.Item label="Select a manifest you'd like to import" valuePropName="fileList" name='docBlob'>
                    {renderDragandDrop()}
                </Form.Item>
                <Form.Item label='Tolerance Window' colon name='isToggle'>
                    <div className='docUp-form-row'>
                        <Switch />
                        <div>TOGGLE ON</div>
                        <ClockCircleOutlined />
                        <div>Select Tolerance Level</div>
                    </div>
                </Form.Item>
            </div>
            <div className='docUp-form-col'></div>
        </Form>
    )


    return (
        <div className='doc-upload-container'>
            <Modal
                open={props.visible}
                footer={null}
            >
                <div className='docUp-modal'>
                    <div className='docUp-modal-header'>
                        <div className='docUp-modal-title'>
                            Document Upload
                        </div>
                    </div>
                    <div className='docup-modal-body'>
                        {renderForm()}
                    </div>
                    <div className='docup-modal-footer'></div>
                </div>
            </Modal>
        </div>
    )

} 