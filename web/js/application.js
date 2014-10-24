$(function () {

    var sideBar = $('.docs-sidebar');

    var calcTop = function() {
        var offsetTop      = sideBar.offset().top;
        var sideBarMargin  = parseInt(sideBar.children(0).css('margin-top'), 10);
        var navOuterHeight = sideBar.height();

        return offsetTop - navOuterHeight - sideBarMargin
    };

    var calcBottom = function () {
        return $('footer').outerHeight(true)
    };

    sideBar.affix({
        offset: {
            top: calcTop(),
            bottom: calcBottom()
        }
    });

    $('body').scrollspy({ target: '.nav-index' });

    // Config ZeroClipboard
    ZeroClipboard.config({
        swfPath: '/flash/ZeroClipboard.swf',
        hoverClass: 'btn-clipboard-hover'
    });

    // Insert copy to clipboard button before .highlight or .bs-example
    $('.highlight').each(function () {
        var btnHtml = '<div class="zero-clipboard">' +
            '<span class="btn-clipboard">' +
            'Copy</span></div>';

        $(this).before(btnHtml)
    });

    var zeroClipboard = new ZeroClipboard($('.btn-clipboard'));
    var htmlBridge = $('#global-zeroclipboard-html-bridge');

    // Handlers for ZeroClipboard
    zeroClipboard.on('ready', function () {
        htmlBridge
            .attr('title', copy_to_clipboard)
            .tooltip();

        // Copy to clipboard
        zeroClipboard.on('copy', function (event) {
            var highlight = $(event.target).parent().nextAll('.highlight').first();
            event.clipboardData.setData('text/plain', highlight.text());
        });

        // Notify copy success and reset tooltip title
        zeroClipboard.on('aftercopy', function () {
            htmlBridge
                .attr('title', copied)
                .tooltip('fixTitle')
                .tooltip('show')
                .attr('title', copy_to_clipboard)
                .tooltip('fixTitle')
        });

    });

    zeroClipboard.on( 'error', function() {
        $(".zero-clipboard").destroy();
        ZeroClipboard.destroy();
    } );
});
