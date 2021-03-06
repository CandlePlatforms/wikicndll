/*!
 * VisualEditor MediaWiki-specific ContentEditable Document tests.
 *
 * @copyright 2011-2020 VisualEditor Team and others; see http://ve.mit-license.org
 */

QUnit.module( 've.ce.Document (MW)' );

/* Tests */

QUnit.test( 'Converter tests', ( assert ) => {
	const cases = ve.dm.mwExample.domToDataCases;

	for ( const msg in cases ) {
		if ( cases[ msg ].ceHtml ) {
			const caseItem = ve.copy( cases[ msg ] ),
				model = ve.test.utils.getModelFromTestCase( caseItem ),
				view = new ve.ce.Document( model ),
				$documentElement = view.getDocumentNode().$element;
			// Simplify slugs
			$documentElement.find( '.ve-ce-branchNode-slug' ).contents().remove();
			assert.equalDomElement(
				// Wrap both in plain DIVs as we are only comparing the child nodes
				$( '<div>' ).append( $documentElement.contents() )[ 0 ],
				// childNodes is always a NodeList
				// eslint-disable-next-line no-jquery/no-append-html
				$( '<div>' ).append( ve.createDocumentFromHtml( caseItem.ceHtml ).body.childNodes )[ 0 ],
				msg
			);
		}
	}
} );
