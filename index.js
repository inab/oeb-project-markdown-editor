/**
 * Based on a sample from
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// Productivity features require license key to work properly, you can get a trial license key: https://orders.ckeditor.com/trial/premium-features?feature=pagination
const PRODUCTIVITY_PACK_LICENSE_KEY = '';

// Put your Web Spell Checker license key here, for more info how to get the key see [LINK].
const WEB_SPELL_CHECKER_LICENSE_KEY = '';

import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';

import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { Bold, Italic, Code, Strikethrough } from '@ckeditor/ckeditor5-basic-styles';
import { CloudServices } from '@ckeditor/ckeditor5-cloud-services';
import { CodeBlock } from '@ckeditor/ckeditor5-code-block';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { HorizontalLine } from '@ckeditor/ckeditor5-horizontal-line';
import { Image, ImageCaption, ImageInsert, ImageToolbar, ImageUpload } from '@ckeditor/ckeditor5-image';
import { Base64UploadAdapter } from '@ckeditor/ckeditor5-upload';
import { Link, LinkImage } from '@ckeditor/ckeditor5-link';
import { List, TodoList } from '@ckeditor/ckeditor5-list';
import { Markdown } from '@ckeditor/ckeditor5-markdown-gfm';
import { Mention } from '@ckeditor/ckeditor5-mention';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { SourceEditing } from '@ckeditor/ckeditor5-source-editing';
import { SpecialCharacters, SpecialCharactersEssentials } from '@ckeditor/ckeditor5-special-characters';
import { Table, TableToolbar } from '@ckeditor/ckeditor5-table';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
// import WProofreader from '@webspellchecker/wproofreader-ckeditor5/src/wproofreader';
// Productivity Pack features
// import { SlashCommand } from '@ckeditor/ckeditor5-slash-command';

import { ButtonView } from '@ckeditor/ckeditor5-ui';
import checkIcon from '@ckeditor/ckeditor5-core/theme/icons/importexport.svg'
import { Plugin } from '@ckeditor/ckeditor5-core';

import parseDataUrl from 'parse-data-url';


class GenerateJSONEntry extends Plugin {
    init() {
        const editor = this.editor;
        // The button must be registered among the UI components of the editor
        // to be displayed in the toolbar.
        editor.ui.componentFactory.add( 'generate_json_entry', () => {
            // The button will be an instance of ButtonView.
            const button = new ButtonView();

            button.set( {
                label: 'Download updated OEB community entry',
                icon: checkIcon,
                tooltip: true
            } );

		button.on( 'execute', () => {
			try {
				let ce = editor.config.get("community_entry");
				const summary = editor.getData();
				// What it is needed to encode UTF-8 encoded contents in Javascript, sigh...
				const encodedsummary = unescape(encodeURIComponent(summary));
				const bdata = "data:text/plain;base64," + btoa(encodedsummary);
				ce["_metadata"]["project:summary"] = bdata;
				
				const element = document.createElement('a');
				const strce = JSON.stringify(ce, null, 4);
				element.setAttribute('href', 'data:text/plain;base64,' + btoa(unescape(encodeURIComponent(strce))));
				element.setAttribute('download', `community_${ce["_id"]}_${Date.now()}.json`);

				element.style.display = 'none';
				document.body.appendChild(element);

				element.click();

				document.body.removeChild(element);
			} catch(e) {
				console.log(e);
			}
		} );

            return button;
        } );
        console.log( 'THIS was initialized.' );
    }
}




/**
 * Enrich the special characters plugin with emojis.
 */
function SpecialCharactersEmoji(editor) {
	if (!editor.plugins.get('SpecialCharacters')) {
		return;
	}

	// Make sure Emojis are last on the list.
	this.afterInit = function () {
		editor.plugins.get('SpecialCharacters').addItems('Emoji', EMOJIS_ARRAY);
	};
}

