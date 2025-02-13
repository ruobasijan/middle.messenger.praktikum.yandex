import Handlebars from 'handlebars';

import * as Components from './components';
import * as Pages from './pages';

import avatar from './assets/avatar.jpg';

const pages = {
    'login': [ Pages.LoginPage, {
        inputs: [
            { label: 'Логин', name: 'login' },
            { label: 'Пароль', name: 'password' },
        ],
        button: { label: 'Войти', type: 'primary' },
        link: { text: 'Нет аккаунта?', page: 'registration', type: 'primary' },
    } ],
    'registration': [ Pages.RegistrationPage, {
        inputs: [
            { label: 'Почта', name: 'email' },
            { label: 'Логин', name: 'login' },
            { label: 'Имя', name: 'first_name' },
            { label: 'Фамилия', name: 'second_name' },
            { label: 'Телефон', name: 'phone' },
            { label: 'Пароль', name: 'password' },
        ],
        button: { label: 'Зарегистрироваться', type: 'primary' },
        link: { text: 'Войти', page: 'login', type: 'primary' },
    } ],
    'profile': [ Pages.ProfilePage, {
        image: avatar,
        first_name: 'Петя',
        user_info: [
            { name: 'Почта', value: 'test@test.com' },
            { name: 'Логин', value: 'petya' },
            { name: 'Имя', value: 'Петя' },
            { name: 'Фамилия', value: 'Шилов' },
            { name: 'Имя в чате', value: 'petyashilov' },
            { name: 'Телефон', value: '+7 (909) 967 30 30' }
        ],
        user_settings: [
            { text: 'Изменить данные', page: 'nav', type: 'primary' },
            { text: 'Изменить пароль', page: 'nav', type: 'primary' },
            { text: 'Выйти', page: 'nav', type: 'danger' },
        ],
        showModal: false,
    } ],
    '404': [ Pages.ErrorPage404 ],
    '500': [ Pages.ErrorPage500 ],
    'nav': [ Pages.NavigationPage, {
        links: [
            { text: 'Страница Авторизации', page: 'login', type: 'primary' },
            { text: 'Страница Регистрации', page: 'registration', type: 'primary' },
            { text: 'Страница 500', page: '500', type: 'primary' },
            { text: 'Страница 404', page: '404', type: 'primary' },
            { text: 'Страница Профиля', page: 'profile', type: 'primary' },
            { text: 'Страница Чата', page: '500', type: 'primary' },
        ]
    } ],
};

Object.entries(Components).forEach(([ name, template ]) => {
    Handlebars.registerPartial(name, template);
});

function navigate(page: string) {
    //@ts-ignore
    const [ source, context ] = pages[page];
    const container = document.getElementById('app')!;

    const templatingFunction = Handlebars.compile(source);
    container.innerHTML = templatingFunction(context);
}

document.addEventListener('DOMContentLoaded', () => navigate('nav'));

document.addEventListener('click', e => {
    //@ts-ignore
    const page = e.target.getAttribute('page');
    if (page) {
        navigate(page);

        e.preventDefault();
        e.stopImmediatePropagation();
    }
});
