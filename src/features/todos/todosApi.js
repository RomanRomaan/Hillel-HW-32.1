const STORAGE_KEY = 'todos';
const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms));

const readAll = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch { return []; }
};
const writeAll = (list) => localStorage.setItem(STORAGE_KEY, JSON.stringify(list));

export async function apiLoadTodos() { await delay(); return readAll(); }
export async function apiAddTodo(todo) { await delay(); const l = readAll(); l.push(todo); writeAll(l); return todo; }
export async function apiRemoveTodo(id) { await delay(); const l = readAll().filter(x => x.id !== id); writeAll(l); return id; }
export async function apiToggleTodo(id) { await delay(); const l = readAll().map(x => x.id === id ? { ...x, isCompleted: !x.isCompleted } : x); writeAll(l); return id; }
export async function apiEditTodo(id, title) { await delay(); const l = readAll().map(x => x.id === id ? { ...x, title } : x); writeAll(l); return { id, title }; }
export async function apiClearTodos() { await delay(); writeAll([]); return true; }
