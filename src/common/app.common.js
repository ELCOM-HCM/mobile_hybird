/**
 * 
 * @author DangTM R&D Department
 * @date May 10, 2017
 * @addr ELCOM-HCM
 * 
 */
import Cookie from "react-cookie";
var eCommon = {
		color : ['#1ebfae', '#30a5ff', '#ffb53e', '#c7c700', '#f9243f', '#669999'],
		user: Cookie.load("user"),
		lang_id: Cookie.load("lang_id") || "1"
}
eCommon.isAndroid = function() {
	return /Android/i
			.test(navigator.userAgent) ? !0 : !1
}
eCommon.isIOS = function(){
	return /iPad|iPhone|iPod/i
			.test(navigator.userAgent) ? !0 : !1
}
eCommon.drawCircleChart = function(element, data){
	var _=this;
	var length = data.length;
	for(var i = 0; i < length; i++){
		var percent = data[i].value*100/data[i].sum; 
		var classes = data[i].name.toLowerCase().replace(" ", '');
		$('.text__'+ i).text(data[i].name);
		$('.percent__'+ i).attr('data-percent', percent.toFixed());
		$('.percent__' + i + ' .percent').text(percent.toFixed() + '%');
		$(element + i).easyPieChart({
			scaleColor : false,
			barColor : this.state.color[i]
		});
		$(element + i).data('easyPieChart').update(percent.toFixed());
	}
	 
}
/**
 * Reference: https://www.highcharts.com/demo/column-drilldown
 */
eCommon.drawColumnChart= function(elementNameId, data, title){
	var _=this;
	var arr = [];
	var length = data.length;
	for(var i = 0; i < length; i++){
		var obj = {};
        obj.name = data[i].name;
        obj.color = _.color[i];
        obj.y = data[i].value;
		arr.push(obj);
	}
	Highcharts.chart(elementNameId, {
	    chart: {
	        type: 'column',
	        backgroundColor:'transparent'
	    },
	    title: {
	        text: title,
	        style: {
	            color: 'rgba(255,255,255,0.8)'
	        }
	    },
	    subtitle: {
	       // text: 
	    },
	    xAxis: {
	        type: 'category',
	        labels: {
                style: {
                    color: 'rgba(255,255,255,0.8)'
                }
            }
	    },
	    yAxis: {
	        title: {
	            text: 'Total rated',
	            style: {
		            color: 'rgba(255,255,255,0.8)'
		        }
	        }

	    },
	    legend: {
	        enabled: false
	    },
	    plotOptions: {
	        series: {
	            borderWidth: 0,
	            dataLabels: {
	                enabled: true,
	                format: '{point.y:.1f}'
	            }
	        }
	    },

	    tooltip: {
	        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
	        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of total<br/>'
	    },

	    series: [{
	        name: 'Rating',
	        colorByPoint: true,
	        data: arr
	    }]
	});
}
eCommon.logs = function(str){
	if(typeof(str) == "object"){
		str = JSON.stringify(str);
	}
	console.log('>>>>>______DangTM ELCOM log_____>>>> ' + this.getTime() + ': ' + str);
	
}
eCommon.request = function(obj, success, error) {
	$.ajax({
			url: obj.url,
			type: obj.type || 'GET',
			data: obj.data || "",
			success: success || function(res){
				eCommon.logs(res);
			},
			error: error || function(jqXHR, exception){
				eCommon.logs(eCommon.ajaxError(jqXHR, exception));
			}
		});
	
}
eCommon.requestAsync = function(obj){
	return new Promise( function(resolve, reject) {
		$.ajax({
			url: obj.url,
			type: obj.type || 'GET',
			data: obj.data || ""
		}).done(function(res){
			if(res.status == 500){
				reject(res);
			}
			resolve(res);
		})
		.fail(function(jqXHR, exception){
			console.log('Reject');
			console.log(exception);
			reject(jqXHR.status);
		});
	})
	
}

eCommon.ajaxError = function(jqXHR, exception){
	var msg = '';
    if (jqXHR.status === 0) {
        msg = 'Not connect. Verify Network.';
    } else if (jqXHR.status == 404) {
        msg = 'Requested page not found. [404]';
    } else if (jqXHR.status == 500) {
        msg = 'Internal Server Error [500].';
    } else if (exception === 'parsererror') {
        msg = 'Requested JSON parse failed.';
    } else if (exception === 'timeout') {
        msg = 'Time out error.';
    } else if (exception === 'abort') {
        msg = 'Ajax request aborted.';
    } else {
        msg = 'Uncaught Error.\n' + jqXHR.responseText;
    }
    return msg;
}
eCommon.getTime = function(){
	var _=this;
	var date = new Date();
	var hour = date.getHours() - (date.getHours() > 12 ? 12 : 0);
	var period = date.getHours() > 12 ? 'PM' : 'AM';
	return (_.showTime(hour) + ':' +  _.showTime(date.getMinutes()) + period);
}
eCommon.showTime = function(time){
	return time < 10 ? '0' + time : time;
}
eCommon.getDateBetween = function(dateFrom, dateTo){
	var from = dateFrom.split('-');
	var to = dateTo.split('-');
    var currentDate = new Date(from[2], from[1] - 1, from[0]);
    var end = new Date(to[2], to[1] - 1, to[0]);
    var between = [];
	while (currentDate <= end) {
		var obj = new Date(currentDate);
		var day = obj.getDate();
		var month = obj.getMonth() + 1;
		if (day < 10) {
			day = "0" + day;
		}
		if (month < 10) {
			month = "0" + month;
		}
	    between.push(day + '-' + month + '-' + obj.getFullYear());
	    currentDate.setDate(currentDate.getDate() + 1);
	}
	return between;
}
eCommon.getLast30Days = function() {
    var date = new Date();
    date.setDate(date.getDate()- 30);
    return date;
}
eCommon.rippleEffect = function($othis, e){
	var $this = $($othis);
	if($this.find(".ink").length === 0){
	   $this.prepend("<span class='ink'></span>");
    }
    var ink = $this.find(".ink");
    ink.removeClass("animate");
     
    if(!ink.height() && !ink.width()){
        var d = Math.max($this.outerWidth(), $this.outerHeight());
        ink.css({height: d, width: d});
    }
     
    var x = e.pageX - $this.offset().left - ink.width()/2;
    var y = e.pageY - $this.offset().top - ink.height()/2;
     
    ink.css({top: y+'px', left: x+'px'}).addClass("animate");
}
eCommon.unblockUI = function(){
	$.unblockUI();
}
eCommon.blockUI = function(){
	 $.blockUI({ 
        message: '<div><img style="width:100%;height:100%;border-radius: 73px; background-color:transparent" src="/styles/logo/ehotelsmile.png"></div>', 
		 css: { 
				padding:        0, 
				margin:         0, 
				width:          '30%', 
				top:            '30%', 
				left:           '35%', 
				textAlign:      'center', 
				color:          '#000', 
				border:         '0px solid #aaa', 
				backgroundColor: 'transparent', 
				cursor:         'wait' 
			},
			overlayCSS:  { 
		        backgroundColor: '#000', 
		        opacity:         1, 
		        cursor:          'wait' 
		    }, 
			baseZ:			'9999',
    }); 
}
export default eCommon;