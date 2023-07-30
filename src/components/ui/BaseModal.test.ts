import { render, fireEvent, screen, getByRole } from '@testing-library/vue';
import '@testing-library/jest-dom';
import BaseModal from './BaseModal.vue';

jest.mock('vue-router', () => ({
  useRoute: jest.fn(() => ({ name: 'Home' })),
}));

it('renders with header and body', () => {
  const header = 'Header';
  const body = 'Body';
  const { debug, getByText } = render(BaseModal, {
    slots: {
      header,
      default: body,
    },
    props: {
      isOpen: true,
    },
  });
  getByText(header);
  getByText(body);
  debug();
});

it('closes by clicking close button', async () => {
  const body = 'Body';
  const { debug, queryByText, getByRole, rerender } = render(BaseModal, {
    slots: {
      default: body,
    },
    props: {
      isOpen: true,
    },
  });

  fireEvent.click(getByRole('button'));
  await rerender({
    isOpen: false,
  });

  expect(queryByText(body)).toBeNull();
  debug();
});

it('closes by clicking overlay element', async () => {
  const { debug, getByTestId, queryByTestId, rerender } = render(BaseModal, {
    props: {
      isOpen: true,
    },
  });

  fireEvent.click(getByTestId('base-modal-overlay'));
  await rerender({
    isOpen: false,
  });

  expect(queryByTestId('base-modal-overlay')).toBeNull();
  debug();
});
