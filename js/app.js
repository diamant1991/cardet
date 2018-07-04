/**
 * @author   Artem Chervinchuk <artem.chervinchuk@gmail.com>
 * @Link    http://nextweb.ua
 */
(function ($) {

    $(function () {

        if (/tag/i.test(document.referrer)) {
            $('.page-head__back a').attr('href', document.referrer);
            $('.page-head__back a').click(function (e) {
                e.preventDefault();
                window.history.back();
            });
        } else {
            $('.page-head__back a').attr('href', window.wp_data.home_url + '/');
        }

        $('.show-block').click(function (e) {
            e.preventDefault();
            $(this).toggleClass('opened');
            $($(this).attr('href')).slideToggle();
        });

        $('.switch-block').click(function (e) {
            e.preventDefault();
            $(this).toggleClass('opened');
            if ($(this).hasClass('opened')) {
                var _i = 2;
            } else {
                var _i = 1;
            }
            $($(this).attr('href')).animate({height: $('.tags-switch-' + _i).outerHeight()}, 500).toggleClass('opened');
        });
        /**
         * Modals
         */
        $('.popup-form__close').click(function () {
            $(this).parents('.popup-form').removeClass('opened');
            $('#popup').removeClass('opened');
            $('body').removeClass('over fixed');
        });

        $('#popup').click(function () {
            $('.popup-form').removeClass('opened');
            $('#popup').removeClass('opened');
            $('body').removeClass('over fixed');
        });

        $('.show-form').click(function (e) {
            e.preventDefault();
            $('.popup-form').addClass('opened');
            $('#popup').addClass('opened');

            _target = $(this).attr('href');

            if ($(window).width() < 768) {
                var _top = '50%';
            } else {
                var _top = $(this).offset().top + $(this).outerHeight() + 10;
            }
            $(_target)
                .css({
                    top: _top,
                    right: $(window).width() - ($(this).offset().left + $(this).outerWidth())
                })
                .addClass('opened');
            $('body').addClass('over fixed');
        });

        jQuery(document).bind('gform_confirmation_loaded', function (event, formId) {
            setTimeout(function () {
                $('.popup-form').removeClass('opened');
                $('#popup').removeClass('opened');
                $('body').removeClass('over fixed');
                var gwrf = window.gwrf_3;
                if (typeof gwrf != 'undefined') {
                    gwrf.reloadForm();
                }
            }, 3000)
        });

        /**
         * Customize select
         */
        $('select').each(function () {
            $(this).dropdown({
                maxSelections: 3,
                allowReselection: true
            })
        });

        /*$('.scrollto').click(function (e) {
            e.preventDefault();
            $('html, body').animate({scrollTop: $($(this).attr('href')).offset().top - $('.header').height()}, 700);
            if ($(this).closest('.navigation') && $(window).width() < 1024) {
                $('.m-menu').removeClass('active');
                $('.navigation-mob').removeClass('opened');
            }
        });*/

        $('.show-content').click(function (e) {
            e.preventDefault();
            $(this).toggleClass('active');
            $($(this).attr('href')).slideToggle(300);
        });

        $('.menu-btn').click(function () {
            $(this).toggleClass('active');
            if ($(this).hasClass('active')) {
                $('body').addClass('over');
            } else {
                $('body').removeClass('over');
            }

            $('.navigation').toggleClass('opened');
        });

        /**
         * Accordion
         */
        $('.accordion').each(function () {
            $(this).elAccordion();
        });

        $('.blog-list').equalHeight({
            selector: '.post-block, .post-event, .blog-block',
            byRow: false,
            excludeClasses: 'sticked',
            mobile: true
        });

        $('.eq-height').equalHeight({
            selector: '.post-block',
            byRow: false,
            mobile: true
        });

        $('.gallery').each(function () {
            $(this).find()
        });

        window.startChange = false;
        window.slickIsDragging = false;

        $('.post-slider').slick({
            asNavFor: '.post-slider__thumbs',
            prevArrow: '<div class="slick-arrow icon-arrow-lf prev"></div>',
            nextArrow: '<div class="slick-arrow icon-arrow-rf next"></div>',
            infinite: false
        }).on('mousedown', function () {
            window.slickIsDragging = true;
        }).on('mousemove', function () {
            if (window.slickIsDragging) {
                window.startChange = true;
            }

        }).on('mouseup', function () {
            window.slickIsDragging = false;
            //РџСЂРµРґРѕС‚РІСЂР°С‰РµРЅРёРµ РѕС‚РєСЂС‹С‚РёСЏ РјРѕРґР°Р»СЊРЅРѕРіРѕ РѕРєРЅР°.
            setTimeout(function () {
                window.startChange = false;
            }, 10);
        });

        $('.post-slider__thumbs').slick({
            asNavFor: '.post-slider',
            focusOnSelect: true,
            arrows: false,
            slidesToShow: 15,
            centerMode: false,
            infinite: false,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 10
                    }
                },
                {
                    breakpoint: 568,
                    settings: {
                        slidesToShow: 5
                    }
                }
            ]
        });

        /*$('.scroll-to').click(function (e) {
            e.preventDefault();
            finalScroll = $($(this).attr('href')).offset().top;

            $('html, body').animate({scrollTop: finalScroll});
        });*/

        /*$('#up-btn').click(function (e) {
            e.preventDefault();

            $('html, body').animate({scrollTop: 0});
        });*/

        /**
         * Ajax
         */
        $('.more-posts').click(get_more_posts);

        /**
         * Select tag
         */
        $('.chose-tag').on('change', function () {
            window.location.href = $('option:selected', this).val();
        });

        /**
         * LightGallery
         */
        $('.menu-gallery').each(function () {
            $(this).lightGallery({
                selector: 'a'
            });
        });
        $('.light-gallery').each(function () {
            $(this).lightGallery({
                selector: 'a'
            });
        });

        $('#up-btn').click(function () {
            $('html, body').animate({scrollTop: 0}, 700);
        });

        /**
         * Click out of blocks
         */
        $(document).on('mouseup', function (e) {

        });

        /**
         * Window OnLoad functions
         */
        $(window).on('load', function () {


            window.screenSizeFix = {
                width: $(window).width(),
                height: $(window).height()
            };

            scrollWindow();

            resizeWindow();
            /**
             * Р—Р°РїСѓСЃРєР°РµРј AOS
             */
            wow = new WOW(
                {
                    animateClass: 'animated',
                    offset: 100,
                    mobile: false
                }
            );
            wow.init();

        });

        /**
         * Window Resize functions
         */
        $(window).resize(function () {
            resizeWindow();
        });

        /**
         * Window Scroll functions
         */
        $(window).scroll(function () {
            scrollWindow()
        });

    });

    /**
     * Window resize
     */
    function resizeWindow() {

        toggleSlider();

        /*if ($('.header').hasClass('inner')) {
            $('body').css({
                paddingTop: $('.header').outerHeight()
            })
        }*/

        var notes = $('.note');

        if ($(window).width() > 1024) {
            notes.each(function (ids) {
                console.log(ids);
                if ($(this).hasClass('after-p')) {
                    if ($(this).parent().is('p') || $(this).parent().is('h1') || $(this).parent().is('h2') || $(this).parent().is('h3')) {
                        if ($(this).parent().prev().length) {
                            var _position = $(this).parent().prev().position().top + 3;
                        } else {
                            var _position = $(this).position().top;
                        }
                    } else {
                        if ($(this).prev().length) {
                            var _position = $(this).prev().position().top + 3;
                        } else {
                            var _position = $(this).position().top;
                        }
                    }
                } else {
                    var _position = $(this).position().top;
                }
                if ($('#' + $(this).attr('data-note')).length) {
                    $('#' + $(this).attr('data-note')).css({top: _position});
                }
            });

            for (var i = 0; i < notes.length - 1; i++) {
                var _current = $('#' + $(notes[i]).attr('data-note'));
                var _target = $('#' + $(notes[i + 1]).attr('data-note'));

                if (_current.length && _target.length) {

                    if (_current.position().top + _current.outerHeight() + 10 > _target.position().top) {
                        _target.css({
                            top: _current.position().top + _current.outerHeight() + 10
                        });
                    }
                }
            }
            //404 footer
            if ($('.footer-fix').length) {
                $('body').css({paddingBottom: $('.footer-fix').outerHeight()});
            }
        } else {
            //404 footer
            if ($('.footer-fix').length) {
                $('body').css({paddingBottom: 0});
            }
        }
    }

    /**
     * Window scroll
     */
    function scrollWindow() {
        if ($(window).scrollTop() > $(window).height()) {
            $('#up-btn').addClass('show');
        } else {
            $('#up-btn').removeClass('show');
        }
    }

    /** Functions **/

    $.fn.elTabs = function () {
        var _self = $(this);
        _self.$headers = _self.find('.tabs-headers > a');
        _self.currentItem = 0;

        _self.$headers.eq(0).addClass("current");
        $(_self.$headers.eq(0).attr('href')).show();

        _self.$headers.each(function () {
            $(this).click(function (e) {
                e.preventDefault();
                _old = _self.currentItem;
                _self.currentItem = _self.$headers.index($(this));


                $(_self.$headers.eq(_old).attr('href')).fadeOut(300, function () {
                    $(_self.$headers.eq(_self.currentItem).attr('href')).fadeIn(300);
                });

                $(this).addClass('current');
                _self.$headers.eq(_old).removeClass("current");
            });
        });
    };

    $.fn.fixHeight = function (options) {
        _default = {
            selector: '.fix-height',
            mobile: false,
            mobileBreakPoint: 1024
        };

        var settings = $.extend({}, _default, options);
        var _self = $(this);

        function doFixHeight() {
            _self.find(settings.selector).each(function () {
                if ($(window).width() > settings.mobileBreakPoint || settings.mobile) {
                    $(this).css({height: $(this).outerHeight()});
                } else {
                    $(this).css({height: 'auto'});
                }
            });
        }

        function clearHeight() {
            _self.find(settings.selector).each(function () {
                $(this).css({height: ''});
            });
        }

        doFixHeight();


        $(window).on('fixHeights.fire', function () {
            clearHeight();
            doFixHeight();
        });

        $(window).on('resize', function () {
            if ($(window).width() === window.screenSizeFix.width)
                return false;
            clearHeight();
            doFixHeight();
        });

    };

    $.fn.equalHeight = function (options) {
        _default = {
            selector: '.fix-height',
            mobile: false,
            mobileBreakPoint: 1024,
            byRow: true,
            excludeClasses: ''
        };


        var settings = $.extend({}, _default, options);
        var _self = $(this);

        function eqHeight() {
            var _lastHegiht = 0;
            var _lastTop = 0;
            var _row = [];
            _self.find(settings.selector).each(function () {
                if (!$(this).hasClass(settings.excludeClasses)) {

                    if ($(window).width() > settings.mobileBreakPoint || settings.mobile) {
                        if (_lastTop == 0)
                            _lastTop = $(this).offset().top;

                        if (_lastTop == $(this).offset().top || !settings.byRow) {
                            if ($(this).outerHeight() > _lastHegiht) {
                                _lastHegiht = $(this).outerHeight();
                            }

                            _row.push($(this));
                        } else {
                            if (_row.length) {
                                for (i = 0; i < _row.length; i++) {
                                    _row[i].css({height: _lastHegiht});
                                }

                                _lastHegiht = $(this).outerHeight();
                                _row = [];
                                _lastTop = $(this).offset().top;
                            }

                            _row.push($(this));
                        }

                    } else {
                        $(this).css({height: ''});
                    }

                    if (_row.length && !settings.byRow) {
                        for (i = 0; i < _row.length; i++) {
                            _row[i].css({height: _lastHegiht});
                        }
                    }
                }
            });
        }

        function clearHeight() {
            _self.find(settings.selector).each(function () {
                $(this).css({height: ''});
            })
        }

        $(window).on('load', function () {
            eqHeight();
        });

        $(window).on('equalHeights.fire', function () {
            clearHeight();
            eqHeight();
        });

        $(window).on('resize', function () {
            if ($(window).width() === window.screenSizeFix.width)
                return false;
            clearHeight();
            eqHeight();
        });

    };


    $.fn.elAccordion = function () {
        var _self = $(this);
        _self.find('.accordion-tab__title').each(function () {
            $(this).click(function () {
                if (!$(this).parent().hasClass('opened')) {
                    old = _self.find('.opened').first();
                    if (old) {
                        old.removeClass('opened');
                        old.find('.accordion-tab__content').first().slideUp(300);
                    }
                }
                $(this).parent().toggleClass('opened');
                $(this).parent().find('.accordion-tab__content').first().slideToggle(300);
            })
        })
    };

    var toggleSlider = function () {
        if ($(window).width() < 768) {
            if (!$('.mob-slider').hasClass('slick-slider'))
                $('.mob-slider').slick({
                    arrows: false,
                    infinity: true,
                    dots: true,
                    slidesToShow: 2,
                    responsive: [
                        {
                            breakpoint: 568,
                            settings: {
                                slidesToShow: 1
                            }
                        }
                    ]
                });
        } else {
            if ($('.mob-slider').hasClass('slick-slider'))
                $('.mob-slider').slick("unslick");
        }
    };


})(jQuery);