const EMOJIS_ARRAY = [
	{ character: '🙈', title: 'See-No-Evil Monkey' },
	{ character: '🙄', title: 'Face With Rolling Eyes' },
	{ character: '🙃', title: 'Upside Down Face' },
	{ character: '🙂', title: 'Slightly Smiling Face' },
	{ character: '😴', title: 'Sleeping Face' },
	{ character: '😳', title: 'Flushed Face' },
	{ character: '😱', title: 'Face Screaming in Fear' },
	{ character: '😭', title: 'Loudly Crying Face' },
	{ character: '😬', title: 'Grimacing Face' },
	{ character: '😩', title: 'Weary Face' },
	{ character: '😢', title: 'Crying Face' },
	{ character: '😡', title: 'Pouting Face' },
	{ character: '😞', title: 'Disappointed Face' },
	{ character: '😜', title: 'Face with Stuck-Out Tongue and Winking Eye' },
	{ character: '😚', title: 'Kissing Face With Closed Eyes' },
	{ character: '😘', title: 'Face Throwing a Kiss' },
	{ character: '😔', title: 'Pensive Face' },
	{ character: '😒', title: 'Unamused Face' },
	{ character: '😑', title: 'Expressionless Face' },
	{ character: '😐', title: 'Neutral Face' },
	{ character: '😏', title: 'Smirking Face' },
	{ character: '😎', title: 'Smiling Face with Sunglasses' },
	{ character: '😍', title: 'Smiling Face with Heart-Eyes' },
	{ character: '😌', title: 'Relieved Face' },
	{ character: '😋', title: 'Face Savoring Delicious Food' },
	{ character: '😊', title: 'Smiling Face with Smiling Eyes' },
	{ character: '😉', title: 'Winking Face' },
	{ character: '😈', title: 'Smiling Face With Horns' },
	{ character: '😇', title: 'Smiling Face with Halo' },
	{
		character: '😆',
		title: 'Smiling Face with Open Mouth and Tightly-Closed Eyes',
	},
	{ character: '😅', title: 'Smiling Face with Open Mouth and Cold Sweat' },
	{ character: '😄', title: 'Smiling Face with Open Mouth and Smiling Eyes' },
	{ character: '😃', title: 'Smiling Face with Open Mouth' },
	{ character: '😂', title: 'Face with Tears of Joy' },
	{ character: '😁', title: 'Grinning Face with Smiling Eyes' },
	{ character: '😀', title: 'Grinning Face' },
	{ character: '🥺', title: 'Pleading Face' },
	{ character: '🥵', title: 'Hot Face' },
	{ character: '🥴', title: 'Woozy Face' },
	{ character: '🥳', title: 'Partying Face' },
	{ character: '🥰', title: 'Smiling Face with Hearts' },
	{ character: '🤭', title: 'Face with Hand Over Mouth' },
	{ character: '🤪', title: 'Zany Face' },
	{ character: '🤩', title: 'Grinning Face with Star Eyes' },
	{ character: '🤦', title: 'Face Palm' },
	{ character: '🤤', title: 'Drooling Face' },
	{ character: '🤣', title: 'Rolling on the Floor Laughing' },
	{ character: '🤔', title: 'Thinking Face' },
	{ character: '🤞', title: 'Crossed Fingers' },
	{ character: '🙏', title: 'Person with Folded Hands' },
	{ character: '🙌', title: 'Person Raising Both Hands in Celebration' },
	{ character: '🙋', title: 'Happy Person Raising One Hand' },
	{ character: '🤷', title: 'Shrug' },
	{ character: '🤗', title: 'Hugging Face' },
	{ character: '🖤', title: 'Black Heart' },
	{ character: '🔥', title: 'Fire' },
	{ character: '💰', title: 'Money Bag' },
	{ character: '💯', title: 'Hundred Points Symbol' },
	{ character: '💪', title: 'Flexed Biceps' },
	{ character: '💩', title: 'Pile of Poo' },
	{ character: '💥', title: 'Collision' },
	{ character: '💞', title: 'Revolving Hearts' },
	{ character: '💜', title: 'Purple Heart' },
	{ character: '💚', title: 'Green Heart' },
	{ character: '💙', title: 'Blue Heart' },
	{ character: '💗', title: 'Growing Heart' },
	{ character: '💖', title: 'Sparkling Heart' },
	{ character: '💕', title: 'Two Hearts' },
	{ character: '💔', title: 'Broken Heart' },
	{ character: '💓', title: 'Beating Heart' },
	{ character: '💐', title: 'Bouquet' },
	{ character: '💋', title: 'Kiss Mark' },
	{ character: '💀', title: 'Skull' },
	{ character: '👑', title: 'Crown' },
	{ character: '👏', title: 'Clapping Hands Sign' },
	{ character: '👍', title: 'Thumbs Up Sign' },
	{ character: '👌', title: 'OK Hand Sign' },
	{ character: '👉', title: 'Backhand Index Pointing Right' },
	{ character: '👈', title: 'Backhand Index Pointing Left' },
	{ character: '👇', title: 'Backhand Index Pointing Down' },
	{ character: '👀', title: 'Eyes' },
	{ character: '🎶', title: 'Multiple Musical Notes' },
	{ character: '🎊', title: 'Confetti Ball' },
	{ character: '🎉', title: 'Party Popper' },
	{ character: '🎈', title: 'Balloon' },
	{ character: '🎂', title: 'Birthday Cake' },
	{ character: '🎁', title: 'Wrapped Gift' },
	{ character: '🌹', title: 'Rose' },
	{ character: '🌸', title: 'Cherry Blossom' },
	{ character: '🌞', title: 'Sun with Face' },
	{ character: '❤️', title: 'Red Heart' },
	{ character: '❣️', title: 'Heavy Heart Exclamation Mark Ornament' },
	{ character: '✨', title: 'Sparkles' },
	{ character: '✌️', title: 'Victory Hand' },
	{ character: '✅', title: 'Check Mark Button' },
	{ character: '♥️', title: 'Heart Suit' },
	{ character: '☺️', title: 'Smiling Face' },
	{ character: '☹️', title: 'Frowning Face' },
	{ character: '☀️', title: 'Sun' },
];

