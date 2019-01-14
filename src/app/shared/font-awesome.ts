import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faUserPlus,
  faAngleRight,
  faAngleLeft,
  faEdit,
  faHome,
  faChevronLeft,
  faChevronRight,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faBars,
  faUserPlus,
  faAngleRight,
  faAngleLeft,
  faChevronLeft,
  faChevronRight,
  faEdit,
  faHome,
  faExclamationTriangle
);


export const FontAwesome = FontAwesomeModule;
