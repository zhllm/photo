import React, { useEffect, useState } from 'react';
import { List, Button, Modal, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;


const props = {
  name: 'file',
  multiple: true,
  action: 'http://api.beyourself1994.top:8112/api/upload',
  onChange(info: any) {
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
  onDrop(e: any) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

export default function () {
  const [list, setList] = useState<{ id: string; addr: string; category: string; }[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  useEffect(() => {
    fetch('/api/images/list').then(res => res.json()).then(res => {
      console.log(res);
      setList(res.data);
    });
  }, []);
  return (
    <div>
      <div style={{ margin: '16px 0' }}>
        <Button type="primary" onClick={() => setVisible(true)}> 添加图片 </Button>
      </div>
      <List
        grid={{ gutter: 16, column: 4, xs: 2 }}
        dataSource={list}
        rowKey={i => i.id}
        renderItem={item => (
          <List.Item>
            <div> <img style={{ maxWidth: '100%' }} src={item.addr} alt="" /></div>
          </List.Item>
        )}
      />

      <Modal
        title="Modal"
        visible={visible}
        okText="确认"
        cancelText="取消"
        onCancel={() => setVisible(false)}
      >
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
            band files
          </p>
        </Dragger>
      </Modal>
    </div>
  );
}
