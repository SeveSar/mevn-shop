//для тестирования компонентов
import { render, prettyDOM, screen } from '@testing-library/vue';
import BaseCheckBox from './BaseCheckBox.vue';

// предосталвяется jest'ом
// в нём описывается  сам тест
it('renders with label and checked with prop modelValue: Array', () => {
  const label = 'Test checkbox';
  const options = {
    props: {
      label: label,
      value: 1,
      modelValue: [1, 2, 3],
    },
  };

  render(BaseCheckBox, options);
  const checkbox = screen.getByLabelText(label) as HTMLInputElement;
  expect(checkbox.checked).toBe(true);
  screen.debug();
});

it('renders checked with prop modelValue: boolean', () => {
  const options = {
    props: {
      modelValue: true,
    },
  };

  render(BaseCheckBox, options);
  const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
  expect(checkbox.checked).toBe(true);
  screen.debug();
});

it('renders unchecked with prop modelValue: boolean', () => {
  render(BaseCheckBox, {
    props: {
      modelValue: false,
    },
  });
  const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

  expect(checkbox.checked).toBe(false);
  screen.debug();
});
