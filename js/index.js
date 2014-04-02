define( ['jquery', 'bootstrap'], function ( $ ) {

    // HACK Add ID attribute during runtime to anchors
    $( 'a[name]' ).each( function () {
        $( this ).attr( 'id', $( this ).attr( 'name' ) );
    } );

    // Add scrollspy
    $( 'body' )
        .scrollspy( { target: '#sidebar' } )
        .on( 'activate.bs.scrollspy', function() {
            console.log( 'activate scrollspy' );
        } );

    setTimeout( function() {
        $('body').scrollspy( 'refresh' );
    }, 0 );

} );
