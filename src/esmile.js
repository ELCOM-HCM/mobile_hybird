import React from 'react';
import { render } from 'react-dom';
import App from './components/AppSmile';
import app from './common/app.plugin';
import cookie from "react-cookie";
import Register from './components/Register' 
import eCommon from './common/app.common';

if(cookie.load("register") == undefined){
	render(<Register />, document.getElementById('register'));
} else {
	render(<App appSmileSelect={appSmileSelect} />, document.getElementById('root'));
	var $$ = Dom7;
	var slide = null;
	eCommon.blockUI();
	app.showIndicator();
	setTimeout(function () {
	    app.hideIndicator();
	    eCommon.unblockUI();
	    var slideLarge = app.swiper('.slide-large', {
	    	pagination:'.large-swiper-pagination',
	    	autoplay: 7000,
	    	speed: 4000,
	    	effect: 'fade', // Could be "slide", "fade", "cube", "coverflow" or  "flip"
	    });
	    slide = initSwipeSlide();
	}, 2000);

	var mainView = app.addView('.view-main', {
		dynamicNavbar: false,
		domCache: true
	});
	$$(document).on('page:reinit', function(e){
		if(e.detail == null){
			$$(e.path[0]).find('div[data-page="esmile_page_1"]').removeClass('cached');
			$$(e.path[0]).find('div[data-page="esmile_page_1"]').removeClass('page-on-left');
			slide.slideTo(0 , 1000, true);
			return;
		}
		var page = e.detail.page;
		if(page.name == 'esmile_page_1'){
			slide = initSwipeSlide();
			$(page.fromPage.container).addClass('cached');
		} else if(page.name == 'esmile_page_2'){
			$(page.fromPage.container).addClass('cached');
		} else if(page.name == 'esmile_page_3'){
			$(page.fromPage.container).addClass('cached');
		} else if(page.name == 'esmile_page_4'){
			$(page.fromPage.container).addClass('cached');
			setTimeout(function(){
				$(page.container).addClass('cached');
				eCommon.APP_CALLBACK.trigger('page:reinit');
			}, 3000);
		}
	});
	eCommon.APP_CALLBACK = $$(document).on('page:init', function(e){
		if(e.detail == null){
			$$(e.path[0]).find('div[data-page="esmile_page_1"]').addClass('cached');
			$$(e.path[0]).find('div[data-page="esmile_page_4"]').removeClass('cached');
			setTimeout(function(){
				$$(e.path[0]).find('div[data-page="esmile_page_4"]').addClass('cached');
				eCommon.APP_CALLBACK.trigger('page:reinit');
			}, 3000);
			return;
		}
		var page = e.detail.page;
		if(page.name == 'esmile_page_1'){
			$$(page.container).removeClass('cached');
		} else if(page.name == 'esmile_page_2'){
			$(page.fromPage.container).addClass('cached');
		} else if(page.name == 'esmile_page_3'){
			$(page.fromPage.container).addClass('cached');
		} else if(page.name == 'esmile_page_4'){
			$(page.fromPage.container).addClass('cached');
			setTimeout(function(){
				$(page.container).addClass('cached');
				eCommon.APP_CALLBACK.trigger('page:reinit');
			}, 3000);
		}
	});
	app.init();
	function initSwipeSlide(){
		var slideSmall = app.swiper('.slide-small', {
			pagination:'.small-swiper-pagination',
			autoplay: 5000,
			speed: 3000,
			paginationType: 'bullets', // Can be "bullets", "fraction", "progress" or "custom"
			effect: 'coverflow', // Could be "slide", "fade", "cube", "coverflow" or  "flip"
		});
		return slideSmall;
	}
	function appSmileSelect(item){
		if(slide.isEnd){
			eCommon.APP_CALLBACK.trigger('page:init');
		} else {
			slide.slideTo(slide.realIndex + 1 , 1000, true);
		}
	}
}



