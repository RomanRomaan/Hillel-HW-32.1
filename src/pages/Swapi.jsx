import { useEffect, useState } from 'react';
import { Card, Table, Space, Typography, Input, Pagination } from 'antd';

const { Title } = Typography;

export default function Swapi() {
    const [people, setPeople] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    async function loadPeople(p = 1, q = '') {
        setLoading(true);
        try {
            const url = new URL('https://swapi.dev/api/people/');
            url.searchParams.set('page', p);
            if (q) url.searchParams.set('search', q);
            const res = await fetch(url.toString());
            const data = await res.json();
            setPeople(data.results || []);
            setCount(data.count || 0);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { loadPeople(page, search); }, [page, search]);

    const columns = [
        { title: 'Імʼя', dataIndex: 'name', key: 'name' },
        { title: 'Зріст', dataIndex: 'height', key: 'height' },
        { title: 'Вага', dataIndex: 'mass', key: 'mass' },
        { title: 'Стать', dataIndex: 'gender', key: 'gender' },
        { title: 'Рік народження', dataIndex: 'birth_year', key: 'birth_year' },
    ];

    return (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Title level={2}>SWAPI (Star Wars)</Title>

            <Card>
                <Input.Search
                    placeholder="Пошук персонажів…"
                    allowClear
                    enterButton="Пошук"
                    onSearch={(v) => { setPage(1); setSearch(v.trim()); }}
                    loading={loading}
                />
            </Card>

            <Card>
                <Table
                    rowKey={(r) => r.url}
                    dataSource={people}
                    columns={columns}
                    loading={loading}
                    pagination={false}
                />
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                    <Pagination
                        current={page}
                        total={count}
                        pageSize={10}
                        onChange={(p) => setPage(p)}
                        showSizeChanger={false}
                    />
                </div>
            </Card>
        </Space>
    );
}
