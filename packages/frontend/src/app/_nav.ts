import {AuthenticationService} from './authentication.service';

interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

let authenticator = new AuthenticationService();

export const navItems: NavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer'
  },
  {
    name: 'Alunos',
    url: '/alunos',
    icon: 'icon-user'
  },
  {
    name: 'Professores',
    url: '/professores',
    icon: 'icon-user'
  }/*,
  {
    name: 'Disciplinas',
    url: '/disciplinas',
    icon: 'icon-wrench'
  },
  {
    name: 'Minhas disciplinas',
    url: '/minhas-disciplinas',
    icon: 'icon-wrench'
  },
  {
    name: 'Turmas',
    url: '/turmas',
    icon: 'icon-puzzle'
  },
  {
    name: 'Avaliações',
    url: '/avaliacao',
    icon: 'icon-note'
  },
  {
    name: 'Minhas Turmas',
    url: '/minhas-turmas',
    icon: 'icon-puzzle'
  }*/
];
