import { onMounted, onUnmounted, type Ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export function useModalFunctions(isOpen: Ref<boolean>, close: () => void) {
  const route = useRoute();
  const onKeyHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      close();
    }
  };

  onMounted(() => {
    document.body.addEventListener('keydown', onKeyHandler);
  });

  onUnmounted(() => {
    document.body.removeEventListener('keydown', onKeyHandler);
  });

  watch(isOpen, (val) => {
    if (val) { document.body.classList.add('no-scroll'); }
    else {
      document.body.classList.remove('no-scroll');
    }
  });

  watch(
    () => route.name,
    () => {
      document.body.classList.remove('no-scroll');
      close();
    },
  );
}
