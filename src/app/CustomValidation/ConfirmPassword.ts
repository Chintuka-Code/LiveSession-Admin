import { FormGroup } from '@angular/forms';

export const confirmPassword = (formGroup: FormGroup) => {
  const { value: password } = formGroup.get('new_password');
  const confirmPassword = formGroup.get('confirm_password');

  return password === confirmPassword.value
    ? null
    : confirmPassword.setErrors({ passwordNotMatch: true });
};
