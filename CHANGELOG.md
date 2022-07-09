# Changelog


## (v1.0.1) - 2022-07-09

### Bug Fixes

- **ContentsTable:** Heading may now contain dashes, replacing them with empty space ([848f1cf](https://github.com/TenkoSpirit/genshin.zenless.club/commit/848f1cfd716316d2b3328a9f6c605475d1d4f59c))

### Miscellaneous Tasks

- **cliff:** Updated parsers settings ([1ce6c2b](https://github.com/TenkoSpirit/genshin.zenless.club/commit/1ce6c2b6a4188fd711ba5432bcaecffabcbacc37))
- **data:** Pull latest version of submodule ([041dc54](https://github.com/TenkoSpirit/genshin.zenless.club/commit/041dc545cd85e24cbe937bf6d639c7d388159d4f))
- **deps:** Bymped dependencies versions and added some packages ([eb5b2b3](https://github.com/TenkoSpirit/genshin.zenless.club/commit/eb5b2b39c9d96b27dcac76b49531221cfa979a60))
- **deps:** Added cypress ([47e965f](https://github.com/TenkoSpirit/genshin.zenless.club/commit/47e965f72b6f279f712b00ace7f60b0d9e813fcc))

### Refactor

- **data:** Guide zod schema is now being exported with data submodule ([9b645ee](https://github.com/TenkoSpirit/genshin.zenless.club/commit/9b645ee0f81f901ff675feadef4dcc053aa383b7))
- **pages:** Update guides index code according to latest changes of data submodule ([0347edb](https://github.com/TenkoSpirit/genshin.zenless.club/commit/0347edb48309a1621ed08d0a66fedfe51eec245d))
- **pages:** Update guide display code according to latest changes of data submodule ([c45c9d0](https://github.com/TenkoSpirit/genshin.zenless.club/commit/c45c9d0e9c73d0396bc9519814a8d32f148cc226))



## (v1.0.0) - 2022-07-08

### Refactor

- **app:** Updated use of `Character` and other Genshin types according to previous change ([095b074](https://github.com/TenkoSpirit/genshin.zenless.club/commit/095b074ecf737bbfb54f613dcb99a4224e995d19))
- **types:** Converted Genshin enums in unions ([f8afcda](https://github.com/TenkoSpirit/genshin.zenless.club/commit/f8afcda3aecffffa76f3ecad272f468921a5c9fd))



## (v0.1.3) - 2022-07-06

### Bug Fixes

- **Layout:** Large images are not wanted ([19aa581](https://github.com/TenkoSpirit/genshin.zenless.club/commit/19aa581d5fa168b869d4aea9c98472a1008d9efd))

### Features

- **Layout:** Added more meta tags ([e90642f](https://github.com/TenkoSpirit/genshin.zenless.club/commit/e90642f261d45a5b993a1c04d33303b2ca5dd963))

### Miscellaneous Tasks

- **release:** Version bump and new changelog entries ([8cc8670](https://github.com/TenkoSpirit/genshin.zenless.club/commit/8cc8670be416f358284850329af5ef0d7c7de202))
- **scripts:** Opt out of nextjs telemetry after installng dependencies ([0f983fe](https://github.com/TenkoSpirit/genshin.zenless.club/commit/0f983fe735ba38cbe3df31e9bbd27cf59c283504))



## (v0.1.2) - 2022-07-06

### Features

- **CalculatorInput:** Added initial value prop ([d280d6e](https://github.com/TenkoSpirit/genshin.zenless.club/commit/d280d6e334270f4304cd43df50dd57b4466be142))
- **app:** Added ClientOnly component and a hook ([b2279eb](https://github.com/TenkoSpirit/genshin.zenless.club/commit/b2279eba85bfabf6095f8bdbe2be619f32748098))
- **app:** Wrapped the app with jotai's Provider and used the useHydrateAllAtoms hook ([842c0a7](https://github.com/TenkoSpirit/genshin.zenless.club/commit/842c0a7a7de21fdd39187a21b784aea85190ad5a))
- **atoms:** Create atoms fot calculators ([f942467](https://github.com/TenkoSpirit/genshin.zenless.club/commit/f9424678248fee4bbe1e0e346f423e034b0b36a6))
- **atoms:** Created atoms for resin calculations ([21b3529](https://github.com/TenkoSpirit/genshin.zenless.club/commit/21b352973844c0235a2a8a7c40275e4f6291a348))
- **calc:** Added resin calculator and chagne layout to masonry ([d281298](https://github.com/TenkoSpirit/genshin.zenless.club/commit/d28129847192934257387197e90cd72c3ba9f8c6))
- **components:** Created StaticPicture to utilize optimized images versions on mobile ([bc5a8ea](https://github.com/TenkoSpirit/genshin.zenless.club/commit/bc5a8ea1ec102278ae6df87f8663533af5365b2f))
- **hooks:** Created a hook to hydrate all atoms at once ([c7e9f5e](https://github.com/TenkoSpirit/genshin.zenless.club/commit/c7e9f5ef39c0057b01a3418495095e6348d45734))
- **images:** All webps are now regenerated ([68bddb5](https://github.com/TenkoSpirit/genshin.zenless.club/commit/68bddb50628c532ec7ca7fe4f255310b17121fa4))
- **next.config:** Added type checking ([2276ddf](https://github.com/TenkoSpirit/genshin.zenless.club/commit/2276ddfd54fe2d4d22c1aae5b3e1e560c1e91f42))
- **scripts:** Updated webp generator so it makes smaller variants for mobile and uses custom quality for smaller file sizes ([766cc4d](https://github.com/TenkoSpirit/genshin.zenless.club/commit/766cc4d5ce95e8c0b76c89b0db627be2237529e9))

### Miscellaneous Tasks

- **CHANGELOG:** Updated the log ([a03ebbf](https://github.com/TenkoSpirit/genshin.zenless.club/commit/a03ebbff1026935639fef024bf8cf7cc1bae4418))
- **CHANGELOG:** Updated the log ([c9bcddb](https://github.com/TenkoSpirit/genshin.zenless.club/commit/c9bcddbada83b457d491df656b8da9431b1df799))
- **cliff:** Updated body format ([6d3c3ac](https://github.com/TenkoSpirit/genshin.zenless.club/commit/6d3c3acab113ec69779ceeac3c59002056304e86))
- **deps:** Added jotai ([9c8953c](https://github.com/TenkoSpirit/genshin.zenless.club/commit/9c8953c88bbf33850719cebf367b7374bb068b88))
- **deps:** Babel got updated ([4a291ab](https://github.com/TenkoSpirit/genshin.zenless.club/commit/4a291ab5a5da0d014868bd7a7afb164f30bbf506))

### Performance

- **CharacterCard:** Use StaticPicture to display character icon ([e3d8651](https://github.com/TenkoSpirit/genshin.zenless.club/commit/e3d8651b693efa48787e792a18a85c512d1ced28))
- **GuideCard:** Use StaticPicture to display guides thumbnails ([ffd3c95](https://github.com/TenkoSpirit/genshin.zenless.club/commit/ffd3c95806422cde1fd1fde332bac14c19187692))

### Refactor

- **_app:** Renamed jotai's provider ([09660ef](https://github.com/TenkoSpirit/genshin.zenless.club/commit/09660eff45275a01c51e527a2e8da2af0ac35e99))
- **app:** Use ldoash named imports again ([071f3a4](https://github.com/TenkoSpirit/genshin.zenless.club/commit/071f3a4d3845eec6009150013db93f9b99a86219))
- **atoms:** Added a comment to crit value atoms ([53a07f3](https://github.com/TenkoSpirit/genshin.zenless.club/commit/53a07f3db2f316e3c85ad0814dfbd5735b556c4b))
- **calc:** Use the crit rate and dmg atoms to calculate crit value ([3179c48](https://github.com/TenkoSpirit/genshin.zenless.club/commit/3179c48a60a0dea08c73b1d55b19fb853f405cc8))
- **calc:** Use resin jotai atoms instead of react's state ([046da3b](https://github.com/TenkoSpirit/genshin.zenless.club/commit/046da3bd37de5bf4d2e7d874b37f98619f6f9dc1))
- **guides:** ChangeEvent type import moved to a different line ([ea9e2cc](https://github.com/TenkoSpirit/genshin.zenless.club/commit/ea9e2cc428eaaf73c925e4d047ad86531a649026))
- **No category:** Moved everything in `src/` directory ([7adafee](https://github.com/TenkoSpirit/genshin.zenless.club/commit/7adafeedb5313ef1ab4fe500c8c09f495f805b7b))



## (v0.1.1) - 2022-07-04

### Miscellaneous Tasks

- **CHANGELOG:** Generated with git cliff ([17b9fec](https://github.com/TenkoSpirit/genshin.zenless.club/commit/17b9fec7cd45d7d249a649e7c5ca8ad852837e12))
- **No category:** Version bump ([1820fdb](https://github.com/TenkoSpirit/genshin.zenless.club/commit/1820fdb41ff59658a623ca369a619b638eec71ec))

### Refactor

- **Container:** Use string template instaed of concat ([1f1edb0](https://github.com/TenkoSpirit/genshin.zenless.club/commit/1f1edb03edc7f977086a65a40b90fc6c7b2321c0))



## (v0.1.0) - 2022-07-04

### Bug Fixes

- **Input:** Set fixed height ([2b94429](https://github.com/TenkoSpirit/genshin.zenless.club/commit/2b94429cb831b6f849985a75ee722e7c1798754e))
- **character:** Enforce hash in accentColor regex ([5c9b477](https://github.com/TenkoSpirit/genshin.zenless.club/commit/5c9b477b56d5f429f0c81f15c8b73a0126683360))
- **gorou:** AccentColor missing hash ([6f575ca](https://github.com/TenkoSpirit/genshin.zenless.club/commit/6f575ca80ead9b9f2951adb572dee6a126d6314b))

### Features

- **404:** Better styles for text ([628e286](https://github.com/TenkoSpirit/genshin.zenless.club/commit/628e28633d8dbdf3a6cd60ba4860828141c1a63f))
- **characters:** Added search input ([a33e9b0](https://github.com/TenkoSpirit/genshin.zenless.club/commit/a33e9b0f91ba2681205033bc3f625d52139212b5))
- **data:** Added Diona ([139a66d](https://github.com/TenkoSpirit/genshin.zenless.club/commit/139a66df6e308a3eb5fce662258c5084b82bd39e))
- **data:** Added Yanfei ([64edd37](https://github.com/TenkoSpirit/genshin.zenless.club/commit/64edd37c9fd6a99a1d5a6873ed55c39f472bfbbc))
- **data:** Added Sayu ([30664a1](https://github.com/TenkoSpirit/genshin.zenless.club/commit/30664a14ab9da373be39491356372d8f55122611))
- **data:** Added Sucrose ([cfac39a](https://github.com/TenkoSpirit/genshin.zenless.club/commit/cfac39a3079179376326cc4ffe58c864b7260557))
- **data:** Added Razor ([744ebb8](https://github.com/TenkoSpirit/genshin.zenless.club/commit/744ebb8f5df1b3196a7eb90df9ab73a7f560ed87))
- **data:** Added Kaeya ([0be6936](https://github.com/TenkoSpirit/genshin.zenless.club/commit/0be693631c64192bb0cb9d9c729f9488587174ec))
- **data:** Added Gorou ([c654b17](https://github.com/TenkoSpirit/genshin.zenless.club/commit/c654b170eb1f1acc437ffd8d3e20689bcc28adbb))
- **data:** Added Noelle ([e864ce2](https://github.com/TenkoSpirit/genshin.zenless.club/commit/e864ce2acfc470331997bfe8a0f5c1a5e036b34c))
- **data:** Added Ningguang ([bd3abef](https://github.com/TenkoSpirit/genshin.zenless.club/commit/bd3abef550dcbfb7b2cb5f8f6cac85be043aaa06))
- **data:** Added Thoma ([0d96e81](https://github.com/TenkoSpirit/genshin.zenless.club/commit/0d96e81669588fb1b846b71a6b89d17fa21aacce))
- **data:** Added Xiangling ([491895c](https://github.com/TenkoSpirit/genshin.zenless.club/commit/491895c7a43e32b7592101fa8562f539777656d7))
- **data:** Added Xingqiu ([92c3806](https://github.com/TenkoSpirit/genshin.zenless.club/commit/92c3806c9f431f13876177bb28a64dbe14b1ef7d))
- **data:** Added Xinyan ([1c424d4](https://github.com/TenkoSpirit/genshin.zenless.club/commit/1c424d498a991bef8f15519a1833cdfc36f95525))
- **data:** Added Bennett ([d60c8f0](https://github.com/TenkoSpirit/genshin.zenless.club/commit/d60c8f0b771718cd57127b501433fabab64457bc))
- **data:** Added Aloy ([4ba2f6d](https://github.com/TenkoSpirit/genshin.zenless.club/commit/4ba2f6da44bc1b26bc7648de611c22f1d8fc6f0f))
- **data:** Added Chongyun ([c09f068](https://github.com/TenkoSpirit/genshin.zenless.club/commit/c09f06890f600b43d7fb620ad6844d376ce9a0fa))
- **data:** Added Beidou ([2958121](https://github.com/TenkoSpirit/genshin.zenless.club/commit/2958121a4b50dd2c10e78fe56516c7df30feeb8f))

### Miscellaneous Tasks

- **characters:** Marked Sayu in todo ([f434f6f](https://github.com/TenkoSpirit/genshin.zenless.club/commit/f434f6f8c57ba3656bf974257541778dfe4f5081))
- **characters:** Marked Noelle in todo ([14b0470](https://github.com/TenkoSpirit/genshin.zenless.club/commit/14b047013944b8b08b7e0b1fa5ecfa350d58c882))
- **characters:** Marked Tartaglia in todo ([d7e4479](https://github.com/TenkoSpirit/genshin.zenless.club/commit/d7e447905ecaba4ff2828842dd5e109af54f1e8e))
- **cliff:** Config file generated ([6aecabd](https://github.com/TenkoSpirit/genshin.zenless.club/commit/6aecabd7a94718940a69b171ade32fc6ca4466db))

### Refactor

- **CharacterCard:** Img is now async and lazy ([eb2eabd](https://github.com/TenkoSpirit/genshin.zenless.club/commit/eb2eabda241009f7e093e4df1a5333759ccb4727))
- **guides:** Updated lodash imports ([7f417b8](https://github.com/TenkoSpirit/genshin.zenless.club/commit/7f417b86a9cc0a71549941778bca07128530da28))



## (v0.0.5) - 2022-07-02

### Bug Fixes

- **Navigation:** Fixed spacing on mobile ([76e793f](https://github.com/TenkoSpirit/genshin.zenless.club/commit/76e793f5b53adf02dab1d0c6b4e196624abb9d38))
- **Navigation:** Gap between links on mobile ([549934c](https://github.com/TenkoSpirit/genshin.zenless.club/commit/549934c927b1af7a5174f0a7fd5260c8c00e6322))
- **styles:** Markdown lists didnt have numbered ([44d2fc6](https://github.com/TenkoSpirit/genshin.zenless.club/commit/44d2fc65c1f8f62bc4141e7458954f7ea6dce963))
- **styles:** Darker bullets for light theme ([d96680f](https://github.com/TenkoSpirit/genshin.zenless.club/commit/d96680f04f3e8caea9e842fee3efbdbd3eeb3f15))

### Features

- **Navigation:** Bottom bar for mobile ([e86eafe](https://github.com/TenkoSpirit/genshin.zenless.club/commit/e86eafed85f54fdc75ab6ee6388ca8278027ca99))
- **characters[id]:** Create basic layout ([66fc76b](https://github.com/TenkoSpirit/genshin.zenless.club/commit/66fc76b6c802101f0c3e32447c287d6cb963d070))
- **characters[id]:** Added element type to name ([a4695b1](https://github.com/TenkoSpirit/genshin.zenless.club/commit/a4695b1df5ce79ce7d5d8b2f1aed0ddd8d188d03))
- **colors:** Changed dark and primary ([6025300](https://github.com/TenkoSpirit/genshin.zenless.club/commit/602530013d03b73416337e7a8fabe1da7d8e888e))
- **components:** Content table created ([ea27853](https://github.com/TenkoSpirit/genshin.zenless.club/commit/ea2785350b90bbb358ed4813cf48d677f57b52ed))
- **components:** Created custom Input ([6703785](https://github.com/TenkoSpirit/genshin.zenless.club/commit/67037855733a1cf015d954e98afdea7c9234eb2c))
- **data:** Added Barbara ([7c0fdfd](https://github.com/TenkoSpirit/genshin.zenless.club/commit/7c0fdfdf966cf236aa449627c06f7de7bd183cb0))
- **styles:** Markdown list now has bullet points ([ddd2221](https://github.com/TenkoSpirit/genshin.zenless.club/commit/ddd222188448e59deb2d0d7eba6bbcc8b8967e91))
- **No category:** Updated cplor scheme with tailwind ([9cd938b](https://github.com/TenkoSpirit/genshin.zenless.club/commit/9cd938b6552191616c75c8ab336e724bddc42155))

### Refactor

- **Layout:** Updated default color ([6e07b0b](https://github.com/TenkoSpirit/genshin.zenless.club/commit/6e07b0b61c104af8133c98720d2940f58543e596))
- **components:** RouterReady replaced by hook ([3fe672b](https://github.com/TenkoSpirit/genshin.zenless.club/commit/3fe672b6fbd444e82ebc981dc5c4dcc9492e947f))
- **guides:** Applied ContentsTable component ([47145e8](https://github.com/TenkoSpirit/genshin.zenless.club/commit/47145e8ca05ef3a887e348944082e5651cc04773))
- **guides:** Applied custom Input ([4ec3ba6](https://github.com/TenkoSpirit/genshin.zenless.club/commit/4ec3ba69a816427ec0bab9891ac78ed1ee3c1c9c))
- **No category:** Moved nav margin from footer to root ([2effd3f](https://github.com/TenkoSpirit/genshin.zenless.club/commit/2effd3f7da7276bc7dcb926b9f041658c9f106a0))



## (v0.0.4) - 2022-07-01

### Features

- **data:** Venti added ([e40447c](https://github.com/TenkoSpirit/genshin.zenless.club/commit/e40447cebdf63ee045760e84944178b4841d49e4))
- **data:** Arataki Itto added ([5c2e562](https://github.com/TenkoSpirit/genshin.zenless.club/commit/5c2e56217361a255e8ee4db2ff1a064e18799151))
- **data:** Added Diluc ([2379108](https://github.com/TenkoSpirit/genshin.zenless.club/commit/23791088f01a1916fafea1199584e19372ccc332))
- **data:** Added Zhongli ([1690121](https://github.com/TenkoSpirit/genshin.zenless.club/commit/16901219904dbcc36c99128adb6388f8a837ac48))
- **data:** Added Albedo ([bf03582](https://github.com/TenkoSpirit/genshin.zenless.club/commit/bf035829c0df3f7b5affed8910513fa28ac2c9d3))
- **data:** Added Xiao ([162b241](https://github.com/TenkoSpirit/genshin.zenless.club/commit/162b2415e497ade72f7b4f372605792a1007b070))
- **data:** Added Lisa ([f281202](https://github.com/TenkoSpirit/genshin.zenless.club/commit/f281202ad9855e78d0e2fb13bfccb16806833acd))
- **data:** Added Yun Jin ([f66d487](https://github.com/TenkoSpirit/genshin.zenless.club/commit/f66d487c2eb52cb25054c9a083670f3b6b5682a3))

### Miscellaneous Tasks

- **data:** Updated characters todo ([899fce6](https://github.com/TenkoSpirit/genshin.zenless.club/commit/899fce683570236ee0f20d1b131034f701f808cd))
- **submodules:** Updated url and name for guides ([3bee7c1](https://github.com/TenkoSpirit/genshin.zenless.club/commit/3bee7c15f3e1e2056f65fca3323a57d9c1e8218a))

### Refactor

- **cards:** Replaced long-title w/auto height ([9a12815](https://github.com/TenkoSpirit/genshin.zenless.club/commit/9a1281554c4fad36828e25409b7b8c0304c9fae9))
- **guides:** Container now uses masonry ([b51ca38](https://github.com/TenkoSpirit/genshin.zenless.club/commit/b51ca389ca108861102c3c9701f999a4b420fc1b))



## (v0.0.3) - 2022-06-30

### Bug Fixes

- **CharacterCard:** Icon was in png and not webp ([7064832](https://github.com/TenkoSpirit/genshin.zenless.club/commit/7064832683611c2e7626e3a17ebc1da754eb4551))

### Features

- **Guides:** Added table of contents ([b95738f](https://github.com/TenkoSpirit/genshin.zenless.club/commit/b95738f445a32ffbc276a56ed1526bc251f2e450))
- **data:** Tartaglia added ([ff468c8](https://github.com/TenkoSpirit/genshin.zenless.club/commit/ff468c8ed8db12af2940f65047ce46a82a446559))

### Miscellaneous Tasks

- **CHANGELOG:** Added entries for the apst days ([241aca0](https://github.com/TenkoSpirit/genshin.zenless.club/commit/241aca0f5ad4ac682f7356163a01bf3ce1a7586c))
- **README:** Updated title according to repo ([424c813](https://github.com/TenkoSpirit/genshin.zenless.club/commit/424c813e91af0095a3618e6f4d882d08c0774a3a))
- **guides:** Newest data from the repo ([67ce28a](https://github.com/TenkoSpirit/genshin.zenless.club/commit/67ce28a176b8feb875489d38978eecf83072b475))



## (v0.0.2) - 2022-06-29

### Bug Fixes

- **CharacterCard:** Background and margin ([14f6264](https://github.com/TenkoSpirit/genshin.zenless.club/commit/14f6264b3b6986b20fbd3d249ecc1fad82f38db0))
- **CharacterCard:** Longtitle fontsize didnt apply ([a0b6943](https://github.com/TenkoSpirit/genshin.zenless.club/commit/a0b6943c6563dbd0bb93ba49caade0e0f129153a))
- **data:** Yae Miko birthday date was incorrect ([285e82a](https://github.com/TenkoSpirit/genshin.zenless.club/commit/285e82aff851468692052f90211f68b4fa7f5257))
- **navigation:** Show scroller if height too small ([2d3ccec](https://github.com/TenkoSpirit/genshin.zenless.club/commit/2d3ccece3ffa05dd391d6070d4ff359b192aa4d0))

### Features

- **app:** Added birthdays display to home page ([489c1e6](https://github.com/TenkoSpirit/genshin.zenless.club/commit/489c1e69d2cc28c38f0e639da916a07918ab5169))
- **assets:** Added icons for each element ([1eec4fd](https://github.com/TenkoSpirit/genshin.zenless.club/commit/1eec4fdda0f3def2f8845546b41e5298459bb441))
- **characters, card:** Element on top left ([9b76fff](https://github.com/TenkoSpirit/genshin.zenless.club/commit/9b76fff00ac77e43c2db0372df08a9b4be184a4e))
- **navigation:** Active consistently rounded ([5d2e0eb](https://github.com/TenkoSpirit/genshin.zenless.club/commit/5d2e0eb448b84cbd36d8531b5779f9fb936476a1))

### Miscellaneous Tasks

- **LICENSE:** Username updated again ([37569ac](https://github.com/TenkoSpirit/genshin.zenless.club/commit/37569ac5cfe037e9113e6e3ab62f5723220f1fc9))

### Refactor

- **BirthdaysToday:** Removed console.log ([fb58b15](https://github.com/TenkoSpirit/genshin.zenless.club/commit/fb58b15aaac2b6df00253e5eec8b5139184f6f85))



## (v0.0.1) - 2022-06-28

### Bug Fixes

- **data:** Missing webp files for Hu Tao ([e518273](https://github.com/TenkoSpirit/genshin.zenless.club/commit/e51827359e103e44752122e5e8c9b6ce1b122ea1))
- **navigation:** Mobile theme switch mixed text ([4ff5ba7](https://github.com/TenkoSpirit/genshin.zenless.club/commit/4ff5ba7ecd34710ab07a0ae69b65687ddeb7ef84))
- **styles:** Long-title class is now restored ([34c4a8b](https://github.com/TenkoSpirit/genshin.zenless.club/commit/34c4a8b88d2d4c1747f4752173b30ee368f33d75))

### Features

- **app:** Light theme background is now darker ([a0aa2e2](https://github.com/TenkoSpirit/genshin.zenless.club/commit/a0aa2e291beb1fbd98f6253f39e80861a6bc0e9c))
- **container:** Removed lg padding ([beb2095](https://github.com/TenkoSpirit/genshin.zenless.club/commit/beb20953d48824e0bf60f2b1b36425b995f9e2f4))
- **data:** Added Jean ([3fa45d5](https://github.com/TenkoSpirit/genshin.zenless.club/commit/3fa45d59881215f5b228cb578282cbe9dc09620d))
- **data:** Added Mona ([b96d0b2](https://github.com/TenkoSpirit/genshin.zenless.club/commit/b96d0b2b60a00cc892e335abd177512b43e31e67))
- **data:** Added Hu Tao ([dad7b10](https://github.com/TenkoSpirit/genshin.zenless.club/commit/dad7b10ed5ba496c010c075865eee67eb84a31dc))
- **data:** Added Kujou Sara ([cf720c5](https://github.com/TenkoSpirit/genshin.zenless.club/commit/cf720c56fa95030fe3db8ae878510e2b6740b313))
- **navigation:** Desktop sidebar is now floating ([d2b1c66](https://github.com/TenkoSpirit/genshin.zenless.club/commit/d2b1c6602543d6d57951c98ffb5ffadb347da8cd))

### Miscellaneous Tasks

- **changelog:** Added today's entries ([0cb0412](https://github.com/TenkoSpirit/genshin.zenless.club/commit/0cb041228ebbbafb685b11f55160d679d9fdb5d3))
- **data:** Cahracters todo updated ([deb250a](https://github.com/TenkoSpirit/genshin.zenless.club/commit/deb250a14489a81f9d4b59b134d29bbc06ce1766))
- **data:** Renamed todo file to .todo ([f2489fd](https://github.com/TenkoSpirit/genshin.zenless.club/commit/f2489fdcadb4909e6cd3b533dee2027293366052))
- **data:** Marked Jean in todo list ([6a1f259](https://github.com/TenkoSpirit/genshin.zenless.club/commit/6a1f259f76c97c1779e2572e561663d3fe36ab5f))

### Refactor

- **scripts:** Cf page fix is not needed ([0296782](https://github.com/TenkoSpirit/genshin.zenless.club/commit/0296782bdb5ddadcd0b969d10027350bbb0dc5f9))

### Styling

- **app:** Fixed everything with eslint cli ([509a594](https://github.com/TenkoSpirit/genshin.zenless.club/commit/509a594f8cde20b05471535d07207d52da4033f5))
- **layout:** Eslint fix applied ([9db7585](https://github.com/TenkoSpirit/genshin.zenless.club/commit/9db758594e75764121c74667f0eec1e688a0eb10))
- **navigation:** Fixed all with eslint ([f908887](https://github.com/TenkoSpirit/genshin.zenless.club/commit/f908887d1ae055403eb1beefcfa46bbc4b35b7f4))

### Build

- **eslint:** Enforce type imports ([e5d59d2](https://github.com/TenkoSpirit/genshin.zenless.club/commit/e5d59d264030eebca5b4fa593d5147485cadacde))
- **eslint:** Ignored more patterns ([29deafc](https://github.com/TenkoSpirit/genshin.zenless.club/commit/29deafc74aee0acca505180293f1a6fa5c495d93))
- **tsconfig:** Added importsNotUsedAsValues ([050186c](https://github.com/TenkoSpirit/genshin.zenless.club/commit/050186c55dcfccdba047e93d75e448a71690c55a))



<!-- generated by git-cliff -->
## 2022-06-28

 - Added Kujou Sara assets and character data
 - Added Hu Tao assets and character data
 - Added Mona assets and character data
 - Added Jean assets and character data
 - Added Klee assets and character data
 - Changed sidebar menu to a floating sticky container
 - Changed light theme background to a little darker shade
 - Fixed wrong texts on theme switch on mobile
 - Internal changes to types definitions and linter settings
 - Using [git conventional commit](https://www.conventionalcommits.org/en/v1.0.0/#summary) for the commits in the repo from now on

## 2022-06-27

 - Switched back to NextJS (yes, I've switched frameworks multiple times in  just a few days)
 - `webp` converted files are now a part of the repo
 - Internal changes

## 2022-06-26

 - Added Fischl character data
 - Switched back to Nuxt
 - Created custom composable shorthand for meta data

## 2022-06-25

 - Added Yoimiya character data
 - Added Keqing character data
 - Added Kaedehara Kazuha character data
 - Added Sangonomiya Kokomi character data
 - Added Rosaria character data
 - Added Amber character data
 - Parsing character with zod on their exports
 - More complex search via array reducers (grouped and sorted inside of groups)

## 2022-06-24

 - Switch to NextJS
 - Internal changes to scripts
 - Added `accentColor` to `Character`
 - Added IDs to cards

## 2022-06-23

 - Switch to Nuxt v3 (RC)
 - Included meta tags with useHead()
 - Created a NextJS branch

## 2022-06-20

 - Created custom image component
 - Search input is now debounced
 - Fixed naming of views

## 2022-06-18

 - Added Raiden Shogun character data
 - Added Eula's constellations
 - Internal changes to data
 - Router redirects to /404 on catch all path

## 2022-06-17

 - Added Raiden Shogun assets
 - Added zod
 - Added state persistance plugin for pinia
 - Created a new store for guides
 - Updated character type with zod so it can be validated

## 2022-06-15

 - Routes now are named
 - Automatic conversion of static images to `webp` format
 - Internal changes related to rerendering with params change
 - Characters view now shows some basic data
 - Added progress bar

## 2022-06-12

 - Created calculator components
 - Added a crit value calculator
 - Extended dayjs with local formats
 - Added automatic scrolls for hashes (`https://genshin.zenless.club/guides#yae_miko` would scroll to Yae Miko's card automatically)
 - Guides page data filter now uses search params as initial value
 - Extended dayjs with more locales
 - Updated color scheme (yes, once again)
 - Minor styling changes

## 2022-06-11

 - Added Ganyu character data
 - Added Eula character data (without constellations)

## 2022-06-10

 - Added Yelan character data
 - Added Kamisato Ayato character data
 - Added Qiqi character data
 - Added Shenhe character data
 - Populated Ayaka's constealltion data
 - Sorting characters data array by default
 - Fixed character card link

## 2022-06-09

 - Styles for parsed guides data
 - Router is now using nested routes

## 2022-06-08

 - Updated color scheme
 - Created a git submodule to synchronize data with [zenless-club-genshin-guides](https://github.com/TenkoSpirit/zenless-club-genshin-guides)

## 2022-06-05

 - Created a parser for characters guides data which could be used for actually more than that with Rust
 - Moved data parser to a different repo [zenless-club-genshin-guides](https://github.com/TenkoSpirit/zenless-club-genshin-guides)

## 2022-06-04

 - Guides home view now hides filtered content instead of destroying the nodes (conditional class instead of conditional rendering)
 - a11y fix for character card component
 - Minor styling changes to cards
 - Kamiasto Ayaka data was added
 - Internal changes to characters data storage

## 2022-06-02

 - Static images are now not being affected by Vite
 - Created Genshin Impact special types
 - (WIP) Created character card component
 - Guide display page displays the data to users now
 - Yae Miko charater data 

## 2022-05-30

 - Added dark theme colors to previously created components

## 2022-05-29

 - Implemented colors scheme changer
 - Extended tailwind with more colors

## 2022-05-28

 - Added a view to display guides content

## 2022-05-26

 - Changing colors scheme!

## 2022-05-17

 - Guide cards component was somewhat finished.

## 2022-04-25

 - This is where it all begins! The initial project.