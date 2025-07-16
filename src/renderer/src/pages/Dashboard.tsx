import React from 'react';
import { Card, Row, Col, Statistic, Typography, Button, Space, List, Tag } from 'antd';
import { 
  ProjectOutlined, 
  FileImageOutlined, 
  PlayCircleOutlined, 
  CheckCircleOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export const Dashboard: React.FC = () => {
  // 模拟数据
  const stats = [
    {
      title: '总项目数',
      value: 12,
      icon: <ProjectOutlined style={{ color: '#1890ff' }} />,
    },
    {
      title: '媒体文件',
      value: 156,
      icon: <FileImageOutlined style={{ color: '#52c41a' }} />,
    },
    {
      title: '进行中任务',
      value: 8,
      icon: <PlayCircleOutlined style={{ color: '#faad14' }} />,
    },
    {
      title: '已完成任务',
      value: 24,
      icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
    },
  ];

  const recentProjects = [
    {
      id: 1,
      name: '产品介绍视频',
      type: 'video',
      status: 'active',
      updatedAt: '2 小时前',
    },
    {
      id: 2,
      name: '品牌宣传图片',
      type: 'image',
      status: 'completed',
      updatedAt: '5 小时前',
    },
    {
      id: 3,
      name: '播客音频剪辑',
      type: 'audio',
      status: 'active',
      updatedAt: '1 天前',
    },
  ];

  const pendingTasks = [
    { id: 1, title: '视频剪辑', priority: 'high', dueDate: '今天' },
    { id: 2, title: '音频降噪', priority: 'medium', dueDate: '明天' },
    { id: 3, title: '图片批量处理', priority: 'low', dueDate: '本周' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'processing';
      case 'completed': return 'success';
      case 'archived': return 'default';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'green';
      default: return 'default';
    }
  };

  return (
    <div>
      <Title level={2}>工作台</Title>
      <Paragraph>欢迎使用自媒体助手，这里是您的项目概览。</Paragraph>
      
      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.icon}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        {/* 最近项目 */}
        <Col xs={24} lg={12}>
          <Card 
            title="最近项目"
            extra={
              <Button type="primary" icon={<PlusOutlined />}>
                新建项目
              </Button>
            }
          >
            <List
              itemLayout="horizontal"
              dataSource={recentProjects}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button key="edit" type="text" icon={<EditOutlined />} />,
                    <Button key="delete" type="text" danger icon={<DeleteOutlined />} />,
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <Space>
                        {item.name}
                        <Tag color={getStatusColor(item.status)}>
                          {item.status === 'active' ? '进行中' : '已完成'}
                        </Tag>
                      </Space>
                    }
                    description={`类型: ${item.type} • 更新: ${item.updatedAt}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* 待办任务 */}
        <Col xs={24} lg={12}>
          <Card 
            title="待办任务"
            extra={
              <Button type="primary" icon={<PlusOutlined />}>
                新建任务
              </Button>
            }
          >
            <List
              itemLayout="horizontal"
              dataSource={pendingTasks}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button key="complete" type="text" icon={<CheckCircleOutlined />} />,
                    <Button key="edit" type="text" icon={<EditOutlined />} />,
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <Space>
                        {item.title}
                        <Tag color={getPriorityColor(item.priority)}>
                          {item.priority === 'high' ? '高优先级' : 
                           item.priority === 'medium' ? '中优先级' : '低优先级'}
                        </Tag>
                      </Space>
                    }
                    description={`截止: ${item.dueDate}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* 快速操作 */}
      <Card title="快速操作" style={{ marginTop: 16 }}>
        <Space wrap>
          <Button type="primary" icon={<ProjectOutlined />} size="large">
            新建项目
          </Button>
          <Button icon={<FileImageOutlined />} size="large">
            导入媒体
          </Button>
          <Button icon={<PlayCircleOutlined />} size="large">
            批量处理
          </Button>
          <Button icon={<CheckCircleOutlined />} size="large">
            导出项目
          </Button>
        </Space>
      </Card>
    </div>
  );
}; 