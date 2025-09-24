import { Card, Tag, Space, Typography, List } from 'antd';
const { Title, Paragraph, Text } = Typography;

export default function Home() {
    const skills = ['JavaScript', 'React', 'Redux Toolkit', 'Redux-Saga', 'HTML', 'CSS', 'Git', 'REST'];
    const experience = [
        { title: 'Frontend Trainee / Pet-проєкти', period: '2024–2025', details: 'React + Vite, стан додатків, форми, роутинг, деплой на GH Pages.' },
        { title: 'QA / Manual', period: '2025', details: 'Тест-кейси, баг-репорти, перевірка UI/UX, Postman для ручних перевірок.' },
    ];

    return (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Title level={2}>Привіт! Я — Frontend-розробник</Title>
            <Paragraph>
                Люблю чистий код і зрозумілу архітектуру. React, Redux Toolkit, Redux-Saga, роутинг, робота з API.
            </Paragraph>

            <Card title="Навички">
                <Space wrap>
                    {skills.map((s) => <Tag key={s}>{s}</Tag>)}
                </Space>
            </Card>

            <Card title="Досвід">
                <List
                    dataSource={experience}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                title={<Text strong>{item.title}</Text>}
                                description={<>
                                    <Text type="secondary">{item.period}</Text>
                                    <br />{item.details}
                                </>}
                            />
                        </List.Item>
                    )}
                />
            </Card>

            <Card title="Контакти">
                <Paragraph>
                    Email: <a href="mailto:you@example.com">you@example.com</a><br />
                    Telegram: <a href="https://t.me/https://t.me/romanptv" target="_blank" rel="noreferrer">@https://t.me/romanptv</a><br />
                    GitHub: <a href="https://github.com/your_github" target="_blank" rel="noreferrer">github.com/your_github</a>
                </Paragraph>
            </Card>
        </Space>
    );
}
