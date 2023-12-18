// import { SlickArrowLeft, SlickArrowLeftAlt, SlickArrowRight, SlickArrowRightAlt } from './components/arrows.jsx'

export const categorySettings: {} = {
	dots: true,
	infinite: true,
	draggable: false,
	speed: 500,
	slidesToShow: 6,
	slidesToScroll: 3,
	rows: 2,
	autoplay: true,
	autoplaySpeed: 15000,
	// prevArrow: <SlickArrowLeftAlt />,
	// nextArrow: <SlickArrowRightAlt />,
	appendDots: (dots: any) => (
		<div>
			<ul className='absolute -top-1 left-[43%]'>{dots}</ul>
		</div>
	)
}
	
export const carouselSettings: {} = {
	dots: true,
	infinite: true,
	draggable: false,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll:1,
	rows: 1,
	autoplay: true,
	autoplaySpeed: 5000,
	// prevArrow: <SlickArrowLeftAlt />,
	// nextArrow: <SlickArrowRightAlt />,
	appendDots: (dots: any) => (
		<div>
			<ul className='absolute -top-1 left-[43%]'>{dots}</ul>
		</div>
	)
}

export const threeColSettings = {
	dots: false,
	infinite: false,
	speed: 200,
	slidesToShow: 3,
	slidesToScroll: 3,
	draggable: false,
	// prevArrow: <SlickArrowLeft />,
	// nextArrow: <SlickArrowRight />
}
