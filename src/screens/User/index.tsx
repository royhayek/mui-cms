// Packages
import { createElement } from 'react';
import { RouteComponentProps } from 'react-router-dom';

// Utilities
import * as Screens from './components';

// Interfaces
interface MatchParams {
  detail?: string;
}

type UserProps = RouteComponentProps<MatchParams>;

// Component
const User = (props: UserProps) => {
  const {
    match: {
      params: { detail = 'profile' }
    },
    history
  } = props;

  const _detail = String(detail).toLocaleLowerCase();
  const Component = (Screens as any)[_detail] ? createElement((Screens as any)[_detail], { history }) : null;

  return Component;
};

export default User;
