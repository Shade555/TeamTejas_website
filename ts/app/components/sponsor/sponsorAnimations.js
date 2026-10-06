import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export default function initSponsorAnimations(container) {
	if (!container) return null;

	gsap.registerPlugin(ScrollTrigger);

	// Scope GSAP selectors to the container
	const ctx = gsap.context(() => {
			// Heading (slower, start a bit later)
			gsap.from('.sponsor-heading', {
				y: -24,
				opacity: 0,
				duration: 0.75,
				ease: 'power3.out',
				delay: 0.05,
				scrollTrigger: {
					trigger: '.sponsor-heading',
					start: 'top 75%',
					toggleActions: 'play reverse play reverse',
				},
			});

			// Description (start a bit later and slower)
			gsap.from('.sponsor-desc', {
				y: -18,
				opacity: 0,
				duration: 0.7,
				ease: 'power3.out',
				delay: 0.06,
				scrollTrigger: {
					trigger: '.sponsor-desc',
					start: 'top 75%',
					toggleActions: 'play reverse play reverse',
				},
			});

			// CTA (slower entrance, starts when more visible)
			gsap.from('.sponsor-cta', {
				scale: 0.96,
				opacity: 0,
				duration: 0.7,
				ease: 'power3.out',
				delay: 0.08,
				scrollTrigger: {
					trigger: '.sponsor-cta',
					start: 'top 80%',
					toggleActions: 'play reverse play reverse',
				},
			});

		// Simplify logo animations to a clean vertical fade-up (fixes mobile overflow/clipping issues)
		const animateLogosIn = (batch, fromPos) => {
			gsap.fromTo(
				batch,
				{ y: 40, x: 0, opacity: 0 },
				{ y: 0, x: 0, opacity: 1, stagger: { each: 0.12, from: fromPos }, duration: 0.8, ease: 'power3.out' }
			);
		};

		const animateLogosOut = (batch, fromPos) => {
			gsap.to(batch, {
				y: 20,
				x: 0,
				opacity: 0,
				stagger: { each: 0.08, from: fromPos },
				duration: 0.4,
				ease: 'power2.in',
			});
		};

		ScrollTrigger.batch('.sponsor-logo-top', {
			interval: 0.1,
			batchMax: 20,
			onEnter: (batch) => animateLogosIn(batch, 'center'),
			onLeaveBack: (batch) => animateLogosOut(batch, 'center'),
			start: 'top 85%',
		});

		ScrollTrigger.batch('.sponsor-logo-right', {
			interval: 0.1,
			batchMax: 20,
			onEnter: (batch) => animateLogosIn(batch, 'end'),
			onLeaveBack: (batch) => animateLogosOut(batch, 'end'),
			start: 'top 85%',
		});

		ScrollTrigger.batch('.sponsor-logo-left', {
			interval: 0.1,
			batchMax: 20,
			onEnter: (batch) => animateLogosIn(batch, 'start'),
			onLeaveBack: (batch) => animateLogosOut(batch, 'start'),
			start: 'top 85%',
		});

		// Year sections
		gsap.utils.toArray('.sponsor-year').forEach((sec) => {
			gsap.from(sec, {
				y: 30,
				opacity: 0,
				duration: 0.7,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: sec,
					start: 'top 85%',
					toggleActions: 'play reverse play reverse',
				},
			});
		});
	}, container);

	// CTA hover/focus
	const cta = container.querySelector('.sponsor-cta');
	let hoverTween = null;
	const onEnter = () => {
		if (!cta) return;
		hoverTween && hoverTween.kill();
		hoverTween = gsap.to(cta, { scale: 1.05, duration: 0.2, ease: 'power2.out' });
	};
	const onLeave = () => {
		if (!cta) return;
		hoverTween && hoverTween.reverse();
	};

	if (cta) {
		cta.addEventListener('mouseenter', onEnter);
		cta.addEventListener('mouseleave', onLeave);
		cta.addEventListener('focus', onEnter);
		cta.addEventListener('blur', onLeave);
	}

	return () => {
		if (cta) {
			cta.removeEventListener('mouseenter', onEnter);
			cta.removeEventListener('mouseleave', onLeave);
			cta.removeEventListener('focus', onEnter);
			cta.removeEventListener('blur', onLeave);
		}
		hoverTween && hoverTween.kill();
		ctx.revert();
	};
}

