/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
    // config.uiColor = '#AADC6E';
    config.toolbarGroups = [
       { name: 'clipboard', groups: ['clipboard', 'undo'] },
       { name: 'editing', groups: ['find', 'selection', 'spellchecker'] },
       { name: 'links' },
       { name: 'insert' },  
      
       { name: 'document', groups: ['mode', 'document', 'doctools'] },
       { name: 'others' },
       '/',
       { name: 'basicstyles',items: [ 'Bold', 'Italic' ]},
       { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi'] }, 
     
       { name: 'about' }
    ];


    // Remove some buttons provided by the standard plugins, which are
    // not needed in the Standard(s) toolbar.
    config.removeButtons = 'Underline,Subscript,Superscript';

    // Set the most common block elements.
    config.format_tags = 'p;h1;h2;h3;pre';

    // Simplify the dialog windows.
    config.removeDialogTabs = 'image:advanced;link:advanced';

    //config.contentsCss = 'http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css';
    //config.contentsCss = 'ckeditor/bootstrap.css';
    config.contentsCss = ['/amex/ckeditor/contents.css', '/amex/stylesheets/custom.css'];
    //config.contentsCss = '/secure.bscbenefitsconnect.com/css/custom.css';
    //config.stylesSet = [];

};
