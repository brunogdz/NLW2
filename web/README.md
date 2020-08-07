<p align="center">
  <img src="../readme/Home.png"/>
</p>

# 📑 Índice

### [Front-end](#front-end)

- [Instalação e Configuração das Bibliotecas Front-End](#-instalação-e-configuração-das-bibliotecas-front-end)
- [Limpar estrutura do Template](#limpar-estrutura-do-template)
- [Estilos Globais](#estilos-globais)
- [Components](#components)
  - [Component: Page Header](#component-page-header)
  - [Component: Teacher Item](#component-teacher-item)
  - [Component: Input](#component-input)
  - [Component: Select](#component-select)
  - [Component: Textarea](#component-textarea)
- [Páginas](#páginas)
  - [Página: Landing Page](#página-landing-page)
  - [Página: Teacher List](#página-teacher-list)
  - [Página: Teacher Form](#página-teacher-form)
- [React Router DOM](#react-router-dom)
- [Component: App](#component-app)

# Front-end

Vamos criar uma pasta 'web' que vai conter nossa aplicação.

## 📚 Instalação e Configuração das Bibliotecas Front-End

**Instalar o Template de aplicação de react em Typescript**: `yarn create react-app web --template typescript`

**Instalar o React-Router-DOM**:`yarn add react-router-dom`

**Instalar os tipos do React-Router-DOM**:`yarn add @types/yarn add react-router-dom -D`

- Depois de instalar o template, todos os arquivos vamos colcoar dentro da pasta 'src'.

- Então, vamos criar uma pasta 'assets' e uma subpasta 'images'. Nela deixaremos as imagens da nossa página.

## Limpar estrutura do Template

Vamos fazer algumas alterações em arquivos do template que não vamos utilizar, ou que vamos recriar depois.

- Excluir Todos os arquivos .css
- Na pasta 'public' deixar apenas o index.html
- Excluir o Readme.md
- Excluir o App.test.tsx
- Excluir o logo.svg
- Excluir o serviceWorker.ts
- Excluir o setupTests.ts
- Abrir os arquivos 'index.tsx', App.tsx' e 'index.html' e remover as linhas que chamavam os arquivos que excluímos

## Estilos Globais

A construção do layout da nossa aplicação seguirá o conceito de Mobile First, ou seja, primeiro estilizaremos o layout para dispositivos mobile e depois trabalharemos nas media-querys para ajusta-los as outras telas maiores.

Dentro da pasta 'assets' vamos criar uma subpasta 'styles' e dentro dela um arquivo 'global.css'. Nesse arquivo teremos estilizações globais que servirão para todo o projeto.
Vamos usar unidades de medidas do css que são adaptáveis a diferentes telas, para termos um layout responsivo (ex: rem, vh e vw). Para acessar o estilo completo, clicar [aqui]().
Abaixo, vamos comentar alguns pontos importantes:

Com o border-box, o width e height incluem o tamanho padding size e a propriedade border, mas não incluem a propriedade margin:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

Nas nossas divs html, body e root vamos setar a altura de 100vh para que a página ocupe a altura total da tela:

```css
html,
body,
#root {
  height: 100vh;
}
```

Na div #root, vamos usar o flex-box com o `display: flex`. Ele transforma em flex container e todos os seus filhos diretos em flex itens.
Com o `align-items: center`, todo o conteúdo fica alinhado horizontalmente e com o `justify-content: center` todo conteúdo fica justificado ao centro da tela:

```css
#root {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

Vamos setar as fontes para que aumente em 60% o tamanho da fonte principal, para isso vamos colocar 1.6rem:

```css
body,
input,
button,
textarea {
  font: 500 1.6rem Poppins;
}
```

Nosso container vai ocupar 90% da tela com máximo de até 700px:

```css
.container {
  width: 90vw;
  max-width: 700px;
}
```

## Components

Vamos criar 2 components que vão se repetir em várias páginas da aplicação: PageHeader e TeacherItem.

### Component: Page Header

Tirando a Home, as duas outros páginas da aplicação temos um header que contém título e logo. Podemos então criar esse header em forma de component para reutilizarmos nessas páginas. Vamos criar uma pasta 'components' e uma subpasta 'PageHeader' com um arquivo 'index.tsx'. Essa página também terá um 'styles.css' próprio que pode ser encontrado [aqui]().

```tsx
import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';
import './styles.css';
```

Nosso Header terá a propriedade 'title' que mudará de acordo com a página que ele for renderizado. Para trabalhar com isso, precisamos setar as tipagens dessa propriedade por meio de uma interface.

```tsx
// tipagem da propriedade do Header
interface PageHeaderProps {
  title: string;
  description?: string; // não obrigatória
}
```

Para informar que o componente terá essa interface usamos o React Functional Component (React.FC) passando a inferface como parâmetro. Agora no lugar do título escrevemos a variável `props.title` que trará o título que conterá lá na página acessada. A propriedade `props.children` é uma padrão do React e rederiza tudo que tiver sido escrito dentro do componente, onde ele for aplicado.

Além disso, vamo incluir outra propriedade que não é obrigatória conter em todos os Headers, a description. Com o AND (&&) do js, a segunda parte só vai ser executada se a primeira for verdadeira. Assim, geramos um if existir props.description, exiba o props.description.

```tsx
const PageHeader: React.FC<PageHeaderProps> = (props) => {
  return (
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/">
          <img src={backIcon} alt="Back" />
        </Link>
        <img src={logoImg} alt="Proffy" />
      </div>

      <div className="header-content">
        <strong>{props.title}</strong>

        {props.description && <p> {props.description}</p>}

        {props.children}
      </div>
    </header>
  );
};

export default PageHeader;
```

### Component: Teacher Item

Na página de listagem, temos alguns "cards" com as informações de cada professor. Também criaremos um component para esse card, tendo em vista que é um objeto que vai se repetir. Dentro de 'components', criar uma subpasta 'TeacherItem' e um arquivo 'index.tsx'. Essa página também terá um 'styles.css' próprio que pode ser encontrado [aqui]().

```tsx
import React from 'react';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import './styles.css';
import api from '../../services/api';

export interface Teacher {
  avatar: string;
  bio: string;
  cost: number;
  id: number;
  name: string;
  subject: string;
  whatsapp: string;
}

interface TeacherItemProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  function createNewConnection() {
    api.post('connections', {
      user_id: teacher.id,
    });
  }

  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt="Avatar" />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>{teacher.bio}</p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ {teacher.cost}</strong>
        </p>
        <a
          rel="noopener noreferrer"
          target="_blank"
          onClick={createNewConnection}
          href={`https://wa.me/${teacher.whatsapp}`}
        >
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
```

### Component: Input

Tanto na página de listagem quanto na página de formulário, temos inputs de texto, ou seja, vamos criar um component para ele. Dentro de 'components', criar uma subpasta 'Input' e um arquivo 'index.tsx'. Essa página também terá um 'styles.css' próprio que pode ser encontrado [aqui]().

```tsx
import React, { InputHTMLAttributes } from 'react';
import './styles.css';
```

Vamos extender a interface criada para o Input com uma interface já pronta do React, a 'InputHTMLAttributes' que permite que meu input tenha todas as propriedades padrão possíveis do HTML.

```tsx
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}
```

Agora, por meio do 'spread operator' do js, armazeno na variável 'rest' todas as propriedades HTML para input e depois coloco lá no meu input.

```tsx
const Input: React.FC<InputProps> = ({ label, name, ...rest }) => {
  return (
    <div className="input-block">
      <label htmlFor={name}>{label}</label>
      <input type="text" id={name} {...rest} />
    </div>
  );
};

export default Input;
```

### Component: Select

Tanto na página de listagem quanto na página de formulário, temos um input select. Dentro de 'components', criar uma subpasta 'Select' e um arquivo 'index.tsx'. Essa página também terá um 'styles.css' próprio que pode ser encontrado [aqui]().

```tsx
import React, { SelectHTMLAttributes } from 'react';

import './styles.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}

const Select: React.FC<SelectProps> = ({ label, name, options, ...rest }) => {
  return (
    <div className="select-block">
      <label htmlFor={name}>{label}</label>
      <select value="" id={name} {...rest}>
        <option value="" disabled hidden>
          Selecione uma opção
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
```

### Component: Textarea

Tanto na página de formulário, temos um input Text Area. Dentro de 'components', criar uma subpasta 'Textarea' e um arquivo 'index.tsx'. Essa página também terá um 'styles.css' próprio que pode ser encontrado [aqui]().

```tsx
import React, { TextareaHTMLAttributes } from 'react';

import './styles.css';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, name, ...rest }) => {
  return (
    <div className="textarea-block">
      <label htmlFor={name}>{label}</label>
      <textarea id={name} {...rest} />
    </div>
  );
};

export default Textarea;
```

## Páginas

Nossa aplicação tem 3 páginas: Home, Listagem de Professores e Formulário. Todas as páginas serão feitas em formato de component, e navegaremos entre elas pelas rotas.

### Página: Landing Page

Na pasta 'scr' criar uma pasta 'pages' e uma subpasta 'Landing' com um arquivo 'index.tsx', para criar nossa primeira página como componente "Landing" que conterá o conteúdo principal da nossa Homepage. O componente do React é uma função (com letra maiúscula) que retorna um html. Vamos começar importando o React e depois o component 'Link' padrão do React. O Link vai fazer nosso component carregar na página quando ele for chamado pela rota.

```tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';

import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import './styles.css';
```

Sempre que o front-end precisar manter uma informação, vamos usar o 'useState()'. Aqui vamos iniciar ele com valor zero.

```tsx
function Landing() {
  const [totalConnections, setTotalConnections] = useState(0)
```

O useEffect() retorna dois parâmtros, o primeiro vamos iniciar a função getConnections e o segundo indico em que momento essa função será executada. Nessa caso, queremos que a informação do total de conexões já apareça assim que carregar a página, então deixamos um array vazio.

```tsx
useEffect(() => {
  async function getConnections() {
    const { data } = await api.get('/connections')
    setTotalConnections(data.total)
  }

  getConnections()
}, [])

return (
  <div id="page-landing">
    <div id="page-landing-content" className="container">
      <div className="logo-container">
        <img src={logoImg} alt="Proffy" />
        <h2>Sua plataforma de estudos online.</h2>
      </div>

      <img
        src={landingImg}
        alt="Plataforma de estudos"
        className="hero-image"
      />

      <div className="buttons-container">
        <Link to="/study" className="study">
          <img src={studyIcon} alt="Estudar" />
          Estudar
        </Link>

        <Link to="/give-classes" className="give-classes">
          <img src={giveClassesIcon} alt="Dar aulas" />
          Dar aulas
        </Link>
      </div>

      <span className="total-connections">
        Total de {totalConnections} conexões já realizadas{' '}
        <img src={purpleHeartIcon} alt="Coração Roxo" />
      </span>
    </div>
  </div>
)
}

export default Landing
```

Agora vamos criar um estilo específico dessa página em um arquivo 'styles.css' dentro do mesmo diretório do 'index.ts'. Para acessar o estilo completo, clicar [aqui]().
Abaixo, vamos comentar alguns pontos importantes desse estilo:

Ao colocar a imagem principal em 100%, fazemos com que ela não sobressaia o tamanho total da tela:

```css
.hero-image {
  width: 100%;
}
```

Temos um container para os botões que também setaremos como flex:

```css
.buttons-container {
  display: flex;
  justify-content: center;
  margin: 3.2rem 0;
}
```

Da mesma forma, faremos com os botões que também serão um container para os ícones e os textos.

```css
.buttons-container a {
  width: 30rem;
  height: 10.4rem;
  border-radius: 0.8rem;
  margin-right: 1.6rem;
  font: 700 2rem Archivo;

  display: flex;
  align-items: center;
  justify-content: center;

  text-decoration: none;
  color: var(--color-button-text);

  transition: background-color 0.2s;
}
```

Vamos agora fazer um break-point de 1100px que é onde mais ou menos a tela vai se converter em tamanho de desktop. Agora vamos usar o estilo display: grid, onde podemos simplesmente indicar aonde cada elemento se posicionará, seguindo a estrutura de linhas e colunas.

- Com o `grid-template-rows`, setamos 2 linhas: A primeira linha vai ocupar a altura de 350px e a segunda vai ocupar o espaço que sobrar
- Com o `grid-template-columns`, setamos 3 colunas, onde a primeira ocupa 2 espaços e as outras duas ocupam 1 espaço cada.
- Com o `grid-template-areas`, eu crio 'variáveis' que vão indicar cada elemento

```css
@media (min-width: 1100px) {

  #page-landing-content {
    max-width: 1100px;
    display: grid;
    grid-template-rows: 350px 1fr;
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-areas:
    "logo hero hero"
    "buttons buttons total"
    ;
  }
```

Agora para cada estilo de elemento, eu informo a qual variável ele corresponde, com o estilo `grid-area`. Ou seja, vou definir os estilos do logo, hero, buttons e total.

```css
    .logo-container {
        grid-area: logo;
        align-self: center;
        text-align: left;
        margin: 0;
    }

    .hero-image {
        grid-area: hero;
        justify-self: end;
    }

    .buttons-container {
        grid-area: buttons;
        justify-content: flex-start;
    }

    .total-connections {
        grid-area: total;
        justify-self: end;
    }
  }

```

### Página: Teacher List

Vamos criar agora a página de listagem de professores. Dentro da pasta 'pages', criar uma subpasta 'TeacherList' e um arquivo 'index.tsx'. Fazemos a importação do React e também dos nossos componentes que criamos o PageHeader e o TeacherItem. No PageHeader vamos escrever nosso título como propriedade e dentro dele criaremos o formulário de filtro que será específico dessa página. Dentro do <main> colocamos o component TeacherItem como lista. Essa página também terá um 'styles.css' próprio que pode ser encontrado [aqui]().

```jsx
import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';

export default function TeacherForm() {
  const history = useHistory();
```

O useState() retorna traz dois retornos: o valor inicial do item e uma função que vai substituir esse valor inicial.

```jsx
const [name, setName] = useState('');
const [avatar, setAvatar] = useState('');
const [whatsapp, setWhatsapp] = useState('');
const [bio, setBio] = useState('');

const [subject, setSubject] = useState('');
const [cost, setCost] = useState('');

const [scheduleItems, setScheduleItems] = useState([
  { week_day: 0, from: '', to: '' },
]);
```

Quando clicar no botão '+ Novo horário' vai executar a função 'setScheduleItems' e vai retornar um array com todos os Itemms que já existem e adicionar o novo item.

```jsx
function addNewScheduleItem() {
  setScheduleItems([...scheduleItems, { week_day: 0, from: '', to: '' }]);
}
```

Vamos criar uma função que vai ser exeecutada assim que o formulário for enviado. Ela vai disparar os eventos que vão enviar nossos dados do formulário para o back=end.
O `e.preventDefault()` previne o comportamento padrão do formulário de redirecionar a página depois do envio do formulário. O `history.push('/')` redireciona para a homepage.

```jsx
async function handleCreateClass(e: FormEvent) {
  e.preventDefault();

  await api.post('classes', {
    name,
    avatar,
    whatsapp,
    bio,
    subject,
    cost: Number(cost),
    schedule: scheduleItems,
  });

  alert('Cadastro realizado com sucesso');
  history.push('/');
}
```

Essa função 'setScheduleItemValue' serve para passar pelo array de scheduleItems e identificar a posição, qual campo ele se refere e o valor. Para respeitar o conceito de imutabilidade, vamos criar um novo array 'updatedScheduleItems' com as alterações que faremos.

```jsx
function setScheduleItemValue(position: number, field: string, value: string) {
  const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
    if (index === position) {
      return { ...scheduleItem, [field]: value };
    }
    return { ...scheduleItem };
  });

  setScheduleItems(updatedScheduleItems);
}

return (
  <div id="page-teacher-form" className="container">
    <PageHeader
      title="Que incrível que você quer dar aulas"
      description="O primeiro passo é preencher esse formulário de inscrição"
    />

    <main>
      <form onSubmit={handleCreateClass}>
        <fieldset>
          <legend>Seus dados</legend>
          <Input name="name" label="Nome completo" value={name} onChange={(e) => setName(e.target.value)} />
          <Input name="avatar" label="Avatar" value={avatar} onChange={(e) => setAvatar(e.target.value)} />
          <Input name="whatsapp" label="WhatsApp" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
          <Textarea name="bio" label="Biografia"  value={bio} onChange={(e) => setBio(e.target.value)} />
        </fieldset>

        <fieldset>
          <legend>Sobre a aula</legend>

          <Select name="subject" label="Matéria" value={subject} onChange={(e) => setSubject(e.target.value)} options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'História', label: 'História' },
              { value: 'Português', label: 'Português' },
              { value: 'Inglês', label: 'Inglês' },
              { value: 'Geografia', label: 'Geografia' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Física', label: 'Física' },
              { value: 'Química', label: 'Química' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Filosofia', label: 'Filosofia' },
            ]}
          />
          <Input name="cost" label="Custo da sua hora por aula" value={cost} onChange={(e) => setCost(e.target.value)}
          />
        </fieldset>

        <fieldset>
          <legend>
            Horários disponíveis
            <button type="button" onClick={addNewScheduleItem}> + Novo horário </button>
          </legend>

          {scheduleItems.map((scheduleItem, index) => (
            <div key={scheduleItem.week_day} className="schedule-item">
              <Select name="week_day" label="Dia da semana" value={scheduleItem.week_day} onChange={(e) =>  setScheduleItemValue(index, 'week_day', e.target.value) }
                options={[
                  { value: '0', label: 'Domingo' },
                  { value: '1', label: 'Segunda-feira' },
                  { value: '2', label: 'Terça-feira' },
                  { value: '3', label: 'Quarta-feira' },
                  { value: '4', label: 'Quinta-feira' },
                  { value: '5', label: 'Sexta-feira' },
                  { value: '6', label: 'Sábado' },
                ]}
              />
              <Input name="from" label="Das" type="time" value={scheduleItem.from} onChange={(e) => setScheduleItemValue(index, 'from', e.target.value) } />
              <Input name="to"  label="Até" type="time" value={scheduleItem.to} onChange={(e) => setScheduleItemValue(index, 'to', e.target.value) } />
            </div>
          ))}
        </fieldset>

        <footer>
          <p>
            <img src={warningIcon} alt="Aviso importante" />
            Importante! <br />Preencha todos os dados
          </p>
          <button type="submit">Salvar cadastro</button>
        </footer>

      </form>
    </main>
  </div>
);
}
```

### Página: Teacher Form

```tsx
import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';

export default function TeacherForm() {
  const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');
  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' },
  ]);

  function addNewScheduleItem() {
    setScheduleItems([...scheduleItems, { week_day: 0, from: '', to: '' }]);
  }

  async function handleCreateClass(e: FormEvent) {
    e.preventDefault();

    await api.post('classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems,
    });

    alert('Cadastro realizado com sucesso');
    history.push('/');
  }

  function setScheduleItemValue(pos: number, field: string, value: string) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === pos) {
        return { ...scheduleItem, [field]: value };
      }
      return { ...scheduleItem };
    });

    setScheduleItems(updatedScheduleItems);
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas"
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              name="name"
              label="Nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
            <Input
              name="whatsapp"
              label="WhatsApp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              name="subject"
              label="Matéria"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'História', label: 'História' },
                { value: 'Português', label: 'Português' },
                { value: 'Inglês', label: 'Inglês' },
                { value: 'Geografia', label: 'Geografia' },
                { value: 'Matemática', label: 'Matemática' },
                { value: 'Física', label: 'Física' },
                { value: 'Química', label: 'Química' },
                { value: 'Biologia', label: 'Biologia' },
                { value: 'Filosofia', label: 'Filosofia' },
              ]}
            />
            <Input
              name="cost"
              label="Custo da sua hora por aula"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => (
              <div key={scheduleItem.week_day} className="schedule-item">
                <Select
                  name="week_day"
                  label="Dia da semana"
                  value={scheduleItem.week_day}
                  onChange={(e) =>
                    setScheduleItemValue(index, 'week_day', e.target.value)
                  }
                  options={[
                    { value: '0', label: 'Domingo' },
                    { value: '1', label: 'Segunda-feira' },
                    { value: '2', label: 'Terça-feira' },
                    { value: '3', label: 'Quarta-feira' },
                    { value: '4', label: 'Quinta-feira' },
                    { value: '5', label: 'Sexta-feira' },
                    { value: '6', label: 'Sábado' },
                  ]}
                />
                <Input
                  name="from"
                  label="Das"
                  type="time"
                  value={scheduleItem.from}
                  onChange={(e) =>
                    setScheduleItemValue(index, 'from', e.target.value)
                  }
                />
                <Input
                  name="to"
                  label="Até"
                  type="time"
                  value={scheduleItem.to}
                  onChange={(e) =>
                    setScheduleItemValue(index, 'to', e.target.value)
                  }
                />
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}
```

## React Router DOM

Precisamos criar um sistema de navegação entre as páginas. No HTML utilizamos os endereços das páginas, mas no React precisamos utilizar o sistema de Rotas. Para isso vamos usar o React-Router-DOM que vai criar o sistema que navega entre os componentes como se fossem páginas baseados nas rotas que o usuário está acessando.

Vamos criar um arquivo 'routes.tsx' que conterá as rotas da nossa aplicação:

```tsx
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import TeacherForm from './pages/TeacherForm';
import TeacherList from './pages/TeacherList';

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route path="/study" component={TeacherList} />
      <Route path="/give-classes" component={TeacherForm} />
    </BrowserRouter>
  );
}

export default Routes;
```

## Component: App

Teremos um componente principal que colocaremos no nosso 'index.tsx' que conterá todos os outros componentes da aplicação. Nas primeiras linhas vamos fazer a importação do React, do arquivo de rotas e do nosso estilo global. Vamos criar um arquivo 'App.tsx' com o componente App como uma função que retorna as nossas rotas.

```tsx
import React from 'react';
import Routes from './routes';
import './assets/styles/global.css';

function App() {
  return <Routes />;
}

export default App;
```

## Axios

O Axios vai facilitar para o front consumir APIs externas, fazendo requisições para o backend. Criar uma pasta 'services' e um arquivo 'api.js'.
Vamos criar a const api com o axios e colocar o endereço do servidor "http://localhost:3333".

```js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;
```

## 📕 Licença

Todos os arquivos incluídos aqui, incluindo este _ README _, estão sob [Licença MIT](./LICENSE).
Criado por [Adriana Lima](https://github.com/dxwebster)
