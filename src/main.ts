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
    } ],
    'profile': [ Pages.ProfilePage, {
        image: avatar,
        user: [
            { name: 'Почта', value: 'test@test.com' },
            { name: 'Логин', value: 'petya' },
            { name: 'Имя', value: 'Петя' },
            { name: 'Фамилия', value: 'Шилов' },
            { name: 'Имя в чате', value: 'petyashilov' },
            { name: 'Телефон', value: '+7 (909) 967 30 30' }
        ]
    } ],
    '404': [ Pages.ErrorPage404 ],
    '500': [ Pages.ErrorPage500 ],
    'nav': [ Pages.NavigationPage ],
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
