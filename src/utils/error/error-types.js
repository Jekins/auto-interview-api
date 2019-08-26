const errorTypes = new Map( [
  // common
  [ 'unknown_error', 'Произошла неизвестная ошибка' ],
  [ 'internal_server_error', 'Произошла серверная ошибка' ],
  [ 'unauthorized', 'Вы не авторизованы' ],
  [ 'access_denied', 'Нет прав доступа' ],
  [ 'endpoint_not_found', 'Метод не существует' ],
  [ 'too_long_text', 'Слишком большой текст' ],
  [ 'too_short_text', 'Слишком маленькая длина текста' ],
  [ 'invalid_value', 'Недопустимое значение' ],
  [ 'required_field', 'Пропущено обязательное поле' ],

  // payment
  [ 'payment.auth_needed', 'Обновите страницу и попробуйте еще раз' ],
  [ 'payment.invalid_income', 'Неверные параметры платежной системы' ],

  // feedback
  [ 'feedback.required_email', 'Нам нужен Ваш e-mail, чтобы ответить на это сообщение' ],
  [ 'feedback.invalid_email', 'То, что вы написали, не очень похоже на e-mail' ],
  [ 'feedback.required_message', 'Мы не читаем пустые сообщения' ],

  // auth
  [ 'auth.too_many_requests', 'Слишком много попыток авторизации' ],
  [ 'auth.wrong_credentials', 'Неверный email или пароль' ],
  [ 'auth.failed', 'Ошибка авторизации' ],

  // register
  [ 'register.invalid_email', 'А нормально можешь e-mail вписать? Это чё хоть такое?' ],
  [ 'register.required_email', 'E-mail обязателен! А как ты потом собрался заходить в свой личный кабинет?' ],
  [ 'register.invalid_password', 'Пароль должен быть не менее 6 символов. Разбирайся потом кто вас взломал.' ],
  [ 'register.required_name', 'Заполните имя. Мы же должны потом как-то к вам обращаться.' ],
  [ 'register.invalid_name', 'Имя не может быть меньше 2 и больше 32 символов, а также должно содержать все кириллические или латинские символы. Кровь дракона на ваше усмотрение.' ],
  [ 'register.user_already_exist', 'Такой e-mail уже используется' ],

  // interviews
  [ 'interviews.not_found', 'Интервью не найдено' ],

  // tasks
  [ 'tasks.not_found', 'Задание не найдено' ],

  // companies
  [ 'companies.not_found', 'Компания не найдена' ],
  [ 'companies.key.required_field', 'Укажите id компании' ],
  [ 'companies.name.required_field', 'Укажите название компании' ],
  [ 'companies.user_already_exist', 'Компания уже существует' ],
] );

export { errorTypes };