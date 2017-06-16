# Changelog

# Changelog
## 4.2.0
- Add Pull Request Template


## 4.1.0
#### Breaking Changes
- Switch over to webpack 2
	- [webpack](https://webpack.js.org/)

## 4.0.1

- Switch images and icons handling from gulp to webpack
	- [file-loader](https://github.com/webpack/file-loader)
	- [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader)
	- [webpack-svgstore-plugin](https://github.com/mrsum/webpack-svgstore-plugin)

```jade
img(src=require('images/profile.jpg'))
```

- Add [responsive images loader](https://github.com/herrstucki/responsive-loader)

```sass
	body
		background: url('~responsive-loader?size=400!images/profile.jpg')
```

- var image = require('responsive-loader?placeholder=true&sizes[]=100,sizes[]=200,sizes[]=900!images/profile.jpg')
div(style={
  'background-image': `url(${image.placeholder})`,
  height: image.height,
  width: image.width,
  'background-size': 'cover'
})
  img(src=image.src, srcset=image.srcSet, sizes='100w,200w,300w')

- Switch html loader to pug loader after the string issue has been [resolved](https://github.com/pugjs/pug-loader/issues/15)
	- [pug-loader](https://github.com/pugjs/pug-loader)

- Add Polyfills file for public path handling during development and production
	- [solution](https://github.com/webpack/style-loader/pull/96#issuecomment-228370602)


## 3.2.0

- Fixes docker build and jspm npm script on package.json to use root dockerfile
- Removes globals from standard config
- Fixes all gsap global imports within all hs-plugins directives

## 4.0.0

- Upgrade to [ng-metadata](https://github.com/ngParty/ng-metadata)
