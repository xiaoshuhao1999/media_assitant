import React from 'react';
import { Modal, Progress, Button, Typography, Space, Alert } from 'antd';
import { DownloadOutlined, ReloadOutlined, CloseOutlined } from '@ant-design/icons';
import { useUpdateStore } from '../stores/updateStore';

const { Title, Paragraph } = Typography;

export const UpdateModal: React.FC = () => {
  const {
    showUpdateModal,
    showDownloadModal,
    showInstallModal,
    updateInfo,
    downloadProgress,
    updateError,
    isDownloading,
    downloadUpdate,
    installUpdate,
    dismissUpdate,
  } = useUpdateStore();

  // 更新可用模态框
  const UpdateAvailableModal = () => (
    <Modal
      title="发现新版本"
      open={showUpdateModal}
      onCancel={dismissUpdate}
      footer={[
        <Button key="later" onClick={dismissUpdate}>
          稍后更新
        </Button>,
        <Button key="download" type="primary" icon={<DownloadOutlined />} onClick={downloadUpdate}>
          立即更新
        </Button>,
      ]}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Title level={4}>版本 {updateInfo?.version}</Title>
        <Paragraph>
          发现新版本，建议您及时更新以获得最佳体验和最新功能。
        </Paragraph>
        {updateInfo?.releaseNotes && (
          <div>
            <Title level={5}>更新说明:</Title>
            <Paragraph>
              <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                {updateInfo.releaseNotes}
              </pre>
            </Paragraph>
          </div>
        )}
      </Space>
    </Modal>
  );

  // 下载进度模态框
  const DownloadProgressModal = () => (
    <Modal
      title="正在下载更新"
      open={showDownloadModal}
      closable={false}
      maskClosable={false}
      footer={[
        <Button key="cancel" icon={<CloseOutlined />} onClick={dismissUpdate}>
          取消下载
        </Button>,
      ]}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Progress
          percent={downloadProgress?.percent || 0}
          status={isDownloading ? 'active' : 'normal'}
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
        />
        <div style={{ textAlign: 'center' }}>
          {downloadProgress && (
            <Paragraph>
              已下载: {Math.round(downloadProgress.transferred / 1024 / 1024)}MB / {Math.round(downloadProgress.total / 1024 / 1024)}MB
            </Paragraph>
          )}
        </div>
        {updateError && (
          <Alert
            message="下载失败"
            description={updateError}
            type="error"
            showIcon
          />
        )}
      </Space>
    </Modal>
  );

  // 安装更新模态框
  const InstallUpdateModal = () => (
    <Modal
      title="更新已准备就绪"
      open={showInstallModal}
      onCancel={dismissUpdate}
      footer={[
        <Button key="later" onClick={dismissUpdate}>
          稍后安装
        </Button>,
        <Button 
          key="install" 
          type="primary" 
          icon={<ReloadOutlined />} 
          onClick={installUpdate}
        >
          立即安装
        </Button>,
      ]}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Title level={4}>版本 {updateInfo?.version}</Title>
        <Paragraph>
          新版本已下载完成！应用将重启以完成更新安装。
        </Paragraph>
        <Alert
          message="重要提示"
          description="安装更新时应用将会重启，请确保已保存当前工作。"
          type="warning"
          showIcon
        />
      </Space>
    </Modal>
  );

  return (
    <>
      <UpdateAvailableModal />
      <DownloadProgressModal />
      <InstallUpdateModal />
    </>
  );
}; 