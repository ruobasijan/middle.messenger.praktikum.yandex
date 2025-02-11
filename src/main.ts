import Handlebars from 'handlebars';

import * as Components from './components';
import * as Pages from './pages';

const pages = {
    'login': [ Pages.LoginPage ],
    'registration': [ Pages.RegistrationPage ],
    'nav': [ Pages.NavigationPage ]
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
