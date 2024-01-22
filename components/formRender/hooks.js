import { ref} from 'vue';

export function useFormRender(props) {
  const elRef = ref(null);

  function register(instance) {
    elRef.value = instance;
    props && instance.init(props);
  }

  const methods = {
    validateForm: () => {
      return elRef.value.validateForm();
    },
		getFormData: () => {
		 return elRef.value.getFormData();
		},
		setFormData: (params) => {
		  elRef.value.setFormData(params);
		},
		updateColumns: (params) => {
		  elRef.value.updateColumns(params);
		},
  };

  return [register, methods];
}
