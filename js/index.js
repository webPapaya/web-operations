define(['jquery', 'bootstrap'], function($) {

    // HACK Add ID attribute during runtime to anchors
    $( 'a[name]').each(function() {
        $(this).attr('id', $(this).attr('name'));
    });

});
