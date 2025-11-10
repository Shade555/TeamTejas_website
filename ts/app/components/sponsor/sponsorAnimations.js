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

		// Top logos: center-first stagger (dynamic for odd/even counts)
		ScrollTrigger.batch('.sponsor-logo-top', {
			interval: 0.12,
			batchMax: 20,
			onEnter: (batch) => {
				// Mirror: elements slide inward toward their layout positions.
				// Left items should move left into place, right items move right into place.
				gsap.fromTo(
					batch,
					{ x: (i, el, arr) => -((i - (arr.length - 1) / 2) * 100), opacity: 0 },
					{ x: 0, opacity: 1, stagger: { each: 0.18, from: 'center' }, duration: 0.9, ease: 'power4.out', delay: 0.06 }
				);
			},
			onLeaveBack: (batch) => {
				gsap.to(batch, {
					x: (i, el, arr) => -((i - (arr.length - 1) / 2) * 60),
					opacity: 0,
					stagger: { each: 0.12, from: 'center' },
					duration: 0.45,
					ease: 'power1.in',
				});
			},
			start: 'top 80%',
		});

		// Logos: animate individually as they enter using batch, mirrored per side
		ScrollTrigger.batch('.sponsor-logo-right', {
			interval: 0.12,
			batchMax: 20,
			onEnter: (batch) => {
				// appear from the top-right, animate starting from the right-most item
				gsap.fromTo(
					batch,
					{ y: -40, x: 40, opacity: 0 },
					{ y: 0, x: 0, opacity: 1, stagger: { each: 0.18, from: 'end' }, duration: 0.9, ease: 'power4.out', delay: 0.06 }
				);
			},
			onLeaveBack: (batch) => {
				gsap.to(batch, { y: -30, x: 30, opacity: 0, stagger: { each: 0.12, from: 'end' }, duration: 0.45, ease: 'power1.in' });
			},
			start: 'top 80%',
		});

		ScrollTrigger.batch('.sponsor-logo-left', {
			interval: 0.12,
			batchMax: 20,
			onEnter: (batch) => {
				// appear from the top-left, animate starting from the left-most item
				gsap.fromTo(
					batch,
					{ y: -40, x: -40, opacity: 0 },
					{ y: 0, x: 0, opacity: 1, stagger: { each: 0.18, from: 'start' }, duration: 0.9, ease: 'power4.out', delay: 0.06 }
				);
			},
			onLeaveBack: (batch) => {
				gsap.to(batch, { y: -30, x: -30, opacity: 0, stagger: { each: 0.12, from: 'start' }, duration: 0.45, ease: 'power1.in' });
			},
			start: 'top 80%',
		});

		// Year sections
			gsap.utils.toArray('.sponsor-year').forEach((sec) => {
				gsap.from(sec, {
					y: 22,
					opacity: 0,
					duration: 0.7,
					ease: 'power3.out',
					delay: 0.05,
					scrollTrigger: {
						trigger: sec,
						start: 'top 80%',
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
		hoverTween = gsap.to(cta, { scale: 1.03, duration: 0.18, ease: 'power1.out' });
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
		try {
			ScrollTrigger.getAll().forEach((st) => st.kill());
		} catch (e) {
			// ignore
		}
		ctx.revert();
	};
}

