/**
 */
var GelLinkBox = React.createClass( {
    handleClick: function(e) {
        if (this.props.onClick) {
            this.props.onClick.apply(this, [e]);
        }
    },
    
    render: function() {
        var theme = (this.props.theme === false? false : (this.props.theme || 'primary') );
        var label = this.props.label || 'Untitled Link';
        var href = this.props.href || '#';
        var className = [ 'gel-button', 'gel-button__link-button' ];
        var attributes = this.props.attributes || {};
        
        attributes.href = href;
        
        if (theme !== false) {
            className.push( className[ 0 ] + '--' + theme );
        }

        attributes.className = (this.props.className? this.props.className + ' ' : '') + className.join( ' ' );

        var children = [
            React.createElement(
                'span', {
                    className: 'gel-button__content'
                },
                label
            )
        ];

        if ( this.props.icon ) {
            var useTag = {
                __html: '<use xlink:href="assets/icons.svg#gel-icon-' + this.props.icon + '" style: "fill:undefined;" />'
            };
            children.push(
                React.createElement(
                    'span', {
                        className: 'gel-button__icon_wrapper'
                    },
                    React.createElement(
                        'span', {
                            className: 'gel-button__icon--' + this.props.icon
                        },
                        React.createElement(
                            'svg', {
                                className: 'gel-icon gel-icon--text',
                                dangerouslySetInnerHTML: useTag
                            }
                        )
                    )
                )
            );
        }
        
        attributes.onClick = this.handleClick;
        
        return React.createElement.apply(
            null,
            ['a', attributes].concat(children)
        );
    }
} );