export const eye_button = (tag) => {
  let type =
    tag.nativeElement.getAttribute('type') === 'password' ? 'text' : 'password';
  tag.nativeElement.setAttribute('type', type);
};
