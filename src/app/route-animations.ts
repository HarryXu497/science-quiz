import { trigger, transition, query, style, animate } from '@angular/animations';

export const fader = (triggerName: string = 'routeAnimations') => 
	trigger(triggerName, [
		transition("* <=> *", [
			query(":enter, :leave", [
				style({
					position: 'absolute',
					width: "100vw",
					opacity: 0,
					transform: 'scale(0) translateY(100%)',
				})
			], { optional: true }),
			query(":enter", [
				animate('800ms ease')
			], { optional: true })
		])
	])