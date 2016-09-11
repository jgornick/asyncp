'use strict';

require('babel-core/register');

const path = require('path');
const spawn = require('child_process').spawn;

const babel = require('gulp-babel');
const bump = require('gulp-bump');
const coveralls = require('gulp-coveralls');
const del = require('del');
const eslint = require('gulp-eslint');
const git = require('gulp-git-streamed');
const gulp = require('gulp');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');
const plumber = require('gulp-plumber');
const runSequence = require('run-sequence');
const isparta = require('isparta');

gulp.task('tag:release', function(done) {
    var pkg = require('./package.json');
    var message = `Release ${pkg.version}`;

    return gulp.src('./')
        .pipe(git.add({ args: '-u' }))
        .pipe(git.commit(message))
        .pipe(git.tag(pkg.version, message, { args: '--force' }))
        .pipe(git.push('origin', 'master', { args: '--tags' }))
        .pipe(gulp.dest('./'));
});

gulp.task('clean:tar', function() {
    return del([ '/tmp/asyncp.tar.gz' ], { force: true });
});

gulp.task('tar:dist', ['clean:tar'], function(done) {
    let tar = spawn(
        'tar',
        [
            '--exclude=".DS_*"',
            '-czvf', '/tmp/asyncp.tar.gz',
            './package.json',
            './README.md',
            './LICENSE',
            '-C', './dist', '.'
        ],
        {
            stdio: 'inherit',
            env: {
                COPYFILE_DISABLE: 1
            }
        }
    );

    tar.on('close', function(code) {
        if (code != 0) {
            return done(new Error(`Received code ${code} from tar command.`));
        }

        done();
    });
});

gulp.task('npm:publish', ['tar:dist'], function(done) {
    let npm = spawn(
        'npm',
        [
            'publish',
            '/tmp/asyncp.tar.gz'
        ],
        {
            stdio: 'inherit'
        }
    );

    npm.on('close', function(code) {
        if (code != 0) {
            return done(new Error(`Received code ${code} from npm publish.`));
        }

        done();
    });
});

['major', 'minor', 'patch'].forEach(function(version) {
    gulp.task(`bump:${version}`, function() {
        return gulp.src('./package.json')
            .pipe(bump({ type: version }))
            .pipe(gulp.dest('./'));
    });

    gulp.task(`release:${version}`, function(done) {
        runSequence(
            `bump:${version}`,
            'tag:release',
            'npm:publish',
            done
        );
    });
});

gulp.task('clean:dist', function() {
    return del([
        'dist/**/*'
    ]);
});

gulp.task('build:dist', ['clean:dist'], function () {
    return gulp.src('src/*.js')
        .pipe(babel({
            presets: ['es2015'],
            plugins: [
                'add-module-exports'
            ]
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('lint', function() {
    return gulp.src([
        'src/**/*.js'
    ])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('test:pre', ['lint'], function() {
    return gulp.src([
        'src/**/*.js'
    ])
        .pipe(istanbul({
            instrumenter: isparta.Instrumenter,
            includeUntested: true
        }))
        .pipe(istanbul.hookRequire());
});

gulp.task('test', ['test:pre'], function(done) {
    let mochaError;

    gulp.src('test/**/*.js')
        .pipe(plumber())
        .pipe(mocha({ reporter: 'spec', timeout: 3000 }))
        .on('error', function(error) {
            mochaError = error;
        })
        .pipe(istanbul.writeReports())
        .on('end', function() {
            done(mochaError);
        });
});

gulp.task('coveralls', ['test'], function() {
    if (!process.env.CI) {
        return;
    }

    return gulp.src(path.join(__dirname, 'coverage/lcov.info'))
        .pipe(coveralls());
});

gulp.task('bump', ['bump:patch']);
gulp.task('release', function(done) {
    runSequence('build:dist', 'release:patch', done);
});
gulp.task('default', ['build:dist']);
