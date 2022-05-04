export default {
    translation: {
        logInForm: {
            title: 'Войти',
            buttonText: 'Войти',
            passwordPlaceholder: 'Пароль',
            usernamePlaceholder: 'Ваш ник',
            registrationLinkText: 'Нет аккаунта?',
            errors: {
                authorization: 'Неверные имя пользователя или пароль',
                passwordIsRequired: 'Пароль обязателен',
                usernameIsRequired: 'Имя пользователя обязательно'
            }
        },
        singUpForm: {
            title: 'Регистрация',
            buttonText: 'Зарегистрироваться',
            passwordPlaceholder: 'Пароль',
            usernamePlaceholder: 'Имя пользователя',
            passwordConfirmationPlaceholder: 'Подтвердите пароль',
            errors: {
                passwordsNotEqual: 'Пароли не совпадают',
                passwordIsRequired: 'Пароль обязателен',
                usernameIsRequired: 'Имя пользователя обязательно',
                passwordMinCount: 'Пароль должени содержать как минимум 6 символов',
                usernameMinCount: 'Имя должно содержать минимум три символа',
                usernameMaxCount: 'Имя должно содержать максимум 20 символов',
            }
        },
        notFound: {
            title: 'Страница не найдена',
            message: 'Но вы можете перейти ',
            linkText: 'на главную страницу'
        },
        header: {
            buttonText: 'Выйти',
            logoText: 'Hexlet Chat'
        },
        navPanel: {
            title: 'Каналы',
            dropdownMenu: {
                delete: 'Удалить',
                rename: 'Переименовать',
            }
        },
        chats: {
            messages_one: '{{count}} сообщение',
            messages_few: '{{count}} сообщения',
            messages_many: '{{count}} сообщений',
            sendMessageForm: {
                sendMessagePlaceholder: 'Введите сообщение...',
                errors: {
                    netError : 'Упс! Что-то пошло не так...',
                    required: 'Сообщение не должно быть пустым',
                }
            }
        },
        modal: {
            addModal: {
                title: 'Добавить канал',
                submitButton: 'Отпарвить',
                rejectButton: 'Отменить',
                errors: {
                    alredyExist: 'Такое имя уже существует',
                    required: 'Это поле обязательное',
                }
            },
            editModal: {
                title: 'Переименовать канал',
                submitButton: 'Отпарвить',
                rejectButton: 'Отменить',
                errors: {
                    alredyExist: 'Такое имя уже существует',
                    required: 'Это поле обязательное',
                }
            },
            deleteModal: {
                title: 'Удалить канал',
                submitButton: 'Удалить',
                rejectButton: 'Отменить',
                text: 'Уверены?'
            },
        }

    }
}