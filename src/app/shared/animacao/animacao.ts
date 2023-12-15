import { trigger, state, style, animate, transition } from '@angular/animations';

export const abrirFechar = trigger('abrirFechar', [
  state('invisivel', style({
    height: '0',
    opacity: 0,
    transform: 'scaleY(0)'
  })),
  state('aberto', style({
    height: '200px',
    opacity: 1,
    backgroundColor: 'yellow',
    transform: 'scaleY(1)'
  })),
  state('fechado', style({
    height: '100px',
    opacity: 0.5,
    backgroundColor: 'green',
    transform: 'scaleY(0)'
  })),
  transition('* => *', animate('1s')),
]);
