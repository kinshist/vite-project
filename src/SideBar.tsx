type Props = {
  drawerOpen: boolean;
  onToggleDrawer: () => void;
  onToggleQR: () => void;
  onSort: (filter: Filter) => void;
};

import Icon from '@mui/material/Icon';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

// モジュールとカラーのインポート
import { styled } from '@mui/material/styles';
import { indigo, lightBlue, pink } from '@mui/material/colors';

// ドロワー内リストの幅をカスタマイズ
const DrawerList = styled('div')(() => ({
  width: 250,
}));

// ドロワーヘッダーのサイズ・色などをカスタマイズ
const DrawerHeader = styled('div')(() => ({
  height: 150,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1em',
  backgroundColor: indigo[500],
  color: '#ffffff',
  fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
}));

// ヘッダー内に表示するアバターのカスタマイズ
const DrawerAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: pink[500],
  width: theme.spacing(6),
  height: theme.spacing(6),
}));

import pjson from '../package.json';

export const SideBar = (props: Props) => {
  return (
    <Drawer
      variant="temporary"
      open={props.drawerOpen}
      onClose={props.onToggleDrawer}
    >
      <DrawerList role="presentation" onClick={props.onToggleDrawer}>
        <DrawerHeader>
          <DrawerAvatar>
            <Icon>create</Icon>
          </DrawerAvatar>
          <p>TODO v{pjson.version}</p>
        </DrawerHeader>
        <List>
          <ListItem>
            <ListItemButton onClick={() => props.onSort('all')}>
              <ListItemIcon>
                <Icon>subject</Icon>
              </ListItemIcon>
              <ListItemText secondary="すべてのタスク" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => props.onSort('unchecked')}>
              <ListItemIcon>
                <Icon>radio_button_unchecked</Icon>
              </ListItemIcon>
              <ListItemText secondary="現在のタスク" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => props.onSort('checked')}>
              <ListItemIcon>
                <Icon>check_circle_outline</Icon>
              </ListItemIcon>
              <ListItemText secondary="完了したタスク" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => props.onSort('removed')}>
              <ListItemIcon>
                <Icon>delete</Icon>
              </ListItemIcon>
              <ListItemText secondary="ごみ箱" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemButton onClick={() => props.onToggleQR()}>
              <ListItemIcon>
                <Icon>share</Icon>
              </ListItemIcon>
              <ListItemText secondary="このアプリを共有" />
            </ListItemButton>
          </ListItem>
        </List>
      </DrawerList>
    </Drawer>
    // <select
    //   defaultValue="all"
    //   onChange={(e) => props.onSort(e.target.value as Filter)}
    // >
    //   <option value="all">すべてのタスク</option>
    //   <option value="checked">完了したタスク</option>
    //   <option value="unchecked">現在のタスク</option>
    //   <option value="removed">ごみ箱</option>
    // </select>
  );
};
