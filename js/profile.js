$("#recommend_btn").click(function(){
		    $("#recommend_btn").attr("src","img/mr.png"),
			$("#recommendwz_btn").text('已设为默认')	,
			$("#recommend_btn2").attr("src","img/xjk.png"),
			$("#recommendwz_btn2").text('设为默认'),
			$("#recommend_btn3").attr("src","img/xjk.png"),
			$("#recommendwz_btn3").text('设为默认')
		});
		$("#recommend_btn2").click(function(){
			$("#recommend_btn").attr("src","img/xjk.png"),
			$("#recommendwz_btn").text('设为默认')
		    $("#recommend_btn2").attr("src","img/mr.png"),
			$("#recommendwz_btn2").text('已设为默认'),
			$("#recommend_btn3").attr("src","img/xjk.png"),
			$("#recommendwz_btn3").text('设为默认')		
		});
		$("#recommend_btn3").click(function(){    
			$("#recommend_btn").attr("src","img/xjk.png")
			$("#recommendwz_btn").text('设为默认'),
			$("#recommend_btn2").attr("src","img/xjk.png"),
			$("#recommendwz_btn2").text('设为默认'),
			$("#recommend_btn3").attr("src","img/mr.png"),
			$("#recommendwz_btn3").text('已设为默认')
		});
		
		
		
		
		$('#bth1').click(function(){
			$('.xz').show();
		})
		$('#bth1').click(function(){
			$('.address').show();
		})
		$('#bth6').click(function(){
			$('.xz').hide();
			$('.remove').hide();
		})
		$('#bth7').click(function(){
			$('.xz').hide();
			$('.remove').hide();
		})
		
		
		
		
		$('#bth3').click(function(){
			$('.remove').show(),
			$('.xz').show();
		})
		$('#bth4').click(function(){
			$('.remove').show(),
			$('.xz').show();
		})
		$('#bth5').click(function(){
			$('.remove').show(),
			$('.xz').show();
		})
		
		$('#bth2').click(function(){
			$('.xz').hide(),
			$('.address').hide();
		})
		$('.xz').click(function(){
			$('.xz').hide(),
			$('.address').hide();
		})
		
		
		
		$('#bth3').click(function(){
			$('#bth6').click(function(){
				$('#list1').hide();
			})
		})
		$('#bth4').click(function(){
			$('#bth6').click(function(){
				$('#list2').hide();
			})
		})
		$('#bth5').click(function(){
			$('#bth6').click(function(){
				$('#list3').hide();
			})
		})