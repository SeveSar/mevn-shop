import { required, email, minLength, helpers } from '@vuelidate/validators';

export const validations = {
  email: {
    required: helpers.withMessage('Поле не должно быть пустым', required),
    email: helpers.withMessage('Введите корректный email', email),
  },
  optionalEmail: {
    email: helpers.withMessage('Введите корректный email', email),
  },
  phone: {
    required: helpers.withMessage('Поле не должно быть пустым', required),
    ruPhone: helpers.withMessage(
      'Введите корректный номер телефона',
      helpers.regex(/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/)
    ),
  },
  password: {
    required: helpers.withMessage('Поле не должно быть пустым', required),
    minLength: helpers.withMessage('Не менее 6 символов', minLength(6)),
  },
  requiredMinlength: {
    required: helpers.withMessage('Поле не должно быть пустым', required),
    minLength: helpers.withMessage('Не менее 2 символов', minLength(2)),
  },
} as const;

const getValidationRule = (key: keyof typeof validations) => {
  return validations[key];
};
export { getValidationRule };
