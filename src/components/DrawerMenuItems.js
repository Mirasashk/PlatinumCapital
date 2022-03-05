import * as React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DraftsIcon from '@mui/icons-material/Drafts';
import { Link as RouterLink } from 'react-router-dom';
import { Dashboard } from '@mui/icons-material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import UploadIcon from '@mui/icons-material/Upload';

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef(function Link(itemProps, ref) {
        return (
          <RouterLink
            to={to}
            ref={ref}
            {...itemProps}
            role={undefined}
          />
        );
      }),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default function ListRouter() {
  return (
    <>
      <List aria-label='main mailbox folders'>
        <ListItemLink
          to='/'
          primary='Dashboard'
          icon={<Dashboard />}
        />
        <ListItemLink
          to='/users'
          primary='Users'
          icon={<DraftsIcon />}
        />
        <ListItemLink
          to='/upload'
          primary='Upload'
          icon={<UploadIcon />}
        />
        <ListItemLink
          to='/leads'
          primary='Leads'
          icon={<AssignmentIcon />}
        />
      </List>
      <Divider />
    </>
  );
}
