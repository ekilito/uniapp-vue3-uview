import { ref, onUnmounted, unref, watch, toRaw } from 'vue';

export function useListPage(props) {
  const elRef = ref(null);

  function register(instance) {
    elRef.value = instance;
    props && instance.setProps(props);
		instance.reload()
  }

  const methods = {
    reload: (params) => {
      elRef.value.reload(params);
    },
  };

  return [register, methods];
}
