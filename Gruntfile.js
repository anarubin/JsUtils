/*global module:false*/
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
        clean: ["dist/**"],
        closurecompiler: {
            dist: {
                files: {
                    // Destination: Sources...
                    "dist/js/redirectMobileSite.min-0.1.js": [
                        'src/js/redirectMobileSite-0.1.js'
                    ],
                    "dist/js/fbCampaign.min-0.1.js": [
                        'src/js/fbCampaign-0.1.js'
                    ],
                    "dist/js/jackpotToto.min-0.1.js": [
                        'src/js/jackpotToto-0.1.js'
                    ],
                    "dist/js/redirectMobileRacing.min-0.1.js": [
                        'src/js/redirectMobileRacing-0.1.js'
                    ],
                    "dist/js/fbCampaignAndRefer.min-0.1.js": [
                        'src/js/fbCampaignAndRefer-0.1.js'
                    ]
                },
                options: {
                    "compilation_level": "WHITESPACE_ONLY"
                }
            }
        },
        htmlrefs: {
            dist: {
                src: 'src/*.html',
                dest: 'dist/',
                options: {buildNumber: 47878}
            }
        },
        shell: {
            backup: {
                command: 'ssh f "rsync -a /var/www/root/docs/js/app/* /home/jboss/backup/$(date +\'%Y-%m-%d_%H-%M\')/"'
            },
            release: {
                command: 'scp -r ./dist/* f:/var/www/root/docs/js/app/'
            },
            release: {
                command: 'git commit -a && git push'
            },
            releaseTest1: {
                command: 'scp -r ./dist/* test1:/var/www/fonbet.index/'
            },
            releaseHtmlTest1: {
                command: 'scp ./src/live-test.html test1:/var/www/fonbet.index/'
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                }
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            lib_test: {
                src: ['src/js/*.js', 'test/*.js']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-closurecompiler');
    grunt.loadNpmTasks('grunt-htmlrefs');

    // Default task.
    grunt.registerTask('dist', ['clean', 'closurecompiler', 'htmlrefs']);
};
