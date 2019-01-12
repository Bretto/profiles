import {animate, animation, query, style, transition, trigger} from '@angular/animations';

export const translateX = animation([
  style({
    transform: 'translateX({{from}})'
  }),
  animate('.5s ease-out', style({transform: 'translateX({{to}})'})),
]);

//
// export const routeAnimation = trigger('routeAnimation', [
//
//   transition( '* => *', [
//
//     query(':enter, :leave', style({ position: 'absolute', width: '100%'}),
//       { optional: true }),
//
//     query(':enter',
//       [
//         style({ opacity: 0 })
//       ],
//       { optional: true }
//     ),
//
//     query(':leave',
//       [
//         animate('0.2s', style({ opacity: 0 }))
//       ],
//       { optional: true }
//     ),
//
//     query(':enter',
//       [
//         animate('0.3s', style({ opacity: 1 }))
//       ],
//       { optional: true }
//     )
//   ])
// ]);


