Package.describe({
	name: 'wolas:tap-i18n',
	summary: 'A comprehensive internationalization solution for Meteor',
	version: '1.9.0',
	git: 'https://github.com/wolasss/tap-i18n',
});

const both = ['server', 'client'];
const server = 'server';
const client = 'client';

Package.onUse(function(api) {
	api.versionsFrom('2.2');

	api.use('coffeescript@1.0.17', both);
	api.use('underscore', both);
	api.use('meteor', both);

	api.use('raix:eventemitter@1.0.0', both);
	api.use('meteorspark:util@0.2.0', both);

	api.use('tracker', both);
	api.use('session', client);
	api.use('jquery@3.0.0', client);
	api.use('templating@1.4.0', client);

	api.use('cfs:http-methods@0.0.27', server);

	// load TAPi18n
	api.add_files('lib/globals.js', both);

	// load and init TAPi18next
	api.add_files('lib/tap_i18next/tap_i18next-1.7.3.js', both);
	api.export('TAPi18next');
	api.add_files('lib/tap_i18next/tap_i18next_init.js', both);

	api.add_files('lib/tap_i18n/tap_i18n-helpers.coffee', both);

	// We use the bare option since we need TAPi18n in the package level and
	// coffee adds vars to all (so without bare all vars are in the file level)
	api.add_files('lib/tap_i18n/tap_i18n-common.coffee', server);
	api.add_files('lib/tap_i18n/tap_i18n-common.coffee', client, { bare: true });

	api.add_files('lib/tap_i18n/tap_i18n-server.coffee', server);
	api.add_files('lib/tap_i18n/tap_i18n-client.coffee', client, { bare: true });

	api.add_files('lib/tap_i18n/tap_i18n-init.coffee', server);
	api.add_files('lib/tap_i18n/tap_i18n-init.coffee', client, { bare: true });

	api.export('TAPi18n');
});

Package.registerBuildPlugin({
	name: 'tap-i18n-compiler',
	use: ['coffeescript', 'underscore', 'mdg:validation-error@0.5.1', 'aldeed:simple-schema@1.5.4', 'check@1.3.1', 'templating@1.4.0'],
	npmDependencies: {
		yamljs: '0.3.0',
	},
	sources: [
		'lib/globals.js',

		'lib/plugin/etc/language_names.js',

		'lib/plugin/compiler_configuration.coffee',

		'lib/plugin/helpers/helpers.coffee',
		'lib/plugin/helpers/load_json.coffee',
		'lib/plugin/helpers/load_yml.coffee',
		'lib/plugin/helpers/compile_step_helpers.coffee',

		'lib/plugin/compilers/share.coffee',
		'lib/plugin/compilers/i18n.coffee',
		'lib/plugin/compilers/project-tap.i18n.coffee',
		'lib/plugin/compilers/package-tap.i18n.coffee',
		'lib/plugin/compilers/i18n.generic_compiler.coffee',
		'lib/plugin/compilers/i18n.json.coffee',
		'lib/plugin/compilers/i18n.yml.coffee',
	],
});
