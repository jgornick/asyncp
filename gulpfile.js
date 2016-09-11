const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');
const bump = require('gulp-bump');
const spawn = require('child_process').spawn;
const git = require('gulp-git-streamed');

gulp.task('tag:release', function(done) {
    var pkg = require('./package.json');
    var message = `Release ${pkg.version}`;

    return gulp.src('./')
        .pipe(git.add({ args: '-u' }))
        .pipe(git.commit(message))
        .pipe(git.tag(pkg.version, message))
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
        gulp.src('./package.json')
            .pipe(bump({ type: version }))
            .pipe(gulp.dest('./'));
    });

    gulp.task(`release:${version}`, [`bump:${version}`, 'tag:release', 'npm:publish']);
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

gulp.task('bump', ['bump:patch']);
gulp.task('release', ['build:dist', 'release:patch']);
gulp.task('default', ['build:dist']);
