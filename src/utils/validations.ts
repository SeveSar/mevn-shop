import { email, helpers, minLength, required } from '@vuelidate/validators';

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
      helpers.regex(/^(\+7|7|8)?[\s\-]?\(?[489]\d{2}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/),
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

function getValidationRule(key: keyof typeof validations) {
  return validations[key];
}
export { getValidationRule };
