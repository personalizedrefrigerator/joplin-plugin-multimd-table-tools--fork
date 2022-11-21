import joplin from 'api';
import { SettingItemType } from 'api/types';

/**
 * Returns all settings the user can/has set.
*/
export async function getSettings() {
	return {
		"selectedFormat": await joplin.settings.value('tableToolsSelectedFormat'),
		"useMarkdownItExtension": await joplin.settings.value('tableToolsUseMarkdownItExtension')
	}
}

/**
 * Register this plugin's settings to Joplin.
 */
export async function registerAllSettings() {
	const section = 'MultiMarkdownTableToolsSettings';

	await joplin.settings.registerSection(section, {
		label: 'MultiMarkdown Table Tools',
		description: 'You can configure the behavior of the "MultiMarkdown Table Tools" plugin here.',
		iconName: 'fas fa-table'
	});

	await joplin.settings.registerSettings({
		['tableToolsSelectedFormat']: { 
			public: true,
			section: section,
			type: SettingItemType.String,
			isEnum: true,
			value: 'multimd',
			label: 'Table format',
			description: 'If you don\'t care about MultiMarkdown, you can enable/disable MultiMarkdown table support here.',
			options: {
				'multimd': 'MultiMarkdown (default)',
				'gfm': 'GitHub Flavored Markdown'
			},
		},
		['tableToolsUseMarkdownItExtension']: {
			advanced: true,
			public: true,
			section: section,
			type: SettingItemType.Bool,
			value: false,
			label: 'Use forked MultiMarkdown table extension',
			description: 'Forked from "markdown-it-multimd-table" version 4.2.0 by redbug312. The fork adds caption-side CSS. ⚠ Please disable the built-in MultiMarkdown table extension before enabling this. Also you may need to restart Joplin for this option to take effect.',
		},
	});
}