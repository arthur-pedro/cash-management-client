import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

export const scale = trigger('scale', [
  state(
    'false',
    style({
      transform: 'scale(0)',
    }),
  ),
  state(
    'true',
    style({
      transform: 'scale(1)',
    }),
  ),
  transition('* => true', animate('0.5s ease-in')),
  transition('* => false', animate('0.5s ease-out')),
]);

export const fade = trigger('fade', [
  state('*', style({ opacity: '0' })),
  state(
    'false',
    style({
      opacity: '0',
    }),
  ),
  state(
    'true',
    style({
      opacity: '1',
    }),
  ),
  transition('* => false', animate('0.5s ease-out')),
  transition('* => true', animate('0.5s ease-in')),
]);

export const routerAnimation = trigger('routerAnimation', [
  state('init', style({ position: 'relative', opacity: '0', left: '30%' })),
  state('inRight', style({ opacity: '1', left: '0%' })),
  transition('* => inRight', [
    animate(
      '0.5s ease',
      keyframes([
        style({ opacity: 0, left: '30%', offset: 0 }),
        style({ opacity: 1, left: '0', offset: 1 }),
      ]),
    ),
  ]),
]);

export const slideAnimate = trigger('slideAnimate', [
  state('init', style({ opacity: '0', transform: 'translateX(-100%)' })),
  state('outLeft', style({ opacity: '0', transform: 'translateX(-100%)' })),
  state('outRight', style({ opacity: '0', transform: 'translateX(100%)' })),
  state('inLeft', style({ opacity: '1', transform: 'translateX(0)' })),
  state('inRight', style({ opacity: '1', transform: 'translateX(0)' })),
  transition('* => inLeft', [
    animate(
      '500ms ease',
      keyframes([
        style({ opacity: '0', transform: 'translateX(-100%)', offset: 0 }),
        style({ opacity: '1', transform: 'translateX(-100%)', offset: 0.1 }),
        style({ opacity: '1', transform: 'translateX(0)', offset: 1 }),
      ]),
    ),
  ]),
  transition('* => inRight', [
    animate(
      '500ms ease',
      keyframes([
        style({ opacity: '0', transform: 'translateX(100%)', offset: 0 }),
        style({ opacity: '1', transform: 'translateX(100%)', offset: 0.1 }),
        style({ opacity: '1', transform: 'translateX(0)', offset: 1 }),
      ]),
    ),
  ]),
  transition('* => outRight', [
    animate(
      '500ms ease',
      keyframes([
        style({ opacity: '1', transform: 'translateX(0)', offset: 0 }),
        style({ opacity: '1', transform: 'translateX(100%)', offset: 0.9 }),
        style({ opacity: '0', transform: 'translateX(100%)', offset: 1 }),
      ]),
    ),
  ]),
  transition('* => outLeft', [
    animate(
      '500ms ease',
      keyframes([
        style({ opacity: '1', transform: 'translateX(0)', offset: 0 }),
        style({ opacity: '1', transform: 'translateX(-100%)', offset: 0.9 }),
        style({ opacity: '0', transform: 'translateX(-100%)', offset: 1 }),
      ]),
    ),
  ]),
]);

export const slideInLeft = trigger('slideInLeft', [
  transition(':enter', [
    animate('500ms ease', keyframes([style({ left: '100rem' }), style({ left: '0rem' })])),
  ]),
]);

