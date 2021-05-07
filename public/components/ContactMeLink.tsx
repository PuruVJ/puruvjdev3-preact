import { mdiOpenInNew } from '@mdi/js';
import { AppIcon } from './AppIcon';
import css from './ContactMeLink.module.scss';

export const ContactMeLink = () => {
  return (
    <a
      href="https://bh0r2vt8n2f.typeform.com/to/tVdjlnjE"
      target="_blank"
      rel="noopener noreferrer"
      class={css.link}
    >
      <span>Contact Me</span>
      <AppIcon path={mdiOpenInNew} />
    </a>
  );
};
