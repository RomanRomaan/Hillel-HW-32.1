import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    requestLoadTodos, requestAddTodo, requestRemoveTodo,
    requestToggleTodo, requestEditTodo, requestClearTodos,
} from '../features/todos/todosActions';
import { selectTodoList, selectIsLoading, selectErrorMessage } from '../features/todos/todosSlice';
import { Card, Input, Button, List, Checkbox, Space, Typography, message } from 'antd';

const { Title } = Typography;

export default function Todos() {
    const dispatch = useDispatch();
    const todoList = useSelector(selectTodoList);
    const isLoading = useSelector(selectIsLoading);
    const errorMessage = useSelector(selectErrorMessage);

    const [newTitle, setNewTitle] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editingTitle, setEditingTitle] = useState('');

    useEffect(() => { dispatch(requestLoadTodos()); }, [dispatch]);
    useEffect(() => { if (errorMessage) message.error(errorMessage); }, [errorMessage]);

    function addTodo() {
        if (!newTitle.trim()) return;
        dispatch(requestAddTodo({ title: newTitle }));
        setNewTitle('');
    }
    function saveEdit() {
        if (!editingTitle.trim()) return;
        dispatch(requestEditTodo({ id: editingId, title: editingTitle }));
        setEditingId(null);
        setEditingTitle('');
    }

    return (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Title level={2}>Список задач</Title>

            <Card>
                <Space.Compact style={{ width: '100%' }}>
                    <Input
                        placeholder="Нова задача…"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        onPressEnter={addTodo}
                        disabled={isLoading}
                    />
                    <Button type="primary" onClick={addTodo} loading={isLoading}>Додати</Button>
                    <Button onClick={() => dispatch(requestClearTodos())} disabled={isLoading}>Очистити</Button>
                </Space.Compact>
            </Card>

            <Card>
                <List
                    loading={isLoading}
                    dataSource={todoList}
                    locale={{ emptyText: 'Немає задач' }}
                    renderItem={(item) => (
                        <List.Item
                            actions={
                                editingId === item.id
                                    ? [
                                        <Button key="save" type="link" onClick={saveEdit}>Зберегти</Button>,
                                        <Button key="cancel" type="link" onClick={() => setEditingId(null)}>Скасувати</Button>,
                                    ]
                                    : [
                                        <Button key="edit" type="link" onClick={() => { setEditingId(item.id); setEditingTitle(item.title); }}>Редагувати</Button>,
                                        <Button key="delete" type="link" danger onClick={() => dispatch(requestRemoveTodo({ id: item.id }))}>Видалити</Button>,
                                    ]
                            }
                        >
                            <List.Item.Meta
                                avatar={
                                    <Checkbox
                                        checked={item.isCompleted}
                                        onChange={() => dispatch(requestToggleTodo({ id: item.id }))}
                                    />
                                }
                                title={
                                    editingId === item.id
                                        ? <Input value={editingTitle} onChange={(e) => setEditingTitle(e.target.value)} onPressEnter={saveEdit} />
                                        : <span style={{ textDecoration: item.isCompleted ? 'line-through' : 'none', opacity: item.isCompleted ? 0.6 : 1 }}>
                                            {item.title}
                                        </span>
                                }
                            />
                        </List.Item>
                    )}
                />
            </Card>
        </Space>
    );
}
