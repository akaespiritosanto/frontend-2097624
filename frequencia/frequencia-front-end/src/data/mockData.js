
import logoImg from '../assets/logo.png';
import girl1Img from '../assets/girl1.jpg';
import girl2Img from '../assets/girl2.jpg';
import girl3Img from '../assets/girl3.jpg';
import girl4Img from '../assets/girl4.jpg';
import girl5Img from '../assets/girl5.jpg';
import boy1Img from '../assets/boy1.jpg';
import boy2Img from '../assets/boy2.jpg';
import boy3Img from '../assets/boy3.jpg';
import boy4Img from '../assets/boy4.jpg';
import boy5Img from '../assets/boy5.jpg';

export const summariesData = [
  {
    id: 1,
    date: '2024-10-15',
    startTime: '14:30',
    endTime: '16:00',
    description: 'Introdução ao Design Hipermédia',
    topics: [
      'Apresentação da disciplina e objetivos',
      'Introdução aos conceitos básicos de hipermédia',
      'Demonstração de exemplos práticos'
    ],
    status: 'completed',
    avatar: logoImg
  },
  {
    id: 2,
    date: '2024-10-22',
    startTime: '14:30',
    endTime: '16:00',
    description: 'Princípios de Design para Web',
    topics: [
      'Fundamentos de design visual',
      'Hierarquia visual e organização de conteúdo',
      'Tipografia e cores na web'
    ],
    status: 'completed',
    avatar: logoImg
  },
  {
    id: 3,
    date: '2024-10-29',
    startTime: '14:30',
    endTime: '16:00',
    description: 'Usabilidade e Experiência do Utilizador',
    topics: [
      'Princípios de usabilidade',
      'Métodos de avaliação de usabilidade',
      'Design centrado no utilizador'
    ],
    status: 'completed',
    avatar: logoImg
  },
  {
    id: 4,
    date: '2024-11-05',
    startTime: '14:30',
    endTime: '16:00',
    description: 'Arquitetura de Informação',
    topics: [
      'Estruturação e organização de conteúdo',
      'Sistemas de navegação',
      'Taxonomias e categorização'
    ],
    status: 'pending',
    avatar: logoImg
  },
  {
    id: 5,
    date: '2024-11-12',
    startTime: '14:30',
    endTime: '16:00',
    description: 'Design Responsivo',
    topics: [
      'Princípios de design responsivo',
      'Media queries e breakpoints',
      'Estratégias de layout flexível'
    ],
    status: 'pending',
    avatar: logoImg
  }
];

export const studentsData = [
  {
    id: 1,
    number: '2020123',
    name: 'Ana Silva',
    class: 'T1',
    avatar: girl1Img,
    present: true,
    justification: ''
  },
  {
    id: 2,
    number: '2020124',
    name: 'João Pereira',
    class: 'T1',
    avatar: boy1Img,
    present: true,
    justification: ''
  },
  {
    id: 3,
    number: '2020125',
    name: 'Maria Santos',
    class: 'T1',
    avatar: girl2Img,
    present: false,
    justification: 'Atestado médico'
  },
  {
    id: 4,
    number: '2020126',
    name: 'Pedro Costa',
    class: 'T1',
    avatar: boy2Img,
    present: true,
    justification: ''
  },
  {
    id: 5,
    number: '2020127',
    name: 'Sofia Martins',
    class: 'T1',
    avatar: girl3Img,
    present: true,
    justification: ''
  },
  {
    id: 6,
    number: '2020128',
    name: 'Tiago Oliveira',
    class: 'T1',
    avatar: boy3Img,
    present: false,
    justification: 'Participação em evento académico'
  },
  {
    id: 7,
    number: '2020129',
    name: 'Inês Rodrigues',
    class: 'T1',
    avatar: girl4Img,
    present: true,
    justification: ''
  },
  {
    id: 8,
    number: '2020130',
    name: 'Miguel Fernandes',
    class: 'T1',
    avatar: boy4Img,
    present: true,
    justification: ''
  },
  {
    id: 9,
    number: '2020131',
    name: 'Carolina Almeida',
    class: 'T1',
    avatar: girl5Img,
    present: true,
    justification: ''
  },
  {
    id: 10,
    number: '2020132',
    name: 'Diogo Sousa',
    class: 'T1',
    avatar: boy5Img,
    present: false,
    justification: ''
  }
];
