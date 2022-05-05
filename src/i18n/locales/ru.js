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
        usernameIsRequired: 'Имя пользователя обязательно',
      },
    },
    singUpForm: {
      title: 'Регистрация',
      buttonText: 'Зарегистрироваться',
      passwordPlaceholder: 'Пароль',
      usernamePlaceholder: 'Имя пользователя',
      passwordConfirmationPlaceholder: 'Подтвердите пароль',
      errors: {
        passwordsNotEqual: 'Пароли должны совпадать',
        passwordIsRequired: 'Пароль обязателен',
        usernameIsRequired: 'Имя пользователя обязательно',
        passwordMinCount: 'Пароль должени содержать Не менее 6 символов',
        usernameMinCount: 'Имя должно содержать От 3 до 20 символов',
        usernameMaxCount: 'Имя должно содержать От 3 до 20 символов',
      },
    },
    notFound: {
      title: 'Страница не найдена',
      message: 'Но вы можете перейти ',
      linkText: 'на главную страницу',
    },
    header: {
      buttonText: 'Выйти',
      logoText: 'Hexlet Chat',
    },
    navPanel: {
      title: 'Каналы',
      dropdownMenu: {
        delete: 'Удалить',
        rename: 'Переименовать',
      },
    },
    chats: {
      messages_one: '{{count}} сообщение',
      messages_few: '{{count}} сообщения',
      messages_many: '{{count}} сообщений',
      sendMessageForm: {
        sendMessagePlaceholder: 'Введите сообщение...',
        errors: {
          netError: 'Ошибка соединения',
          required: 'Сообщение не должно быть пустым',
        },
      },
    },
    modal: {
      addModal: {
        title: 'Добавить канал',
        submitButton: 'Отпарвить',
        rejectButton: 'Отменить',
        errors: {
          alredyExist: 'Такое имя уже существует',
          required: 'Это поле обязательное',
        },
      },
      editModal: {
        title: 'Переименовать канал',
        submitButton: 'Отпарвить',
        rejectButton: 'Отменить',
        errors: {
          alredyExist: 'Такое имя уже существует',
          required: 'Это поле обязательное',
        },
      },
      deleteModal: {
        title: 'Удалить канал',
        submitButton: 'Удалить',
        rejectButton: 'Отменить',
        text: 'Уверены?',
      },
    },
    toasts: {
      addMessage: 'Канал создан',
      deleteMessage: 'Канал успешно удален',
      editMessage: 'Канал успешно изменён',
      errorMessage: 'Ошибка соединения',
    },

  },
};