// --------------------------------- Animações para NG-IF ---------------------
export const ngIfSlide = trigger('ngIfSlide', [
  transition(':enter', [
    animate(
      '500ms ease-in',
      keyframes([
        style({ opacity: '0', transform: 'translate(30%, 0%)', offset: 0 }),
        style({ transform: 'translate(30%, 0%)', offset: 0.1 }),
        style({ opacity: '1', transform: 'translate(0%, 0%)', offset: 1 }),
      ]),
    ),
  ]),
]);
export const ngIfSlideCard = trigger('ngIfSlideCard', [
  transition('void => animate', [
    animate(
      '300ms ease-in',
      keyframes([
        style({ opacity: '0', transform: 'translate(30%, 0%)', offset: 0 }),
        style({ transform: 'translate(30%, 0%)', offset: 0.1 }),
        style({ opacity: '1', transform: 'translate(0%, 0%)', offset: 1 }),
      ]),
    ),
  ]),
  transition('void => static', [
    animate(
      '500ms ease-in',
      keyframes([style({ opacity: '1', transform: 'translate(0%, 0%)', offset: 1 })]),
    ),
  ]),
]);

export const ngIfSlideInLeft = trigger('ngIfSlideInLeft', [
  transition(':enter', [
    animate(
      '500ms ease',
      keyframes([
        style({ left: '100rem', position: 'relative', offset: 0 }),
        style({ left: '0rem', position: 'relative', offset: 0 }),
      ]),
    ),
  ]),
]);

export const ngIfSlideOutRight = trigger('ngIfSlideOutRight', [
  transition(':leave', [
    animate(
      '500ms ease',
      keyframes([
        style({ left: '0%', transform: 'translateX(0%)', offset: 0 }),
        style({ left: '100%', transform: 'translateX(100%)', offset: 1 }),
      ]),
    ),
  ]),
]);

export const ngIfSlideInRight = trigger('ngIfSlideInRight', [
  transition(':enter', [
    animate(
      '500ms ease',
      keyframes([
        style({ left: '100%', transform: 'translateX(100%)', offset: 0 }),
        style({ left: '0%', transform: 'translateX(0%)', offset: 1 }),
      ]),
    ),
  ]),
]);

export const ngIfSlideOutLeft = trigger('ngIfSlideOutLeft', [
  transition(':leave', [
    animate(
      '500ms ease',
      keyframes([
        style({ left: '0%', transform: 'translateX(0%)', offset: 0 }),
        style({ left: '-100%', transform: 'translateX(-100%)', offset: 1 }),
      ]),
    ),
  ]),
]);

export const ngIfSlideOutTop = trigger('ngIfSlideOutTop', [
  transition(':leave', [
    animate(
      '500ms ease',
      keyframes([
        style({ top: '0%', position: 'relative', offset: 0 }),
        style({ top: '-100%', position: 'relative', offset: 1 }),
      ]),
    ),
  ]),
]);

export const ngIfSlideInTop = trigger('ngIfSlideInTop', [
  transition(':enter', [
    animate(
      '500ms ease',
      keyframes([
        style({ top: '-100%', position: 'relative', offset: 0 }),
        style({ top: '0%', position: 'relative', offset: 1 }),
      ]),
    ),
  ]),
]);

export const ngIfFadeIn = trigger('ngIfFadeIn', [
  transition(':enter', [
    animate(
      '500ms ease-in',
      keyframes([style({ opacity: '0', offset: 0 }), style({ opacity: '1', offset: 1 })]),
    ),
  ]),
]);

export const ngIfFadeOut = trigger('ngIfFadeOut', [
  transition(':leave', [
    animate(
      '500ms ease-out',
      keyframes([style({ opacity: 1, offset: 0 }), style({ opacity: 0, offset: 1 })]),
    ),
  ]),
]);

export const ngIfScaleIn = trigger('ngIfScaleIn', [
  transition(':enter', [
    animate(
      '500ms ease',
      keyframes([
        style({ transform: 'scale(0)', offset: 0 }),
        style({ transform: 'scale(1)', offset: 1 }),
      ]),
    ),
  ]),
]);

export const ngIfScaleOut = trigger('ngIfScaleOut', [
  transition(':leave', [
    animate(
      '500ms ease',
      keyframes([
        style({ transform: 'scale(1)', offset: 0 }),
        style({ transform: 'scale(0)', offset: 1 }),
      ]),
    ),
  ]),
]);
