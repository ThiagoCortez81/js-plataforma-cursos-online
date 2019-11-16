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
    name: 'Usuários',
    url: '/usuario',
    icon: 'icon-wrench',
    class: ((localStorage.getItem('aluno') != "null") ? 'd-none' : '')
  },
  {
    name: 'Alunos',
    url: '/alunos',
    icon: 'icon-user',
    class: ((localStorage.getItem('aluno') != "null") ? 'd-none' : '')
  },
  {
    name: 'Professores',
    url: '/professores',
    icon: 'icon-user',
    class: ((localStorage.getItem('aluno') != "null") ? 'd-none' : '')
  },
  {
    name: 'Cursos',
    url: '/cursos',
    icon: 'icon-puzzle',
    class: ((localStorage.getItem('aluno') != "null") ? 'd-none' : '')
  },
  {
    name: 'Minhas Matrículas',
    url: '/matriculas',
    icon: 'icon-question',
    class: ((localStorage.getItem('aluno') != "null") ? '' : 'd-none')
  },
  {
    name: 'Relatório de Aluno Por Curso',
    url: '/relatorio-aluno-curso',
    icon: 'icon-puzzle',
    class: ((localStorage.getItem('aluno') != "null") ? 'd-none' : '')
  },
  {
    name: 'Relatório de Curso por Professor',
    url: '/relatorio-curso-professor',
    icon: 'icon-puzzle',
    class: ((localStorage.getItem('aluno') != "null") ? 'd-none' : '')
  },
  {
    name: 'Relatório de Alunos Concluíntes Por Curso',
    url: '/relatorio-alunos-concluintes-curso',
    icon: 'icon-puzzle',
    class: ((localStorage.getItem('aluno') != "null") ? 'd-none' : '')
  },
  {
    name: 'Relatório de Vendas Mensais',
    url: '/relatorio-vendas-mensais',
    icon: 'icon-puzzle',
    class: ((localStorage.getItem('aluno') != "null") ? 'd-none' : '')
  }
  /*
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
