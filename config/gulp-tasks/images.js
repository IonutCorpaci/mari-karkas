import webp from "gulp-webp";
import imagemin from "gulp-imagemin";
import imageminJpegtran from "imagemin-jpegtran";
import imageminPngquant from "imagemin-pngquant";

export const WebP = () => {
	return app.gulp.src(app.path.src.images, { encoding: false })
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "IMAGES",
				message: "Error: <%= error.message %>"
			}))
		)
		.pipe(app.plugins.newer(app.path.build.images))
		.pipe(
			app.plugins.if(
				app.isWebP,
				webp()
			)
		)
		.pipe(
			app.plugins.if(
				app.isWebP,
				app.gulp.dest(app.path.build.images)
			)
		)
}
export const imagesOptimize = () => {
	return app.gulp.src(app.path.src.images, { encoding: false })
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "IMAGES",
				message: "Error: <%= error.message %>"
			}))
		)
		.pipe(app.plugins.newer(app.path.build.images))
    .pipe(imagemin([
      imageminJpegtran({ progressive: true }),   // вместо mozjpeg
      imageminPngquant({ quality: [0.6, 0.8] })
    ]))
		.pipe(app.gulp.dest(app.path.build.images))
}
export const copySvg = () => {
	return app.gulp.src(app.path.src.svg)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "IMAGES",
				message: "Error: <%= error.message %>"
			}))
		)
		.pipe(app.plugins.newer(app.path.build.images))
		.pipe(app.gulp.dest(app.path.build.images));
}