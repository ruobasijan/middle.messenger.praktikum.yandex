import Handlebars from 'handlebars';

import * as Components from './components';
import * as Pages from './pages';

import avatar from './assets/avatar.jpg';

const pages = {
    'login': [ Pages.LoginPage, {
        fields: [
            { label: 'Логин', name: 'login', type: 'text' },
            { label: 'Пароль', name: 'password', type: 'password' },
        ],
        button: { label: 'Войти', variant: 'primary', type: 'submit' },
        link: { text: 'Нет аккаунта?', page: 'registration', variant: 'primary' },
    } ],
    'registration': [ Pages.RegistrationPage, {
        fields: [
            { label: 'Почта', name: 'email', type: 'email' },
            { label: 'Логин', name: 'login', type: 'text' },
            { label: 'Имя', name: 'first_name', type: 'text' },
            { label: 'Фамилия', name: 'second_name', type: 'text' },
            { label: 'Телефон', name: 'phone', type: 'phone' },
            { label: 'Пароль', name: 'password', type: 'password' },
        ],
        button: { label: 'Зарегистрироваться', variant: 'primary', type: 'submit' },
        link: { text: 'Войти', page: 'login', variant: 'primary' },
    } ],
    'profile': [ Pages.ProfilePage, {
        user: {
            image: avatar,
            display_name: 'Петя',
            info: [
                { name: 'Почта', value: 'test@test.com' },
                { name: 'Логин', value: 'petya' },
                { name: 'Имя', value: 'Петя' },
                { name: 'Фамилия', value: 'Шилов' },
                { name: 'Имя в чате', value: 'petyashilov' },
                { name: 'Телефон', value: '+7 (909) 967 30 30' },
            ],
            links: [
                { text: 'Изменить данные', page: 'nav', variant: 'primary' },
                { text: 'Изменить пароль', page: 'nav', variant: 'primary' },
                { text: 'Выйти', page: 'nav', variant: 'danger' },
            ],
        },
        settings: {
            user: {
                title: 'Измените данные',
                button: { label: 'Изменить', variant: 'primary', type: 'submit' },
                showModal: false,
                fields: [
                    { label: 'Имя', name: 'first_name', type: 'text' },
                    { label: 'Фамилия', name: 'second_name', type: 'text' },
                    { label: 'Никнейм', name: 'display_name', type: 'text' },
                    { label: 'Логин', name: 'login', type: 'text' },
                    { label: 'Почта', name: 'email', type: 'email' },
                    { label: 'Телефон', name: 'phone', type: 'phone' },
                ]
            },
            avatar: {
                title: 'Загрузите файл',
                button: { label: 'Загрузить', variant: 'primary', type: 'submit' },
                showModal: false,
                fields: [
                    { label: 'Поменять Аватар', name: 'avatar', type: 'file' },
                ]
            },
            password: {
                title: 'Измените пароль',
                button: { label: 'Изменить', variant: 'primary', type: 'submit' },
                showModal: false,
                fields: [
                    { label: 'Старый пароль', name: 'oldPassword', type: 'password' },
                    { label: 'Новый пароль', name: 'newPassword', type: 'password' },
                ]
            }
        },
    } ],
    '404': [ Pages.ErrorPage404 ],
    '500': [ Pages.ErrorPage500 ],
    'nav': [ Pages.NavigationPage, {
        links: [
            { text: 'Страница Авторизации', page: 'login', variant: 'primary' },
            { text: 'Страница Регистрации', page: 'registration', variant: 'primary' },
            { text: 'Страница 500', page: '500', variant: 'primary' },
            { text: 'Страница 404', page: '404', variant: 'primary' },
            { text: 'Страница Профиля', page: 'profile', variant: 'primary' },
            { text: 'Страница Чата', page: '500', variant: 'primary' },
        ]
    } ],
};

Object.entries(Components).forEach(([ name, template ]) => {
    Handlebars.registerPartial(name, template);
});

type TKeyPage = keyof typeof pages;

function navigate(page: TKeyPage) {
    const [ source, context ] = pages[page];
    const container = document.getElementById('app')!;

    const templatingFunction = Handlebars.compile(source);
    container.innerHTML = templatingFunction(context);
}

document.addEventListener('DOMContentLoaded', () => navigate('nav'));

document.addEventListener('click', (event: MouseEvent) => {
    const { target } = event;

    if (target instanceof HTMLElement) {
        const page = target.getAttribute('page');
        if (page && page in pages) {
            navigate(page as TKeyPage);

            event.preventDefault();
            event.stopImmediatePropagation();
        }
    }
});
