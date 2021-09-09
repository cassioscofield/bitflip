$(document).ready(function(){
	
	// tempo entre um slide e outro
	var delay = 5000;
	
	// cores de fundo dos slides
	var cor1 = '#15587d';
	var cor2 = '#7d1530';
	var cor3 = '#ffffff';
	var cor = [
		cor1, 
		cor2,
		cor3];
	$('.fundobanner, .slides li').css('backgroundColor',cor1);
	$('.seta').css('borderTopColor',cor1);
	
	// conta o número de slides
	var total = $('.slides > li').length;
	
	// define a largura do container .banner
	var larg = total*980;
	$('.slides').width(larg);
	
	// adiciona a classe active ao primeiro slide
	$('.slides > li').eq(0).addClass('active');
	
	// autoplay
	if (total>1){
		var timeout;
		timeout = setInterval(function(){autoPlay();},delay);
	}
	// parar animação no hover
	if (total>1){
		$('.banner').hover(function(){
			clearInterval(timeout);
			console.log('animação parada');
			
		}, function(){
			timeout = setInterval(function(){autoPlay();},delay);
			console.log('animação começa');
		});
	}
	
	// diminui a opacidade dos botoes que nao o primeiro
	$('.bannermenu a').not("a[href='#slide1']").animate({'opacity':'.3'});
	$(".bannermenu a[href='#slide1']").animate({'borderColor':cor[0]});
	
	// função de animação dos slides - (index do slide como parâmetro)
	function autoPlay(){
		var i = $('.active').index();
		console.log('index:'+i);
		console.log('animação começa');
		var pos = -(i+1)*980;

			if (i == (total-1)) {
				$('.slides').animate({'left':'0px'},function(){		
					// remove a classe do slide atual e adiciona a classe para o próximo slide
					$('.slides > li').eq(i).removeClass('active');
					$('.slides > li').eq(0).addClass('active');
					console.log('animação termina');
					$('.bannermenu a').not("a[href='#slide"+1+"']").animate({'opacity':'.3','borderColor':'#ffffff'});
					$("a[href='#slide"+1+"']").animate({'opacity':'1','borderColor':cor[0]});
				});
				
				/** SETA **/
				var indexSeta = 1;
				var indexMarg = 10;
				var posLeft = ((($("a[href='#slide"+1+"']").width()/2)*indexSeta)+indexMarg) - 20;
				console.log(posLeft);
				$('.seta').animate({'marginLeft':posLeft, 'borderTopColor':cor[0]});
				
				/** MUDANDO COR DE FUNDO **/
				console.log(cor[0]);
				$('.fundobanner, .slides li').animate({'backgroundColor':cor[0]});
				
			} else {
				$('.slides').animate({'left':pos+'px'},function(){			
					// remove a classe do slide atual e adiciona a classe para o próximo slide
					$('.slides > li').eq(i).removeClass('active');
					$('.slides > li').eq(i+1).addClass('active');
					console.log('animação termina');
					$('.bannermenu a').not("a[href='#slide"+(i+2)+"']").animate({'opacity':'.3','borderColor':'#ffffff'});
					$("a[href='#slide"+(i+2)+"']").animate({'opacity':'1','borderColor':cor[i+1]});
				});
				
				/** SETA **/
				var indexSeta = (2*(i+1))+1;
				var indexMarg = ((i+1)+1)*10;
				var posLeft = ((($("a[href='#slide"+(i+2)+"']").width()/2)*indexSeta)+indexMarg) - 20;
				console.log(posLeft);
				$('.seta').animate({'marginLeft':posLeft, 'borderTopColor':cor[i+1]});
				
				/** MUDANDO COR DE FUNDO **/
				console.log(cor[i+1]);
				$('.fundobanner, .slides li').animate({'backgroundColor':cor[i+1]});
				
			}
	}
	
	// evento quando se clica no botão de navegação
	$(".bannermenu li").click(function(event){
		event.preventDefault();
		var indexClick = $(this).index();
		var posClick = -(indexClick*980);
		$('.active').removeClass('active');
		$('.slides > li').eq(indexClick).addClass('active');
		$('.bannermenu a').not("a[href='#slide"+(indexClick+1)+"']").animate({'opacity':'.3','borderColor':'#ffffff'});
		$("a[href='#slide"+(indexClick+1)+"']").animate({'opacity':'1','borderColor':cor[indexClick]});
		clearInterval(timeout);
		console.log('animação parada');
		$('.slides').animate({'left':posClick+'px'});
		
		/** SETA **/
		var indexSeta = (2*indexClick)+1;
		var indexMarg = (indexClick+1)*10;
		var posLeft = ((($(this).width()/2)*indexSeta)+indexMarg) - 20;
		console.log(posLeft);
		$('.seta').animate({'marginLeft':posLeft, 'borderTopColor':cor[indexClick]});
		
		/** MUDANDO COR DE FUNDO **/
		console.log(cor[indexClick]);
		$('.fundobanner,  .slides li').animate({'backgroundColor':cor[indexClick]});
		
		if (total>1){
			timeout = setInterval(function(){autoPlay();},delay);
		}
	});
});