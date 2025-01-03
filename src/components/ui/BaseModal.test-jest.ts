import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import BaseModal from './BaseModal.vue';
import '@testing-library/jest-dom';

jest.mock('vue-router', () => ({
  useRoute: jest.fn(() => ({ name: 'Home' })),
}));

function renderModal(header = '', body = '', isOpen = true) {
  return render(BaseModal, {
    slots: {
      header,
      default: body,
    },
    props: {
      isOpen,
    },
  });
}

it('renders with header and body', () => {
  const header = 'Header';
  const body = 'Body';

  const { getByText } = renderModal(header, body);

  getByText(header);
  getByText(body);
  screen.debug();
});

it('closes by clicking close button', async () => {
  const body = 'Body';

  const { queryByTestId, rerender, getByRole, queryByText, getByTestId } = renderModal('', body);

  getByTestId('base-modal-overlay');
  fireEvent.click(getByRole('button'));
  await rerender({
    isOpen: false,
  });

  await waitFor(() => {
    expect(queryByText(body)).toBeNull();
    expect(queryByTestId('base-modal-overlay')).toBeNull();
  });
  screen.debug();
});

it('closes by clicking overlay element', async () => {
  const { getByTestId, queryByTestId, rerender } = renderModal();

  fireEvent.click(getByTestId('base-modal-overlay'));
  await rerender({
    isOpen: false,
  });

  expect(queryByTestId('base-modal-overlay')).toBeNull();
  screen.debug();
});
