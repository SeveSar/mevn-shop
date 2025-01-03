import { fireEvent, render } from '@testing-library/vue';
import BaseInput from './BaseInput.vue';

import '@testing-library/jest-dom';

it('properly handles v-model', async () => {
  // Asserts initial state.
  const value = 'Test Value';
  const { emitted, getByRole, debug, getByDisplayValue } = render(BaseInput, {
    props: {
      modelValue: value,
    },
  });
  // Get the input DOM node by querying the associated label.
  const inputElement = getByRole('textbox');

  // Updates the <input> value and triggers an `input` event.
  await fireEvent.update(inputElement, value);

  // Проверяем, что событие 'input' было эмитировано
  expect(emitted().input).toBeTruthy();
  // Проверяем, что значение 'Test Value' было передано в событие 'input'
  expect(getByDisplayValue(value)).toBeInTheDocument();

  debug();
});

it('renders input element with placeholder', () => {
  const placeholderText = 'Placeholder Test';

  const { getByPlaceholderText, debug } = render(BaseInput, {
    props: {
      placeholder: placeholderText,
      modelValue: 'Test value',
    },
  });

  expect(getByPlaceholderText(placeholderText)).toBeInTheDocument();

  debug();
});

it('renders error elem', () => {
  const errorText = 'Error Test';
  const { queryByText, debug } = render(BaseInput, {
    props: {
      errors: errorText,
      modelValue: 'Test value',
    },
  });

  expect(queryByText(errorText)).toBeInTheDocument();

  debug();
});

it('renders label elem', () => {
  const labelText = 'Label Test';
  const { queryByText, debug } = render(BaseInput, {
    props: {
      labelText,
      modelValue: 'Test value',
    },
  });

  expect(queryByText(labelText)).toBeInTheDocument();

  debug();
});
