import { indigo, pink } from '@mui/material/colors';
import GlobalStyles from '@mui/material/GlobalStyles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { isTodos } from './lib/isTodo';

// テーマを作成
const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
      light: '#757de8',
      dark: '#002984',
    },
    // ついでにセカンダリーカラーも v4 に戻す
    secondary: {
      main: pink[500],
      light: '#ff6090',
      dark: '#b0003a',
    },
  },
});
// localforage をインポート
import localforage from 'localforage';

import { useState, useEffect } from 'react';
import { ToolBar } from './ToolBar';
import { FormDialog } from './FormDialog';
import { ActionButton } from './ActionButton';
import { SideBar } from './SideBar';
import { TodoItem } from './TodoItem';
import { QR } from './QR';
import { AlertDialog } from './AlertDialog';

export const App = () => {
  //state
  const [text, setText] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  //useEffect
  /**
   * キー名 'todo-sample-2023' のデータを取得
   * 第 2 引数の配列が空なのでコンポーネントのマウント時のみに実行される
   */
  useEffect(() => {
    localforage
      .getItem('todo-sample-2023')
      .then((values) => isTodos(values) && setTodos(values));
  }, []);

  /**
   * todos ステートが更新されたら、その値を保存
   */
  useEffect(() => {
    localforage.setItem('todo-sample-2023', todos);
  }, [todos]);

  //functions
  const handleToggleAlert = () => setAlertOpen(!alertOpen);
  const handleToggleDialog = () => {
    setDialogOpen(!dialogOpen);
    // フォームへの入力をクリア
    setText('');
  };
  const handleToggleQR = () => setQrOpen(!qrOpen);
  const handleToggleDrawer = () => setDrawerOpen(!drawerOpen);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setText(e.target.value);
  };
  const handleSort = (filter: Filter) => {
    setFilter(filter);
  };
  const handleSubmit = () => {
    if (!text) {
      setDialogOpen(false);
      return;
    }

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    };
    setTodos([...todos, newTodo]);
    setText('');
    // FormDialog コンポーネントを閉じる
    setDialogOpen(false);
  };
  const handleEmpty = () => {
    const newTodos = todos.filter((todo) => !todo.removed);
    setTodos(newTodos);
  };
  const handleTodo = <
    T extends number,
    U extends keyof Todo,
    V extends Todo[U]
  >(
    id: T,
    key: U,
    value: V
  ) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));
    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo[key] = value;
      }
      return todo;
    });
    setTodos(newTodos);
  };
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
      <ToolBar filter={filter} onToggleDrawer={handleToggleDrawer} />
      <SideBar
        onSort={handleSort}
        onToggleDrawer={handleToggleDrawer}
        onToggleQR={handleToggleQR}
        drawerOpen={drawerOpen}
      />
      <QR open={qrOpen} onClose={handleToggleQR} />
      <FormDialog
        text={text}
        dialogOpen={dialogOpen}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onToggleDialog={handleToggleDialog}
      />
      <AlertDialog
        alertOpen={alertOpen}
        onToggleAlert={handleToggleAlert}
        onEmpty={handleEmpty}
      />
      <TodoItem todos={todos} filter={filter} onTodo={handleTodo} />
      <ActionButton
        todos={todos}
        filter={filter}
        alertOpen={alertOpen}
        dialogOpen={dialogOpen}
        onToggleAlert={handleToggleAlert}
        onToggleDialog={handleToggleDialog}
      />
    </ThemeProvider>
  );
};
