;(function () {
    $.fn.getArea = function (options) {
        var defaults = {
            jsonUrl: 'json/area.json',
            elePage: 'body',
            inpEle: '#getArea',
            areaMask: '.area-larger-mask',
            confirmArea: '.confirm-area-control',
            cancelArea: '.cancel-area-control',
            scrollItem: '.area-item',
            defaultSplit: ",",
            eventInpFocus: 'focus',
            eventTouchStart: 'touchstart',
            eventTouchMove: 'touchmove',
            eventClick: 'click',
            startY: 0,
            endY: 0,
            moveY: 0,
            lengthY: 0,
            nowTop: 0,
            scrollTime: '200ms',
            oldTop: 0,
            newTop: 0,
            eleLength: 0,
            scrollNum: 0,
            areaData: [],
            cityList: [],
            regionList: [],
            // 滑动后的index
            scrollProvince: 0,
            scrollCity: 0,
            scrollRegion: 0,
            provinceObj:{
                'name': '',
                'code': '',
                'index': ''
            },
            cityObj:{
                'name': '',
                'code': '',
                'index': ''
            },
            regionObj:{
                'name': '',
                'code': '',
                'index': ''
            },
            // 区域选择是否省市区都有
            normalArea: true,
            // 默认显示区域
            defaultArea: [18, 2, 3],
            inpVal: ''
        };
        var params = $.extend(defaults, options);
        $(this).each(function () {
            var _this = $(this);
            getAreaContent();
            // 获取json数据 呼出弹窗
            $(this).on(params.eventInpFocus, function () {
                $.getJSON(params.jsonUrl, function(data){
                    $('.area-province-scroll').empty();
                    params.areaData = data[0];
                    $.each(params.areaData, function (k, v) {
                        var province = '<div data-code="'+ v.provinceCode +'">'+ v.provinceName +'</div>';
                        $('.area-province-scroll').append(province);

                    });
                    // 初始化区域之前 获取输入框的区域信息
                    params.inpVal = $(params.inpEle).val();
                    if (params.inpVal !== '') {
                        handleAreaInput();
                    } else {
                        // 初始化区域 省 市 区
                        $(params.scrollItem).eq(0).css('top', params.defaultArea[0] * -40);
                        initArea(1, params.defaultArea[0], params.defaultArea[1]);
                        initArea(2, params.defaultArea[1], params.defaultArea[2]);
                    }
                    // 保存区域信息 (defaultArea的下标是显示的下标 不是数据的下标)
                    saveareaMsg(0, params.defaultArea[0]);
                    saveareaMsg(1, params.defaultArea[1]);
                    saveareaMsg(2, params.defaultArea[2]);
                    params.scrollProvince = params.defaultArea[0];
                    params.scrollCity = params.defaultArea[1];
                    params.scrollRegion = params.defaultArea[2];
                });
                $(params.areaMask).fadeIn(200);
            });
            // 确定地区
            $(params.elePage).on(params.eventClick, params.confirmArea, function () {
                var html = params.provinceObj.name + params.defaultSplit + params.cityObj.name + params.defaultSplit + params.regionObj.name;
                $(params.inpEle).val(html);
                $(params.areaMask).fadeOut(200);
                clearAreaList();
            });
            // 取消选择
            $(params.elePage).on(params.eventClick, params.cancelArea, function () {
                $(params.areaMask).fadeOut(200);
                clearAreaList();
            });
            // 关闭弹窗
            $(params.elePage).on(params.eventClick, '#areaScrollMask', function (e) {
                if (e.target.id === 'areaScrollMask') $(params.areaMask).fadeOut(200);
            });
            // 手指开始触摸
            $(params.elePage).on('touchstart', params.scrollItem, function (e) {
                var $this = $(this);
                if (e.cancelable) {
                    if (!e.defaultPrevented) {
                        e.preventDefault();
                    }
                }
                params.startY = e.originalEvent.changedTouches[0].pageY;
                params.oldTop = Number($this.css('top').split('p')[0]);
            });
            // 手指滑动
            $(params.elePage).on('touchmove', params.scrollItem, function (e) {
                var $this = $(this);
                params.nowTop = Number($this.css('top').split('p')[0]);
                params.endY = e.originalEvent.changedTouches[0].pageY;
                params.moveY = params.endY - params.startY;
                params.newTop = Math.round(params.oldTop + params.moveY);
                if (params.nowTop <= 0) {
                    if (params.moveY < 0) {         // 上滑
                        if(params.newTop >= 40 - ($this.children().outerHeight()) ) {
                            if (params.newTop % 40 <= -20) {
                                params.scrollNum = Math.round(params.newTop / 40);
                                $this.css('top', params.scrollNum * 40);
                            } else if (params.newTop % 40 > -20) {
                                params.scrollNum = Math.round(params.newTop / 40);
                                $this.css('top', params.scrollNum * 40);
                            }
                        }
                    } else if (params.moveY > 0) {  // 下滑
                        if (params.newTop <= 0) {
                            if (params.newTop % 40 >= 20) {
                                params.scrollNum = Math.round(params.newTop / 40) + 1;
                                $this.css('top', params.scrollNum * 40);
                            } else if (params.newTop % 40 < 20) {
                                params.scrollNum = Math.round(params.newTop / 40);
                                $this.css('top', params.scrollNum * 40);
                            }
                        }
                    }
                }
            });
            // 停止触摸
            $(params.elePage).on('touchend', params.scrollItem, function (e) {
                var $this = $(this);
                // 触摸的区域
                var areaIndex = $('.area-item').index($this);
                switch (areaIndex) {
                    case 0: // 省
                        saveareaMsg(0, -params.scrollNum);
                        params.scrollProvince = -params.scrollNum;
                        params.cityList = params.areaData[-params.scrollNum].areaVOList;
                        // 加载市
                        loadAreaList(areaIndex + 1, params.cityList);
                        // 加载区
                        loadAreaList(areaIndex + 2, params.cityList[0].areaVOList);
                        // 保存市
                        saveareaMsg(1, 0);
                        // 保存区
                        saveareaMsg(2, 0);
                        setAreaOpen(params.scrollProvince, 0, 0);
                        break;
                    case 1: // 市
                        // 保存市
                        saveareaMsg(1, -params.scrollNum);
                        params.scrollCity = -params.scrollNum;
                        console.log(-params.scrollNum)
                        console.log(params.cityList[-params.scrollNum])
                        params.regionList = params.cityList[-params.scrollNum].areaVOList;
                        // 加载区
                        loadAreaList(areaIndex + 1, params.regionList);
                        // 保存区
                        saveareaMsg(2, 0);
                        setAreaOpen(params.scrollProvince, params.scrollCity, 0);
                        break;
                    case 2: // 区
                        params.scrollRegion = -params.scrollNum;
                        setAreaOpen(params.scrollProvince, params.scrollCity, params.scrollRegion);
                        saveareaMsg(2, -params.scrollNum);
                        break;
                    default:
                        break;
                }
            });
            // 加载地区列表 areaIndex区域box下标  areaArr区域列表
            function loadAreaList(areaIndex, areaArr) {
                $(params.scrollItem).eq(areaIndex).children().empty();
                $(params.scrollItem).eq(areaIndex).css('top', 0);
                // 加载市
                if (areaIndex === 1) {
                    $.each(areaArr, function (k, v) {
                        var areaItem = '<div data-id="'+ v.cityCode +'">'+ v.cityName +'</div>';
                        $(params.scrollItem).eq(areaIndex).children().append(areaItem);
                    });
                // 加载区
                } else if (areaIndex === 2) {
                    $.each(areaArr, function (k, v) {
                        var areaItem = '<div data-id="'+ v.countyCode +'">'+ v.countyName +'</div>';
                        $(params.scrollItem).eq(areaIndex).children().append(areaItem);
                    });
                }
            }
            // 初始化地区  显示目前所选地区 （存在默认值）
            // 传入1 2 表示 市 区，传入initIndex 表示第几个省市区， index表示下一级下标
            function initArea(areaIndex, initIndex, index) {
                if (areaIndex === 1) {
                    params.cityList = params.areaData[initIndex].areaVOList;
                    $.each(params.cityList, function (k, v) {
                        var item = '<div data-id="'+ v.cityCode +'">'+ v.cityName +'</div>';
                        $(params.scrollItem).eq(areaIndex).children().append(item);
                    });
                } else if (areaIndex === 2) {
                    params.regionList = params.cityList[initIndex].areaVOList;
                    $.each(params.regionList, function (k, v) {
                        var item = '<div data-id="'+ v.countyCode +'">'+ v.countyName +'</div>';
                        $(params.scrollItem).eq(areaIndex).children().append(item);
                    });
                }
                // 移动到所处位置
                $(params.scrollItem).eq(areaIndex).css('top', index * -40);
            }
            // 清空列表
            function clearAreaList() {
                $(params.scrollItem).eq(0).children().empty();
                $(params.scrollItem).eq(1).children().empty();
                $(params.scrollItem).eq(2).children().empty();
            }
            // 保存当前显示的地区信息
            function saveareaMsg(index, scrollIndex) {
                // 0 1 2 省 市 区
                if (index === 0) {
                    params.provinceObj.name = $('.area-province-scroll>div').eq(scrollIndex).text();
                    params.provinceObj.code = $('.area-province-scroll>div').eq(scrollIndex).attr('data-id');
                    params.provinceObj.index = scrollIndex;
                } else if (index === 1) {
                    params.cityObj.name = $('.area-city-scroll>div').eq(scrollIndex).text();
                    params.cityObj.code = $('.area-city-scroll>div').eq(scrollIndex).attr('data-id');
                    params.cityObj.index = scrollIndex;
                } else if (index === 2) {
                    params.regionObj.name = $('.area-region-scroll>div').eq(scrollIndex).text();
                    params.regionObj.code = $('.area-region-scroll>div').eq(scrollIndex).attr('data-id');
                    params.regionObj.index = scrollIndex;
                }
            }
            // 设置默认的区域  (这里的下标是 )
            function setAreaOpen(indexPro, indexCity, indexReg) {
                params.defaultArea[0] = indexPro;
                params.defaultArea[1] = indexCity;
                params.defaultArea[2] = indexReg;
            }
            // 弹窗HTML
            function getAreaContent() {
                var html =  '<div class="area-larger-mask" id="areaScrollMask">'+
                            '<div class="area-larger-main">'+
                            '<div class="area-control">'+
                            '<div class="cancel-area-control">取消</div>'+
                            '<div class="title-area-control">选择地区</div>'+
                            '<div class="confirm-area-control">确定</div>'+
                            '</div>'+
                            '<div class="area-main">'+
                            '<div class="area-list-scroll">'+
                            '<div class="area-item">'+
                            '<div class="area-province-scroll">'+
                            '</div>'+
                            '</div>'+
                            '<div class="area-item">'+
                            '<div class="area-city-scroll">'+
                            '</div>'+
                            '</div>'+
                            '<div class="area-item">'+
                            '<div class="area-region-scroll">'+
                            '</div>'+
                            '</div>'+
                            '</div>'+
                            '</div>'+
                            '</div>'+
                            '</div>';
                $('body').append(html);
            }
            // 处理输入框中的区域信息
            function handleAreaInput () {
                var areaNum = params.inpVal.split(params.defaultSplit);
                // 省
                var provinceList = [];
                $('.area-province-scroll>div').each(function () {
                    provinceList.push($(this).text());
                });
                var provinceIndex = provinceList.indexOf(areaNum[0]);
                params.defaultArea[0] = provinceIndex;
                $(params.scrollItem).eq(0).css('top', provinceIndex * -40);
                // 市
                var cityList = [];
                params.cityList = params.areaData[provinceIndex].areaVOList;
                for (var i = 0; i < params.cityList.length; i++) {
                    cityList.push(params.cityList[i].cityName);
                }
                var cityIndex = cityList.indexOf(areaNum[1]);
                params.defaultArea[1] = cityIndex;
                initArea(1, provinceIndex, cityIndex);
                // 区
                var regionList = [];
                params.regionList = params.cityList[cityIndex].areaVOList;
                for (var i = 0; i < params.regionList.length; i++) {
                    regionList.push(params.regionList[i].countyName);
                }
                var regionIndex = regionList.indexOf(areaNum[2]);
                params.defaultArea[2] = regionIndex;
                initArea(2, cityIndex, regionIndex);
            }
        });
    }
})(jQuery);
