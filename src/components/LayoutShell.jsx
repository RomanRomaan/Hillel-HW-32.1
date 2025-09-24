import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const items = [
    { key: '/', label: <Link to="/">Головна</Link> },
    { key: '/todos', label: <Link to="/todos">TODO</Link> },
    { key: '/swapi', label: <Link to="/swapi">SWAPI</Link> },
];

export default function LayoutShell({ children }) {
    const { pathname } = useLocation();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
                <div style={{ color: '#fff', fontWeight: 700, marginRight: 24, float: 'left' }}>
                    Моє портфоліо
                </div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[pathname === '/' ? '/' : pathname]}
                    items={items}
                />
            </Header>

            <Content style={{ padding: '24px', maxWidth: 1100, margin: '0 auto', width: '100%' }}>
                {children}
            </Content>

            <Footer style={{ textAlign: 'center' }}>
                © {new Date().getFullYear()} Ваше ім’я • Email: you@example.com • Telegram: @your_nick
            </Footer>
        </Layout>
    );
}