window.addEventListener("load", async (event) => {
	const urlParams = new URLSearchParams(window.location.search);
	const community_id = urlParams.has('community_id') ? urlParams.get('community_id') : "OEBC009";
	const h2 = document.createElement('h2');
	h2.appendChild(document.createTextNode(`(editing community ${community_id})`));
	document.getElementById("header-wrapper").appendChild(h2);
	const response = await fetch("https://openebench.bsc.es/api/scientific/staged/Community/" + encodeURIComponent(community_id));
	let community_entry = await response.json();
	
	
	// console.log(community_entry["_metadata"]["project:summary"]);
	
	let summary = "";
	if("_metadata" in community_entry) {
		let _metadata = community_entry["_metadata"];
		if("project:summary" in _metadata) {
			const parsed = parseDataUrl(community_entry["_metadata"]["project:summary"]); 
			// What it is needed to decode UTF-8 encoded contents in Javascript, sigh...
			summary = parsed.base64 ? decodeURIComponent(escape(atob(parsed.data))) : parsed.data;
		} else {
			_metadata["project:summary"] = summary;
			_metadata["project_spaces"] = true;
		}
	} else {
		community_entry["_metadata"] = {
			"project:summary": summary,
			"project_spaces": true,
		};
	}

	const elem = document.createElement("div");
	document.getElementById("editor-wrapper").appendChild(elem);

	const editor = await ClassicEditor.create(elem, {
		initialData: summary,
		community_entry: community_entry,
		plugins: [
			//Autoformat,
			BlockQuote,
			Bold,
			CloudServices,
			Code,
			CodeBlock,
			Essentials,
			Heading,
			HorizontalLine,
			Image,
			ImageCaption,
			ImageInsert,
			ImageToolbar,
			ImageUpload,
			Base64UploadAdapter,
			Italic,
			Link,
			LinkImage,
			List,
			Markdown,
			Mention,
			Paragraph,
			SourceEditing,
			SpecialCharacters,
			SpecialCharactersEmoji,
			SpecialCharactersEssentials,
			Strikethrough,
			Table,
			TableToolbar,
			TextTransformation,
			TodoList,
			// WProofreader,
			// SlashCommand,
			GenerateJSONEntry,
		],
		licenseKey: PRODUCTIVITY_PACK_LICENSE_KEY,
		language: 'en',
		toolbar: {
			items: [
				'undo',
				'redo',
				'|',
				'sourceEditing',
				'generate_json_entry',
				'|',
				/*
				'wproofreader',
				'|',
				*/
				'heading',
				'|',
				'bold',
				'italic',
				'strikethrough',
				'code',
				'|',
				'bulletedList',
				'numberedList',
				'todoList',
				'|',
				'link',
				'insertImage',
				'insertTable',
				'blockQuote',
				'codeBlock',
				'horizontalLine',
				'specialCharacters',
			],
		},
		codeBlock: {
			languages: [
				{ language: 'css', label: 'CSS' },
				{ language: 'html', label: 'HTML' },
				{ language: 'javascript', label: 'JavaScript' },
				{ language: 'php', label: 'PHP' },
			],
		},
		heading: {
			options: [
				{ model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
				{
					model: 'heading1',
					view: 'h1',
					title: 'Heading 1',
					class: 'ck-heading_heading1',
				},
				{
					model: 'heading2',
					view: 'h2',
					title: 'Heading 2',
					class: 'ck-heading_heading2',
				},
				{
					model: 'heading3',
					view: 'h3',
					title: 'Heading 3',
					class: 'ck-heading_heading3',
				},
				{
					model: 'heading4',
					view: 'h4',
					title: 'Heading 4',
					class: 'ck-heading_heading4',
				},
				{
					model: 'heading5',
					view: 'h5',
					title: 'Heading 5',
					class: 'ck-heading_heading5',
				},
				{
					model: 'heading6',
					view: 'h6',
					title: 'Heading 6',
					class: 'ck-heading_heading6',
				},
			],
		},
		image: {
			toolbar: [
				'imageStyle:block',
				'imageStyle:side',
				'|',
				'toggleImageCaption',
				'imageTextAlternative',
				'|',
				'linkImage'
			],
			insert: {
				integrations: [ 'upload', 'assetManager', 'url' ],
				type: "auto"
			}
		},
		table: {
			contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
		},
		wproofreader: {
			serviceId: WEB_SPELL_CHECKER_LICENSE_KEY,
			lang: 'auto',
			srcUrl:
				'https://svc.webspellchecker.net/spellcheck31/wscbundle/wscbundle.js',
			autoStartup: false,
			ignoreClasses: ['image-inline'],
		},
	});
		// })
		// .catch((error) => {
		// 	console.error(error.stack);
		// });
});
