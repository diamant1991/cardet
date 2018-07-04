/**
 * @author   Artem Chervinchuk <artem.chervinchuk@gmail.com>
 * @Link    http://nextweb.ua
 */
var get_more_posts;

(function ($) {
    $(function () {
        $('.tags:not(.inner) a').each(function () {
            $(this).click(function (e) {
                e.preventDefault();
                if ($(this).hasClass('selected')) {
                    return false;
                }
                $('.tags a').removeClass('selected');
                $(this).addClass('selected');
                var _self = $(this);

                setLocation($(this).attr('href'));

                $('#ajax-posts').addClass('busy');

                $.get(decodeURI(_self.attr('href')), {ajax: 1}, function (response) {
                    $('#ajax-posts').html('');
                    $('#ajax-posts').removeClass('busy');
                    $('#ajax-posts').append(response);
                    $('#ajax-posts').find('.more-posts').first().click(get_more_posts);

                    $('#ajax-posts').find('img').each(function () {
                       $(this).load(function () {
                           $(window).trigger('equalHeights.fire');
                           $(window).trigger('fixHeights.fire');
                           $(window).trigger('ajax.change');
                       }) ;
                    });

                    if (_self.attr('href') !== window.wp_data.home_url) {
                        $('.logo-inline').wrap('<a href="' + window.wp_data.home_url + '" class="simple"></a>');
                    } else {
                        if ($('.logo-inline').parent().is('a')) {
                            $('.logo-inline').unwrap();
                        }
                    }

                    $('html, body').animate({scrollTop: $('#ajax-posts').offset().top - $(window).height() + 480}, 700);
                    $(window).trigger('equalHeights.fire');
                    $(window).trigger('fixHeights.fire');
                    $(window).trigger('ajax.change');
                });

            });
        });
    });

    var setLocation = function (curLoc) {
        try {
            history.pushState(null, null, curLoc);
            return;
        } catch (e) {
        }
        location.hash = '#' + curLoc;
    };

    var get_more_posts = function (e) {

        var _self = $('#ajax-posts__field');

        if ($('#ajax-posts__field').hasClass('loading') || parseInt($('#ajax-posts__field').attr('data-count')) == -1)
            return false;

        if ($('#ajax-loader').length) {
            $('#ajax-loader').slideDown(300);
        }

        $('#ajax-posts__field').addClass('loading');

        var _action = 'get_posts';
        var _tag = $('#ajax-posts__field').attr('data-tag') ? $('#ajax-posts__field').attr('data-tag') : '';
        var _count = $('#ajax-posts__field').attr('data-count');

        $.post(
            window.wp_data.ajax_url,
            {
                action: _action,
                offset: _count,
                tag: _tag
            },
            function (json) {


                $('#ajax-posts__field').attr('data-count', json.offset);

                for (var i = 0; i < json.chunks.length; i++) {
                    $('#ajax-posts__field').append(json.chunks[i]);
                }

                $(window).trigger('equalHeights.fire');
                $(window).trigger('fixHeights.fire');

                $('#ajax-posts__field').removeClass('loading');

                if ($('#ajax-loader').length) {
                    $('#ajax-loader').slideUp(300);
                }
            },
            'json'
        )
    };

    $(window).on('scroll', function () {
        if ($(window).scrollTop() + $(window).height() >= $(document).height() - 600) {
            get_more_posts();
        }
    })
})(jQuery);