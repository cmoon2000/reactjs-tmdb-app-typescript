Run:
cmd1: gulp watch
cmd2: tsc -w

This is I follow Github __SKempin__'s sourcecode to build a tmdb-movie-search[Build react-tmdp-app ](https://github.com/SKempin/reactjs-tmdb-app)
And I have being learned Typescript. So I'm on the way to use __react-tmdp-app__ with typescript 🍹 + 🍕 = 😄 

# Bugs / Tricks

1. **Resolved** Từ app/index.html
   <script src="bower_components/jquery/dist/jquery.js"></script>
   <script src="bower_components/typeahead.js/dist/typeahead.bundle.min.js"></script>

   Tới dist/index.html
   <script src="scripts/fuckvendor.js"></script>

a. Reason: Trong app/index.html ở dòng scripts đó có

```html
   <!-- build:js(app/..) scripts/vendor.js -->
   <!-- endbuild -->
```

2. **Resolved** Lỗi compile typescript:

```terminal
node_modules/@types/whatwg-fetch/index.d.ts(24,16): error TS2304: Cannot find name 'IterableIterator'.
node_modules/@types/whatwg-fetch/index.d.ts(26,13): error TS2304: Cannot find name 'IterableIterator'.
node_modules/@types/whatwg-fetch/index.d.ts(27,15): error TS2304: Cannot find name 'IterableIterator'.
node_modules/@types/whatwg-fetch/index.d.ts(28,6): error TS2304: Cannot find name 'Symbol'.
node_modules/@types/whatwg-fetch/index.d.ts(28,26): error TS2304: Cannot find name 'IterableIterator'.
node_modules/@types/whatwg-streams/index.d.ts(52,21): error TS2304: Cannot find name 'IteratorResult'.
node_modules/@types/whatwg-streams/index.d.ts(62,42): error TS2304: Cannot find name 'IteratorResult'.
```

a. Reason: Thư viện sử dụng `Promise` là tính năng có trong ES6. Nên ta ko thể để trong file tsconfig.json target: "es5"

b. Solution:
- Xóa package @types/es6-promise vì Typescript đã hỗ trợ với `"lib": "es6"` trong tsconfig.json, ko để duplicate Promise

```terminal
npm remove --save-dev @types/es6-promise
```

// Trong tsconfig.json chỉnh lại:

```json
"target": "es6",
"lib": ["es6", "dom"],
```

3. **Resolved** Lỗi compile typescript: 'this' implicitly has type 'any' because it does not have a type annotation
a. Solution: 

```js
	// Trong app-main.tsx đổi
	$('.typeahead').typeahead({
		hint: true,
		highlight: true,
		minLength: 2
	}, {source: (suggests as any).ttAdapter()}).on('typeahead:selected', function(_obj: any, datum: any) {
		this.fetchMovieID(datum.id);
	}.bind(this));

	// Thành
	//...
	function(this: App, _obj: any, datum: any) {
		this.fetchMovieID(datum.id);
	}
	//...

