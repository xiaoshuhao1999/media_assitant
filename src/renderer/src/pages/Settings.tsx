import React from 'react';
import { Card, Row, Col, Typography, Switch, Button, Select, Slider, Divider, Form, Input, Space } from 'antd';
import { BulbOutlined, GlobalOutlined, SyncOutlined, FileOutlined, KeyOutlined } from '@ant-design/icons';
import { useThemeStore } from '../stores/themeStore';

const { Title, Text } = Typography;
const { Option } = Select;

export const Settings: React.FC = () => {
  const { 
    isDarkMode, 
    primaryColor, 
    borderRadius, 
    fontSize, 
    toggleTheme, 
    setPrimaryColor, 
    setBorderRadius, 
    setFontSize, 
    resetTheme 
  } = useThemeStore();

  const [form] = Form.useForm();

  return (
    <div>
      <Title level={2}>设置</Title>
      
      <Row gutter={[16, 16]}>
        {/* 外观设置 */}
        <Col xs={24} lg={12}>
          <Card title={<><BulbOutlined /> 外观设置</>}>
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              <div>
                <Text strong>主题模式</Text>
                <div style={{ marginTop: 8 }}>
                  <Switch
                    checked={isDarkMode}
                    onChange={toggleTheme}
                    checkedChildren="深色"
                    unCheckedChildren="浅色"
                  />
                </div>
              </div>
              
              <div>
                <Text strong>主色调</Text>
                <div style={{ marginTop: 8 }}>
                  <Select
                    value={primaryColor}
                    onChange={setPrimaryColor}
                    style={{ width: '100%' }}
                  >
                    <Option value="#1890ff">蓝色</Option>
                    <Option value="#52c41a">绿色</Option>
                    <Option value="#faad14">橙色</Option>
                    <Option value="#f5222d">红色</Option>
                    <Option value="#722ed1">紫色</Option>
                  </Select>
                </div>
              </div>
              
              <div>
                <Text strong>圆角大小: {borderRadius}px</Text>
                <Slider
                  min={0}
                  max={12}
                  value={borderRadius}
                  onChange={setBorderRadius}
                  style={{ marginTop: 8 }}
                />
              </div>
              
              <div>
                <Text strong>字体大小: {fontSize}px</Text>
                <Slider
                  min={12}
                  max={18}
                  value={fontSize}
                  onChange={setFontSize}
                  style={{ marginTop: 8 }}
                />
              </div>
              
              <Button onClick={resetTheme} style={{ marginTop: 16 }}>
                重置为默认设置
              </Button>
            </Space>
          </Card>
        </Col>

        {/* 应用设置 */}
        <Col xs={24} lg={12}>
          <Card title={<><GlobalOutlined /> 应用设置</>}>
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              <div>
                <Text strong>语言设置</Text>
                <div style={{ marginTop: 8 }}>
                  <Select defaultValue="zh" style={{ width: '100%' }}>
                    <Option value="zh">中文</Option>
                    <Option value="en">English</Option>
                  </Select>
                </div>
              </div>
              
              <div>
                <Text strong>自动更新</Text>
                <div style={{ marginTop: 8 }}>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div>
                <Text strong>启动时检查更新</Text>
                <div style={{ marginTop: 8 }}>
                  <Switch defaultChecked />
                </div>
              </div>
            </Space>
          </Card>
        </Col>

        {/* 媒体设置 */}
        <Col xs={24} lg={12}>
          <Card title={<><FileOutlined /> 媒体设置</>}>
            <Form form={form} layout="vertical">
              <Form.Item label="默认输出路径" name="outputPath">
                <Input placeholder="选择输出文件夹" />
              </Form.Item>
              
              <Form.Item label="默认质量设置" name="quality">
                <Select defaultValue="high">
                  <Option value="high">高质量</Option>
                  <Option value="medium">中等质量</Option>
                  <Option value="low">低质量</Option>
                </Select>
              </Form.Item>
              
              <Form.Item label="默认格式" name="format">
                <Select defaultValue="mp4">
                  <Option value="mp4">MP4</Option>
                  <Option value="avi">AVI</Option>
                  <Option value="mov">MOV</Option>
                  <Option value="wmv">WMV</Option>
                </Select>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        {/* 快捷键设置 */}
        <Col xs={24} lg={12}>
          <Card title={<><KeyOutlined /> 快捷键设置</>}>
            <Space direction="vertical" style={{ width: '100%' }} size="middle">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text>新建项目</Text>
                <Text code>Ctrl + N</Text>
              </div>
              <Divider style={{ margin: '8px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text>打开项目</Text>
                <Text code>Ctrl + O</Text>
              </div>
              <Divider style={{ margin: '8px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text>保存项目</Text>
                <Text code>Ctrl + S</Text>
              </div>
              <Divider style={{ margin: '8px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text>设置</Text>
                <Text code>Ctrl + ,</Text>
              </div>
              <Button type="primary" style={{ marginTop: 16 }}>
                自定义快捷键
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* 更新设置 */}
      <Card title={<><SyncOutlined /> 更新设置</>} style={{ marginTop: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <div>
            <Text strong>更新频率</Text>
            <div style={{ marginTop: 8 }}>
              <Select defaultValue="auto" style={{ width: 200 }}>
                <Option value="auto">自动检查</Option>
                <Option value="daily">每日检查</Option>
                <Option value="weekly">每周检查</Option>
                <Option value="manual">手动检查</Option>
              </Select>
            </div>
          </div>
          
          <div>
            <Text strong>增量更新</Text>
            <div style={{ marginTop: 8 }}>
              <Switch defaultChecked />
              <Text type="secondary" style={{ marginLeft: 8 }}>
                启用增量更新可以更快地完成更新过程
              </Text>
            </div>
          </div>
          
          <div>
            <Text strong>自动安装更新</Text>
            <div style={{ marginTop: 8 }}>
              <Switch />
              <Text type="secondary" style={{ marginLeft: 8 }}>
                下载完成后自动安装更新
              </Text>
            </div>
          </div>
        </Space>
      </Card>
    </div>
  );
}; 