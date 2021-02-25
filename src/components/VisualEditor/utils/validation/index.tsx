
import * as Yup from 'yup';

export function getValidation(validations: string[]) {
  const validates = validations.map(item => {
    switch (item) {
      case 'email':
        return Yup.string().email('Invalid email').required('Required');
      case 'required':
        return Yup.string().required('Required');
    }
  }).filter(item => !!item);
  return async (value: string) => {
    for await (let validate of validates) {
      const errMsg = await validate?.validate(value);
      if (errMsg) return errMsg;
    }
  };
}