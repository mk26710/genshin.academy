# Changelog


## (v1.7.2) - 2022-10-22

### Bug Fixes

- **components, routes:** Added `object-cover` to users' avatar `img` tags ([8f423ff](https://github.com/TenkoSpirit/genshin.zenless.club/commit/8f423fff54b0a3a5757233c92d3051cc49702745))
- **eslint:** Add prisma generated files to ignore patterns ([eebc074](https://github.com/TenkoSpirit/genshin.zenless.club/commit/eebc074514a119094b84c9cdc6a3129b050b505d))
- **hooks:** Caught data can be undefined ([13c785b](https://github.com/TenkoSpirit/genshin.zenless.club/commit/13c785b54572c5e93c25d293a067ef299c5d3687))
- **prisma:** Seeded user invalid field name ([71fcb33](https://github.com/TenkoSpirit/genshin.zenless.club/commit/71fcb33d7f9023bcc834255f8943e11cc953d3a9))
- **root:** Weird layout shifts of components with transitions ([479541a](https://github.com/TenkoSpirit/genshin.zenless.club/commit/479541ae3b1a2f0faf941ffca5386e8d76554473))
- **routes:** Post edit page had input field with both defaultValue and value which caused errors ([dd71c31](https://github.com/TenkoSpirit/genshin.zenless.club/commit/dd71c3178cf7de5423fbdd2c326fc7824e0259ca))
- **routes:** Covnert user's avatarUrl to undefined if it's null ([2baf699](https://github.com/TenkoSpirit/genshin.zenless.club/commit/2baf6999bb95af2e7c0ea6d3e5ead7223e7302da))
- **utils:** Previous types for `permissions.ts` functions were outdated ([15a5fc7](https://github.com/TenkoSpirit/genshin.zenless.club/commit/15a5fc79fe9791198094719dd08bf08dd55c2fc6))
- **utils:** Pass supported languages via spread operator ([bfa5a4a](https://github.com/TenkoSpirit/genshin.zenless.club/commit/bfa5a4a50674c8859d72da7e308c24307e4778b0))
- **No category:** Missing argumn on npm start script ([efa40fe](https://github.com/TenkoSpirit/genshin.zenless.club/commit/efa40fe1644beef60419a526c317a6662f94051f))

### Features

- **components:** `RoleBadge` won't render if it's a default role ([fed0b95](https://github.com/TenkoSpirit/genshin.zenless.club/commit/fed0b953e370ad3a5f55ea8bd1a7da13313668a4))
- **components:** Added role colors for owner and developer roles ([9a7589d](https://github.com/TenkoSpirit/genshin.zenless.club/commit/9a7589d4a3b1cade54d06c1098a7099532338fac))
- **components:** Created `PostCard` ([2785d3c](https://github.com/TenkoSpirit/genshin.zenless.club/commit/2785d3c15a68050181dc9b8fa8c1ad921b767bc0))
- **components:** Added image sizes to `PostCard` ([b6cf031](https://github.com/TenkoSpirit/genshin.zenless.club/commit/b6cf03183fe4a7674b29afbf6a264b104201385a))
- **components:** `PostCard` will now show date in user's locale ([652e5df](https://github.com/TenkoSpirit/genshin.zenless.club/commit/652e5df1bcd38f5aee93fe57f259be227e0120d1))
- **components:** Created a reusable `RouteLevelCatchBoundary` ([02f48b8](https://github.com/TenkoSpirit/genshin.zenless.club/commit/02f48b87322910d1d3b88ae3b2f10ecdf08eba3d))
- **components:** Added a default search param to header navigation links ([2fe1e20](https://github.com/TenkoSpirit/genshin.zenless.club/commit/2fe1e20a5d17afd574eca61bca47d840356231f2))
- **components:** Created `Paginator` to manipulate current route's pages search param ([53b20b5](https://github.com/TenkoSpirit/genshin.zenless.club/commit/53b20b565f1098f93a960397950823527b7c3cdf))
- **components:** Created `UserAvatar` ([fcbc937](https://github.com/TenkoSpirit/genshin.zenless.club/commit/fcbc9374ee27f6ab4967b67be86fa7a48b1b94c9))
- **components:** Set `UserAvatar` to be lazy and async ([e163b38](https://github.com/TenkoSpirit/genshin.zenless.club/commit/e163b38c507b345f2d7e6f69cd76d04b95980a51))
- **components:** `PostCard`'s image is now lazy and async ([d8f655e](https://github.com/TenkoSpirit/genshin.zenless.club/commit/d8f655edfce95bd18888957e2844e059eeaa38fd))
- **components:** Created a `UserCard` ([f429935](https://github.com/TenkoSpirit/genshin.zenless.club/commit/f4299357a90f2a3f61f6f734ad6d25cd7cc2c857))
- **components:** Added `realAvatarUrl` to `UserAvatar` which what kind of data was provided in the props ([5227738](https://github.com/TenkoSpirit/genshin.zenless.club/commit/52277382977dd38118447eb8ca27370ad05e36f0))
- **components:** Updated headings prop type ([102ca8e](https://github.com/TenkoSpirit/genshin.zenless.club/commit/102ca8ef4f2c8ff437a8a75b8c750931eba117c6))
- **components:** Removed guides from header ([1c4bfdf](https://github.com/TenkoSpirit/genshin.zenless.club/commit/1c4bfdf79c7101a67a94dc7e82a1536584289f5a))
- **css:** Added `textarea-field` class ([f8f51b3](https://github.com/TenkoSpirit/genshin.zenless.club/commit/f8f51b3f00c85b413a17b089ea8718160f921ff3))
- **css:** Added hover anmation to cards ([97ca4e2](https://github.com/TenkoSpirit/genshin.zenless.club/commit/97ca4e24d0e474f4b899aa5dd210c68aaf1b4d76))
- **css:** Disabled transitions on firefox because it's very annoying ([4059d1b](https://github.com/TenkoSpirit/genshin.zenless.club/commit/4059d1b8f6313ccc0ca793e5ccc5061cdfbb69ca))
- **css:** Bigger padding for select menus so an arrow fits ([b62421e](https://github.com/TenkoSpirit/genshin.zenless.club/commit/b62421e9f545ebeb4ee26390969ccd0deaf3cb67))
- **data:** Added english description to Kuki Shinobu ([518c9be](https://github.com/TenkoSpirit/genshin.zenless.club/commit/518c9be48fc039ca40b2a305b585e4b8617add66))
- **db:** Added logging to prisma ([301936f](https://github.com/TenkoSpirit/genshin.zenless.club/commit/301936ff9b64837f271a3bca37b019e3a0db634e))
- **db:** Format errors with `minimal` on both prod and dev ([babb675](https://github.com/TenkoSpirit/genshin.zenless.club/commit/babb675798d645248b44e1909564cd92c8e64b89))
- **esbuid:** Set charset to utf-8 ([8b5f431](https://github.com/TenkoSpirit/genshin.zenless.club/commit/8b5f43176969fe787d1ea99529f8b9f20ff3f7c8))
- **eslint:** Enabled import order plugin ([540f04b](https://github.com/TenkoSpirit/genshin.zenless.club/commit/540f04b888e540a00c87322035fa7168d7db09ac))
- **hooks:** Added a hook which pulls locale from root ([c9ecb60](https://github.com/TenkoSpirit/genshin.zenless.club/commit/c9ecb608054b8a821f879b9e8da9750421f1d90a))
- **hooks:** `useVisitorLocale` will always retun a string which is a locale or a default locale ([890b41e](https://github.com/TenkoSpirit/genshin.zenless.club/commit/890b41ed5ed1490c0ff0560b0a286e15a8f74ce1))
- **hooks:** More strict checks on `useOptionalUser` hook and now it'll also look for user data in catch data of a catch boundary ([b27bf59](https://github.com/TenkoSpirit/genshin.zenless.club/commit/b27bf5911fc08e8e1e0fc533f8b16af5ccc1117b))
- **hooks:** Rollback `useOptionalUser` to it's original state ([7ed65ec](https://github.com/TenkoSpirit/genshin.zenless.club/commit/7ed65ec51facebc129817c71db8205613c37165a))
- **i18n:** Added translation string for website index page ([d3d1b93](https://github.com/TenkoSpirit/genshin.zenless.club/commit/d3d1b93af4ff31b6bc92307809b012c73180393a))
- **i18n:** Added tranlsation strings for bday card ([d921831](https://github.com/TenkoSpirit/genshin.zenless.club/commit/d921831b01105b365594ec294f1ae50f10f764d5))
- **i18n:** Mroe translations ([3cfebab](https://github.com/TenkoSpirit/genshin.zenless.club/commit/3cfebabd7427e876598bbec56cd29e66381b0b26))
- **i18n:** Added mroe translation strings ([730c8ac](https://github.com/TenkoSpirit/genshin.zenless.club/commit/730c8ac117e6bc7be904fdc997ec87b4845a2af3))
- **models:** Updated existing posts models and added `createPost` ([e94780a](https://github.com/TenkoSpirit/genshin.zenless.club/commit/e94780a552a0dd71f3227bc7bf73638d314c53d1))
- **models:** Added post deletion functions ([6e4596c](https://github.com/TenkoSpirit/genshin.zenless.club/commit/6e4596c6ecfe09c37275f3679fe8c689e00fe8e1))
- **models:** Include publish date on posts search results ([a827821](https://github.com/TenkoSpirit/genshin.zenless.club/commit/a827821fe39ac2baf67934153554e4d13364d765))
- **models:** Created `updatePostBySlug()` ([05aa48d](https://github.com/TenkoSpirit/genshin.zenless.club/commit/05aa48d108d5eeaf64b2978331844d8c5626e18a))
- **models:** Added `getLatestPost()` ([36eeb8a](https://github.com/TenkoSpirit/genshin.zenless.club/commit/36eeb8a292c5314418f2afe87e36890866d5d077))
- **models:** Support getting data for multiple languages at once for `getCharactersList()` ([be9896a](https://github.com/TenkoSpirit/genshin.zenless.club/commit/be9896a3972506d81b7011e0ea5d9d5511bd9315))
- **models:** Added `getCharactersByBirthday()` which is used on front page ([edc1775](https://github.com/TenkoSpirit/genshin.zenless.club/commit/edc1775abd02edc976dae99ddd76cc3572165e33))
- **models:** Changed `findFirst` to `findUnique` where possible ([99ee908](https://github.com/TenkoSpirit/genshin.zenless.club/commit/99ee9088ef13531ce83107f388ba5af6ca392a07))
- **models:** Created `getUserByNameOrId` ([6771417](https://github.com/TenkoSpirit/genshin.zenless.club/commit/677141712668bdc2838434eb4eecc2f397c36700))
- **models:** Created prisma validator to standardize what is included with user ([3d1de44](https://github.com/TenkoSpirit/genshin.zenless.club/commit/3d1de447a5ffa3e96b073ac5f588252c885356fb))
- **models:** Added `updateUserById` ([2041ac2](https://github.com/TenkoSpirit/genshin.zenless.club/commit/2041ac2a28a7bf5a81bc102a920e006b969238cd))
- **models:** Lang is not an array of strings and now is just a string ([21ea1ef](https://github.com/TenkoSpirit/genshin.zenless.club/commit/21ea1ef45e9e8fbe158b93e80f0ac7449ccd2fd7))
- **prisma:** Udpated posts schema back to one-to-one relationship with content ([ae2e72e](https://github.com/TenkoSpirit/genshin.zenless.club/commit/ae2e72e4489f2aa7612fbf35d6e6fed4997abb1d))
- **prisma:** Set `User.enabled` to `false` by default ([50dfa4d](https://github.com/TenkoSpirit/genshin.zenless.club/commit/50dfa4d5df3b3aad82d26e1aede4d94bcd0b9d4b))
- **prisma:** Added default `id` and added `name` field to `GenshinCharacterConstellations` ([d3fb4b4](https://github.com/TenkoSpirit/genshin.zenless.club/commit/d3fb4b40e5308d31878bcf47fd73d823b5f05616))
- **prisma:** Added default `id` to `GenshinCharacterIdentity` ([bfd4759](https://github.com/TenkoSpirit/genshin.zenless.club/commit/bfd4759225c0f949d85c6550b81756e720572655))
- **prisma:** Identity id should be default generated for character's identity ([984bcd0](https://github.com/TenkoSpirit/genshin.zenless.club/commit/984bcd0ad7b823a7f48b7808c23cf98777a3deee))
- **prisma:** Changed default prisma client generation output directory ([4103e24](https://github.com/TenkoSpirit/genshin.zenless.club/commit/4103e243a05c98909c11ffec77aa49edc715d8c6))
- **prisma:** No more custom output ([c0fc6e3](https://github.com/TenkoSpirit/genshin.zenless.club/commit/c0fc6e3aa7094bc24f560f5d11a771017318eff7))
- **prisma, data:** Moved characters data to prisma so it can be seeded ([b570a34](https://github.com/TenkoSpirit/genshin.zenless.club/commit/b570a3415f4f31ba5003976e5841b77f713b2352))
- **remix:** Changed cache diractory and included server esm dependencies ([80f960f](https://github.com/TenkoSpirit/genshin.zenless.club/commit/80f960f7de26abe3e29965b60bcd0511f6e9e021))
- **root:** Added a root catch boundary ([e27d0dd](https://github.com/TenkoSpirit/genshin.zenless.club/commit/e27d0ddb5e48dcb94ffb843d3c6e41747fcdaa0a))
- **root:** Include posts i18n strings ([458e0d2](https://github.com/TenkoSpirit/genshin.zenless.club/commit/458e0d2a8c03b7cd2dbc2dad1b93617e9ac9d1be))
- **root:** Updated root catch boundary to look prettier ([7992b6f](https://github.com/TenkoSpirit/genshin.zenless.club/commit/7992b6f7210774e592f6c7981aa86f3887faba3b))
- **root:** Added styles preload ([c9eaf8f](https://github.com/TenkoSpirit/genshin.zenless.club/commit/c9eaf8f5665380b4a06d221a745be67435f6a7d0))
- **root:** Added `settings` i18n namespace ([c1bab5f](https://github.com/TenkoSpirit/genshin.zenless.club/commit/c1bab5f5c33f2ab30c1e766dcf87a94e046ac689))
- **root:** Handle disabled accounts in root catch boundary ([a416254](https://github.com/TenkoSpirit/genshin.zenless.club/commit/a4162540b5207fdee868e696afaf0b9c311e2717))
- **root:** Show log out button for disabled accounts in the root catch boundary ([e534103](https://github.com/TenkoSpirit/genshin.zenless.club/commit/e534103cc788f970d30523e11e4efe2ed0ff5755))
- **root:** Removed scroll restoration since it breaks anchors ([9e4cc59](https://github.com/TenkoSpirit/genshin.zenless.club/commit/9e4cc59f48763b6ee05959865b029e19151b7f2b))
- **root:** Exclude `ScrollRestoration` from posts routes ([7c6ea62](https://github.com/TenkoSpirit/genshin.zenless.club/commit/7c6ea626533b2de7cc612606595e669c8c1070c6))
- **root:** Removed `ScrollRestoration` which hopefully fixes stupid issue with hashtag anchors ([77412be](https://github.com/TenkoSpirit/genshin.zenless.club/commit/77412bec7b8b004d6e3f5ce751eda5c1d19f1239))
- **root:** Removed css preload and removed some unused code ([6d055bb](https://github.com/TenkoSpirit/genshin.zenless.club/commit/6d055bba84695c21cec33d7e0d83ddff7fc11c66))
- **root, utils:** Better handling of disabled accounts ([7d78a3e](https://github.com/TenkoSpirit/genshin.zenless.club/commit/7d78a3e7564f14f03f26fb479797e37cca8e4f4b))
- **rotues:** `/set-locale` is now an action only route ([59be307](https://github.com/TenkoSpirit/genshin.zenless.club/commit/59be307d388c2d078c5a111598a769191345897c))
- **rotues:** Make characters sorted by their rarities on `/characters` page ([f8d4cd6](https://github.com/TenkoSpirit/genshin.zenless.club/commit/f8d4cd602b62053b8b247caf23a5e766e6808da5))
- **routes:** Posts index mock up route ([8e350cb](https://github.com/TenkoSpirit/genshin.zenless.club/commit/8e350cb9f8fceac331e7c11e50e28ca73d5caff7))
- **routes:** Created a mockup route for posts creation ([6bb7df0](https://github.com/TenkoSpirit/genshin.zenless.club/commit/6bb7df0f8916df6ac5abbad41a217babd942aa14))
- **routes:** Created `/posts/new` ([7534c0c](https://github.com/TenkoSpirit/genshin.zenless.club/commit/7534c0caf251128c26190587402d41468b0f9ce5))
- **routes:** Created `/posts/$slug` with deletion handler ([89615cc](https://github.com/TenkoSpirit/genshin.zenless.club/commit/89615ccbba2323aeedbf6ebf483713a0b8e6f99c))
- **routes:** Added navigation for the post edit button ([cf2cf32](https://github.com/TenkoSpirit/genshin.zenless.club/commit/cf2cf32d22ceaa77ace8c2163cf7ed3f479fb767))
- **routes:** Updated psots search route and improved search params validation and added some transformations ([33ac2d6](https://github.com/TenkoSpirit/genshin.zenless.club/commit/33ac2d6717a38fcb9bf69265a86feb6594367e99))
- **routes:** Posts edit route mockup with permissions checks ([26914d0](https://github.com/TenkoSpirit/genshin.zenless.club/commit/26914d0ab54b17e48e52f99c09f23f2c63ae5cec))
- **routes:** Added a form to `/posts/$slug/edit` with validation and etc. ([d0981db](https://github.com/TenkoSpirit/genshin.zenless.club/commit/d0981db666cc7e1afc9a965b9f259516e9fb91c3))
- **routes:** Index page is now going to show website's latest post ([c4913ee](https://github.com/TenkoSpirit/genshin.zenless.club/commit/c4913eeb98b928225820bca36fb0ea31eb80ae5e))
- **routes:** A bit more styling to RouteLevelCatchBoundary ([97f73cd](https://github.com/TenkoSpirit/genshin.zenless.club/commit/97f73cdaaf63a4c46b4e9afb47ff740b13cee1c8))
- **routes:** Added `RouteLevelCatchNoundary` to `/posts/$slug` ([8557f32](https://github.com/TenkoSpirit/genshin.zenless.club/commit/8557f328e256ebe9e58b8d79ea5172fbc457980e))
- **routes:** Added default language to cahracters data on `/characters` ([275b06b](https://github.com/TenkoSpirit/genshin.zenless.club/commit/275b06b3ed5d36df187f6241793cbb84398f2489))
- **routes:** Handle existing posts ([27ddcec](https://github.com/TenkoSpirit/genshin.zenless.club/commit/27ddcecc2144f90ca37e79d7cdb8dad4f16a9ef3))
- **routes:** Removed `/change-language` and created `/set-locale/$slug` as a replacement ([bba1898](https://github.com/TenkoSpirit/genshin.zenless.club/commit/bba189849560f1305d9e7212c57f550796194286))
- **routes:** Added last and first page buttons to `/posts` and also changed the way search paramsare being created here ([a52efbb](https://github.com/TenkoSpirit/genshin.zenless.club/commit/a52efbb9a3a4935472c919cf16621f2b7c55f615))
- **routes:** Created `/settings` where users can set a new language ([8f61116](https://github.com/TenkoSpirit/genshin.zenless.club/commit/8f6111630fe227e8998b778d818db89c95dba3a1))
- **routes:** Added birthdays on index page ([1c9c8cf](https://github.com/TenkoSpirit/genshin.zenless.club/commit/1c9c8cf15578dfb4a3f2b903c1cea3342d25a286))
- **routes:** Added a search input field to `/posts` ([864f1e3](https://github.com/TenkoSpirit/genshin.zenless.club/commit/864f1e383bfc69bbcb0265d3b8a2a9380e61faae))
- **routes:** Added a route to see info about the character ([007ae93](https://github.com/TenkoSpirit/genshin.zenless.club/commit/007ae933167aa2f9740558fdaef83905509afd70))
- **routes:** Renamed `logout.tsx` to `logout.ts` since it's basically a resource  route ([504203f](https://github.com/TenkoSpirit/genshin.zenless.club/commit/504203f9e3bdc21b1d314952d933232a2f6421b8))
- **routes:** Let zod validate form data on `/join` ([6e362ee](https://github.com/TenkoSpirit/genshin.zenless.club/commit/6e362ee9716dc04ec67f3b8ed10ad51a74b65bf9))
- **routes:** Hide constellations data if there's no data at all ([25dadf5](https://github.com/TenkoSpirit/genshin.zenless.club/commit/25dadf5ae2cf36d4321f48d18aab5646871e1ff2))
- **routes:** Markdown specific css file will be included on posts pages ([860fffd](https://github.com/TenkoSpirit/genshin.zenless.club/commit/860fffd1d12a6058b2554df615b9107d4982b107))
- **routes:** Added meta function on `/characters/$id` ([3cf761b](https://github.com/TenkoSpirit/genshin.zenless.club/commit/3cf761b6975e778175fb4db206f8759aa94a6822))
- **routes:** Use `generateMeta` on home page ([fc6a4ea](https://github.com/TenkoSpirit/genshin.zenless.club/commit/fc6a4ea063dbeddb8a51bc88f23e27e6ccc5f6a0))
- **routes:** Set default textarea height on posts creation and edit routes ([c137caa](https://github.com/TenkoSpirit/genshin.zenless.club/commit/c137caa85be1242d7b5af22fc5640a22c0eb086b))
- **routes:** Created admin route ([9fdbb8e](https://github.com/TenkoSpirit/genshin.zenless.club/commit/9fdbb8e57c1ac59ecb5d6909cb96ccfc9d94888d))
- **routes:** List of registered users ([8ce940f](https://github.com/TenkoSpirit/genshin.zenless.club/commit/8ce940f950892def40ae3c23e74d5f8e4a61a48d))
- **routes:** User information and management ([e054e9b](https://github.com/TenkoSpirit/genshin.zenless.club/commit/e054e9bbb88559c0fac4e3e194dfe8ea1a695a29))
- **routes:** Created a user management page ([7fa747b](https://github.com/TenkoSpirit/genshin.zenless.club/commit/7fa747bf82597c9e94d3c8f61427b7a4eb8d54e4))
- **routes:** Added a button to delete users ([21908ad](https://github.com/TenkoSpirit/genshin.zenless.club/commit/21908ada5e4e6c08c575ee47bf62ce01fff0f8a3))
- **routes:** Use `generateMeta` on posts pages ([edada99](https://github.com/TenkoSpirit/genshin.zenless.club/commit/edada99d8e53010aeb8ee8005a77b80b1eddff18))
- **routes:** Parse post's headings on server instead of client ([543afd3](https://github.com/TenkoSpirit/genshin.zenless.club/commit/543afd300b879f63430e03067c9f1a2e676af6d4))
- **routes:** Updated posts search menu so it allows only one specific language and it also now has labels ([d2e4b70](https://github.com/TenkoSpirit/genshin.zenless.club/commit/d2e4b70c558ed3b6912fb0798229746028b951da))
- **routes, components:** Use recently added `UserAvatar` for avatars ([fad790e](https://github.com/TenkoSpirit/genshin.zenless.club/commit/fad790e9d017e3b081ec97042b7a56d79f44e709))
- **schemas:** Add more strict validity conditions to posts search validator ([3e07205](https://github.com/TenkoSpirit/genshin.zenless.club/commit/3e0720550b5fa659c611624284ab66b4dee2dc93))
- **schemas:** Created user related validators fro name and password ([2868da7](https://github.com/TenkoSpirit/genshin.zenless.club/commit/2868da79a1601f7e968aed1a4c804cd1cb9277df))
- **schemas:** Lang is no longer an array of values but a value instead ([30b8883](https://github.com/TenkoSpirit/genshin.zenless.club/commit/30b8883b9096d40600b8c9ee6d00ac350ca3c6a4))
- **styles:** At least gonna keep progressbar transitions ([c175dbc](https://github.com/TenkoSpirit/genshin.zenless.club/commit/c175dbc362e7c561f2183f083285426efe761d07))
- **utils:** Restored `permissions.ts` ([8256f2a](https://github.com/TenkoSpirit/genshin.zenless.club/commit/8256f2a35edebe2736d3845a02ed7e677590e347))
- **utils:** Created responses shorthands module ([a35aef5](https://github.com/TenkoSpirit/genshin.zenless.club/commit/a35aef5a7fea302f1e687d1f62e804c2a5c9ecc2))
- **utils:** Added `ensureAuthorizedUser` to session manager which returns HTTP 403 if predicate is `false` ([e575d8f](https://github.com/TenkoSpirit/genshin.zenless.club/commit/e575d8fd576d7e3c3a4a244fc5fcda28e07a3fdf))
- **utils:** Export locale settings with const assertion ([3141881](https://github.com/TenkoSpirit/genshin.zenless.club/commit/3141881fafcad2245cf6a075644b593999d87605))
- **utils:** Export `UserLocale` type ([56e52e0](https://github.com/TenkoSpirit/genshin.zenless.club/commit/56e52e04fc43f95071d61c0c3a4f2fb1b27acead))
- **utils:** Return error json response if user's account is not enabled ([841cd55](https://github.com/TenkoSpirit/genshin.zenless.club/commit/841cd5533ece817742bcdd3d57e8aa3732fc7d70))
- **utils:** Created a `jsonError` response to throw errors as a json error ([2489709](https://github.com/TenkoSpirit/genshin.zenless.club/commit/24897099e5a8f06bc3c8e6821b07d718feeceb6d))
- **utils:** Page meta generator function ([1c31d43](https://github.com/TenkoSpirit/genshin.zenless.club/commit/1c31d4364736c0d88852afbbc31a6ad90ff5165c))
- **utils:** Converter of `null`s to `undefined` ([db18af5](https://github.com/TenkoSpirit/genshin.zenless.club/commit/db18af5127b46eb09472480998efa40e71591bd8))
- **utils:** Updated `ifNullToIndefined` with nullish coalesence ([d2d1249](https://github.com/TenkoSpirit/genshin.zenless.club/commit/d2d1249acd32736e869f749223c7c048d7ac5814))
- **utils:** Added `ifNotStringToUndefined` and introduced aliases ([301235e](https://github.com/TenkoSpirit/genshin.zenless.club/commit/301235e25ff897587cb0b4cd0af6c398a93ec197))
- **utils:** Created `extractHeadings` ([d839aee](https://github.com/TenkoSpirit/genshin.zenless.club/commit/d839aee59fc794a28781a082d894dd65b797e55e))
- **No category:** Initial rewrite to Remixjs ([01d1adf](https://github.com/TenkoSpirit/genshin.zenless.club/commit/01d1adf59b9708b2002c2ac75f8a84fda7a3ddcd))
- **No category:** Updated .gitignore ([e1a1d1e](https://github.com/TenkoSpirit/genshin.zenless.club/commit/e1a1d1e84af35b73cc93d91442fb2355021c6730))
- **No category:** Target node 18 ([71d193c](https://github.com/TenkoSpirit/genshin.zenless.club/commit/71d193c50404576b5801adcd6d520a12961b6bb9))

### Miscellaneous Tasks

- **deps:** Upgraded dependencies ([0804982](https://github.com/TenkoSpirit/genshin.zenless.club/commit/08049823a0afd757759c6b5b9a21842e60dacdcb))
- **deps:** Bumped versions ([1c12df3](https://github.com/TenkoSpirit/genshin.zenless.club/commit/1c12df3c259e057fe1239037fb37fb1771aaac48))
- **deps:** Bumped `happy-dom` ([1df444b](https://github.com/TenkoSpirit/genshin.zenless.club/commit/1df444bd285f6546bf0da3064e4e63dcb957b071))

### Refactor

- **root:** Just a little comment related to previous commit ([0da17de](https://github.com/TenkoSpirit/genshin.zenless.club/commit/0da17dedb0b404f239b73fd2efa09d1aa8b3f2c5))
- **utils:** Removed redundant import ([8b8dced](https://github.com/TenkoSpirit/genshin.zenless.club/commit/8b8dced2318ee0b1192a2970467c6ff2f89e2b18))
- **utils:** Renamed some helpers ([523b22f](https://github.com/TenkoSpirit/genshin.zenless.club/commit/523b22f248d06b52807127fa9942ff3ff8d21be9))

### Styling

- **app:** Fixed with eslint ([f8661dd](https://github.com/TenkoSpirit/genshin.zenless.club/commit/f8661dd8282725e8e6c18e66cf816c175e7ee1a3))
- **prisma:** Format schema ([c1e64a2](https://github.com/TenkoSpirit/genshin.zenless.club/commit/c1e64a2f163862dbb33c5b03bcaa985a4c2da70f))
- **prisma:** Formatting schema ([3288f3f](https://github.com/TenkoSpirit/genshin.zenless.club/commit/3288f3f807d20584c630a687d2a3cd0b1430cefb))



## (v1.7.0) - 2022-10-02

### Bug Fixes

- **components:** Gap betweeen header and the contents table ([19fea35](https://github.com/TenkoSpirit/genshin.zenless.club/commit/19fea353f655fb6475bb32bdbe80cfba861e4b42))
- **pages:** Incorrect grid column values on post ([00f7d67](https://github.com/TenkoSpirit/genshin.zenless.club/commit/00f7d6775cae402bbd9bb45a2658f93ae72d968a))
- **pages:** Incorrect total posts ([9d45110](https://github.com/TenkoSpirit/genshin.zenless.club/commit/9d4511090c25ec9cf16dd361ef263cfc5dfae015))
- **pages:** 404 page had some bad styling ([6b444d6](https://github.com/TenkoSpirit/genshin.zenless.club/commit/6b444d6bc6849ab4c7a5890c415ec988692e2ef7))
- **pages:** Profile card should be centered ([4b978e9](https://github.com/TenkoSpirit/genshin.zenless.club/commit/4b978e933c7306ad039356e12cc8d26754764f79))
- **pages:** Posts page content had incorrect classes ([7d9321e](https://github.com/TenkoSpirit/genshin.zenless.club/commit/7d9321e32146e3811f545beac64e05dc3e280fb2))

### Features

- **api:** Created an edpoint to search across posts ([9603015](https://github.com/TenkoSpirit/genshin.zenless.club/commit/96030156d92591c81eab8d28888338f0672bfaf9))
- **api:** Removed search endpoint since using GSSP isntead ([61dc6d3](https://github.com/TenkoSpirit/genshin.zenless.club/commit/61dc6d3073e60101d958cb642a7a4a6ab6e48da6))
- **api:** An endpoint to delete posts ([5b9bdff](https://github.com/TenkoSpirit/genshin.zenless.club/commit/5b9bdff0f4f0d3cb79361df16dfcc3c361de8f04))
- **api, utils:** Moved function that checks if user has enough permissions to delete a post in `permissions.ts` ([4f88713](https://github.com/TenkoSpirit/genshin.zenless.club/commit/4f88713a681eef26b72c94a70c82a0c3a0b4f9d9))
- **app:** Implemented header and removed background color from _document ([479692e](https://github.com/TenkoSpirit/genshin.zenless.club/commit/479692ee768cd54157e57b16915bd0ce8685d6cd))
- **components:** Created a header ([39e5403](https://github.com/TenkoSpirit/genshin.zenless.club/commit/39e54036436a3534c05a4df7eca4964c2d01ba32))
- **components:** Added calculators link to header ([d77451f](https://github.com/TenkoSpirit/genshin.zenless.club/commit/d77451f8579e8cdc744e84cdbd57705f77f1a771))
- **components:** Realigned footer according to new layout ([2a147be](https://github.com/TenkoSpirit/genshin.zenless.club/commit/2a147bea89e34c21839a626a02891f786740ac7d))
- **components:** The container component no longer needs inner wrapper and additional props since it can be customized with classes ([6813a05](https://github.com/TenkoSpirit/genshin.zenless.club/commit/6813a05752e3ad9b4daaa34191d7d8fd022950b0))
- **components:** Create user menu for authenticated users ([b2303ad](https://github.com/TenkoSpirit/genshin.zenless.club/commit/b2303ad264ec0c4543f25c449174f8bdb6ad7db5))
- **components:** Added default title for contents table ([4bc1cd9](https://github.com/TenkoSpirit/genshin.zenless.club/commit/4bc1cd9f23d4a59845b0f0f5627741e70d7a0397))
- **css:** Some fresh styles ([a94599e](https://github.com/TenkoSpirit/genshin.zenless.club/commit/a94599e2aa69de93b991b0589fa53bcf04c80fa8))
- **css:** Created buttons styles ([d76deca](https://github.com/TenkoSpirit/genshin.zenless.club/commit/d76deca85d0b0ad993163786215a6c795146a57a))
- **css:** Added scrol margin to markdown content ([f6e5fb5](https://github.com/TenkoSpirit/genshin.zenless.club/commit/f6e5fb524602d47453fcdc7aca4d47d813e10068))
- **i18n:** Added tranlsation string ([6ca7841](https://github.com/TenkoSpirit/genshin.zenless.club/commit/6ca78417d105ce7ddacb567749d3e4bfbc7f6d95))
- **i18n:** Added translation strings ([6737459](https://github.com/TenkoSpirit/genshin.zenless.club/commit/67374596f36cc6536e94830ffd65b2e88d74bad5))
- **i18n:** Posts specific translation strings ([e4e90fd](https://github.com/TenkoSpirit/genshin.zenless.club/commit/e4e90fd4a254510e2b1a2655f87ac586e3ae40e8))
- **i18n:** Added user menu translation strings ([3533790](https://github.com/TenkoSpirit/genshin.zenless.club/commit/3533790e9264324f3a373dc4ac170c02c965a628))
- **models:** Included lang and type on posts and added options to search by lang ([dea2564](https://github.com/TenkoSpirit/genshin.zenless.club/commit/dea2564c19932d579b4da300eba9c59653a2d539))
- **models:** Count searchable posts function ([4a9b824](https://github.com/TenkoSpirit/genshin.zenless.club/commit/4a9b82438c428bb2e2f37c1941108081986bf09a))
- **models, utils:** Moved a permission check for posts from model to `permissions.ts` ([18ec63e](https://github.com/TenkoSpirit/genshin.zenless.club/commit/18ec63e5676abf45e84a39a4ee7b4977a365d58e))
- **pages:** Added more query options to posts search page ([215e8fe](https://github.com/TenkoSpirit/genshin.zenless.club/commit/215e8feb52a16479884e455de1263ba60144336a))
- **pages:** Removed opacity from search box on posts index page and removed backdrop filter ([7d950a9](https://github.com/TenkoSpirit/genshin.zenless.club/commit/7d950a93e36f2d1913c1e65b17cb93c7ac0d975e))
- **pages:** Implemented new styles ([5c93528](https://github.com/TenkoSpirit/genshin.zenless.club/commit/5c93528c2e4f5bf72326539794af6c08b8fbaed3))
- **pages:** Changed buttons styles on posts paginator ([92601d7](https://github.com/TenkoSpirit/genshin.zenless.club/commit/92601d74a11d9c06ab31d4c0a725c1bd61a66e12))
- **pages:** Added delete and edit buttons to post pages ([cfe35f5](https://github.com/TenkoSpirit/genshin.zenless.club/commit/cfe35f5ceb11c97e6069ea26c690fbd07b563448))
- **pages:** Posts pages will now have contents table displayed properly ([6d1fa1e](https://github.com/TenkoSpirit/genshin.zenless.club/commit/6d1fa1e637106eeb1b1d492b5563f0b7a3e1b132))
- **schemas:** Created validation schema for posts search body ([fe73dfe](https://github.com/TenkoSpirit/genshin.zenless.club/commit/fe73dfefc61848a40ce6255d492ef24738def257))
- **schemas:** Added a query transformer to PostsSearch schema to prevent empty queries from gettign parased as strings ([c822eb6](https://github.com/TenkoSpirit/genshin.zenless.club/commit/c822eb6ad1cf72e55cbc441d496b2c717a98590f))
- **server:** Properly allow html in markdown ([0557439](https://github.com/TenkoSpirit/genshin.zenless.club/commit/05574395bfabb1aee3103d0b0d72a3ad35640d9c))

### Miscellaneous Tasks

- **deps:** Bump dependencies ([79fd32e](https://github.com/TenkoSpirit/genshin.zenless.club/commit/79fd32ef41342fa8a687d63ade24d846ee88cf60))
- **deps:** Added headlessui ([aa62d19](https://github.com/TenkoSpirit/genshin.zenless.club/commit/aa62d19e7db6e1327290897253310fe61c2fe85b))

### Refactor

- **components:** Removed redundant import ([e7399d4](https://github.com/TenkoSpirit/genshin.zenless.club/commit/e7399d437afe826c49903c6e5fbfccf0919f00a1))

### Refacotr

- **pages:** `canUserEditPost` was moved and reference in post edit page was updated ([8ac7870](https://github.com/TenkoSpirit/genshin.zenless.club/commit/8ac7870840dc287545553ebca3c859241ba18437))



## (v1.6.0) - 2022-09-20

### Bug Fixes

- **Docker:** Node 16 is required ([315806a](https://github.com/TenkoSpirit/genshin.zenless.club/commit/315806ab88cd428a93b9ec1734f9932c5e98316e))
- **css:** Some incorrect styles on input field ([f75fe89](https://github.com/TenkoSpirit/genshin.zenless.club/commit/f75fe8924ac3458da7453130dffd3cbc0e4ed55c))
- **pages:** `/me` will redirect to correct sign in url now ([51e8fa7](https://github.com/TenkoSpirit/genshin.zenless.club/commit/51e8fa7ed77e1be599ff0fe25902b08ab10ff579))
- **pages:** Posts card height now should be normal and not extend itself if there's just one or two cards ([348d642](https://github.com/TenkoSpirit/genshin.zenless.club/commit/348d6420930ec8bff5cc0e55815b51f3a2e29373))
- **pages:** Characters index page used i18n string without providing count when it was needed ([89fb41a](https://github.com/TenkoSpirit/genshin.zenless.club/commit/89fb41ac26a8de18c98bd57a6a7c941b47eb48a8))
- **tailwind:** There was a built-in active slector, custom one was overriding it ([baf1a04](https://github.com/TenkoSpirit/genshin.zenless.club/commit/baf1a045be9b655eb04f6059d8de376b8f46e39f))

### Features

- **api:** Updated next-auths endpoint so it lets sign in only users from the allowlist ([c845bcd](https://github.com/TenkoSpirit/genshin.zenless.club/commit/c845bcd114127c9e5b9bfef4c3518c31d61ef3ef))
- **api:** Created an api route to create new posts ([76dbb0e](https://github.com/TenkoSpirit/genshin.zenless.club/commit/76dbb0e50d0b7eb524e75bde69251a308256e62b))
- **api:** Created an epi endpoint so posts can be edited ([c87b8b4](https://github.com/TenkoSpirit/genshin.zenless.club/commit/c87b8b421df7193eb6cdc282914af1a87f5d65ab))
- **app:** Migrate from `next-i18next` to `next-intl` ([d8d5501](https://github.com/TenkoSpirit/genshin.zenless.club/commit/d8d5501bb219746490da345eb8d3dd31e075550a))
- **app:** Bringing back `next-intl` ([14a3459](https://github.com/TenkoSpirit/genshin.zenless.club/commit/14a3459e4c11faa9fe4515cc845b10e0bdcb04d8))
- **assets:** Switch from scss to regular css ([e3101e4](https://github.com/TenkoSpirit/genshin.zenless.club/commit/e3101e4e9c21c8c098b389adaca66df630ac508d))
- **auth, pages:** Created a custom sign in page for next-auth ([6332f31](https://github.com/TenkoSpirit/genshin.zenless.club/commit/6332f3137dda3797e73826b6dd49860f1623b393))
- **components:** Remove active state from desktop navigation links and included hover animations ([12b976e](https://github.com/TenkoSpirit/genshin.zenless.club/commit/12b976e0617a4132e5dcec1bf17ad2e646e37038))
- **components:** Added shadow on hover to guide cards ([d0ff26c](https://github.com/TenkoSpirit/genshin.zenless.club/commit/d0ff26c717cb162ffb37437820adbb9f0e69290d))
- **components:** Ability to override main classes ([ed6b38c](https://github.com/TenkoSpirit/genshin.zenless.club/commit/ed6b38c91a4f7d488e3f1ae51bed30063989a77c))
- **components:** Added dark mdoe support to navigation ([409f482](https://github.com/TenkoSpirit/genshin.zenless.club/commit/409f48289c7e161a621c253068c121b52d7c2811))
- **components:** Birthdays today card is now dark mode compatible ([3651cda](https://github.com/TenkoSpirit/genshin.zenless.club/commit/3651cdaaf10e005d714f403254b625ed966a2aa7))
- **components:** Character card now supports dark mode ([3cb7198](https://github.com/TenkoSpirit/genshin.zenless.club/commit/3cb71986be5c892f513055cdacda0ff9c0a29375))
- **components:** Custom input now supports dark mode and supports tailwind class overrides ([01a4cad](https://github.com/TenkoSpirit/genshin.zenless.club/commit/01a4cad5fd8d6d97159560d5480d54ce3308c045))
- **components:** Guide card is now dark mode compatible ([9a710a7](https://github.com/TenkoSpirit/genshin.zenless.club/commit/9a710a71d00eefa6ba88d87b80a02867d970ab9c))
- **components:** Contents table now supports dark mode ([5c0e03d](https://github.com/TenkoSpirit/genshin.zenless.club/commit/5c0e03d526094771fc6cab74504c6567d75b8bf2))
- **components:** Footer is now dark mode compatible ([8934cff](https://github.com/TenkoSpirit/genshin.zenless.club/commit/8934cffe43b35a2170c0fdcd3627050cc0d575c0))
- **components:** Created `RoleBadge` to display user's role in a nicely formatted way ([8956b08](https://github.com/TenkoSpirit/genshin.zenless.club/commit/8956b08e2e40c65a45835fd84653ce0826e5c355))
- **components:** Role badge text is now smaller ([4866f9d](https://github.com/TenkoSpirit/genshin.zenless.club/commit/4866f9ddc6149d8753c40a39f13d0a25c3dff5a3))
- **components:** Loading state component ([f8ac162](https://github.com/TenkoSpirit/genshin.zenless.club/commit/f8ac1626b76052c1c2a9dc93fb4ec0ceb1726719))
- **components:** Added `/posts` to navigation ([efd911b](https://github.com/TenkoSpirit/genshin.zenless.club/commit/efd911b265e2fe9e5119968a6cf7f732fdd12dc7))
- **components, css:** Moved contents table container classes into css so it's overridable ([55ec66e](https://github.com/TenkoSpirit/genshin.zenless.club/commit/55ec66e4ec438f58999e28e5a2f3f708b8aa08c0))
- **css:** Added dark background and text colours ([40fabd1](https://github.com/TenkoSpirit/genshin.zenless.club/commit/40fabd117586db187a2fc94b8bdfed1c542038ce))
- **css:** Created custom input styles ([a0bc052](https://github.com/TenkoSpirit/genshin.zenless.club/commit/a0bc052578664ae7894783dab87657d7dced8960))
- **css:** Created styles for radio buttons ([a05592b](https://github.com/TenkoSpirit/genshin.zenless.club/commit/a05592b7db12ed281ce7cd8ffc2c9d54b3b72f1c))
- **hooks:** A shorthand hook that requires user session and redirects to `/signin` or desired location ([38b529a](https://github.com/TenkoSpirit/genshin.zenless.club/commit/38b529afc1136b877a69581db6c740c9dec6b9c8))
- **hooks:** A custom hook returning session data of an authorized user based on roles ([a0c46e4](https://github.com/TenkoSpirit/genshin.zenless.club/commit/a0c46e4d4097dff30fe18602542a300cb54f7e87))
- **i18n:** Converted English common strings to ICU format ([8d02fa5](https://github.com/TenkoSpirit/genshin.zenless.club/commit/8d02fa5aa05b2458968435b39c1d94e65f7dc23a))
- **i18n:** Added posts translation string ([3c16122](https://github.com/TenkoSpirit/genshin.zenless.club/commit/3c16122bf8e6a240ed2dbea3b8ae880feda4fe4e))
- **models:** Some basic functions to work with posts table ([d81d0ce](https://github.com/TenkoSpirit/genshin.zenless.club/commit/d81d0cec622b7059507a89019e7d57017b80bfe5))
- **models:** Added a search function to posts model ([0959773](https://github.com/TenkoSpirit/genshin.zenless.club/commit/0959773d7ea4c94d9e448cb7d3aa4def5777ed8f))
- **models:** Added `canUserEditPost` to posts model ([78fdc04](https://github.com/TenkoSpirit/genshin.zenless.club/commit/78fdc04e393c2d99a086479bc4cfb9db6b25d843))
- **next.config:** Move i18n config in the next config, i18next is not being used anymore ([8fa1b1e](https://github.com/TenkoSpirit/genshin.zenless.club/commit/8fa1b1efe3f18251994f0f7ff96b53cd1b1c6a63))
- **npm:** Removed postinstall ([76a6a84](https://github.com/TenkoSpirit/genshin.zenless.club/commit/76a6a849bb168543a40dfbbf5aa0467be3b3621f))
- **npm:** Added a script to run development server including a watcher for locale files changes ([fe4eae7](https://github.com/TenkoSpirit/genshin.zenless.club/commit/fe4eae7024a071a0bf84343ed10048542296ecc8))
- **npm:** Ok that's quite a bad solution that spawns a lot of sub processes, not cool ([10e3aad](https://github.com/TenkoSpirit/genshin.zenless.club/commit/10e3aad0c0ad78e65baef852379ff2893a00916c))
- **pages:** Characters search and filter is not sticky ([2c6f889](https://github.com/TenkoSpirit/genshin.zenless.club/commit/2c6f88924796af19040a7c524260c0788c774316))
- **pages:** Index page is now dark mode compatible ([bc471f4](https://github.com/TenkoSpirit/genshin.zenless.club/commit/bc471f4ccb7921c32f6f7a0425ef679a1069cdb2))
- **pages:** Settings page now supports dark mode ([a55c1cd](https://github.com/TenkoSpirit/genshin.zenless.club/commit/a55c1cd05e3e70f5a7c4d441fd40e6724b3aebdf))
- **pages:** Guides idnex page now supports dark mode ([f071372](https://github.com/TenkoSpirit/genshin.zenless.club/commit/f07137298bb0b8f9bd0a48169b9fc777118afb77))
- **pages:** Custom 404 page now supports dark mode ([f78158f](https://github.com/TenkoSpirit/genshin.zenless.club/commit/f78158fc16ee1ccb23ad58b4b93bbfcd4e33ebc7))
- **pages:** Settings now allow switch to dark mode ([7222ac9](https://github.com/TenkoSpirit/genshin.zenless.club/commit/7222ac9043ee949d253a66269b1578f047e7f543))
- **pages:** Added `/me` page that disaplys information about current session's user ([78b8720](https://github.com/TenkoSpirit/genshin.zenless.club/commit/78b8720a1582f312753e1a90b5e6e1b4a11bfb58))
- **pages:** Added user id and a button to copy it to clipboard ([7ab12c7](https://github.com/TenkoSpirit/genshin.zenless.club/commit/7ab12c7d9becd98ea55d8e8fa14fb7f7e3a4f000))
- **pages:** Created a new post form ([de9476e](https://github.com/TenkoSpirit/genshin.zenless.club/commit/de9476edd92e7108eeac565cbf96db166ea9a1e8))
- **pages:** Display post page ([a939529](https://github.com/TenkoSpirit/genshin.zenless.club/commit/a93952910c3af30a6bd1c57365a7205c89516248))
- **pages:** `/me` doesn't need SEO optimization, so it can be static ([03c9486](https://github.com/TenkoSpirit/genshin.zenless.club/commit/03c94861ebcf891e0eaf9914c6e6e8f127c3ce48))
- **pages:** `/posts/new` can be static too ([f821dbb](https://github.com/TenkoSpirit/genshin.zenless.club/commit/f821dbb214bfce6af9b66b80590e7879993125bf))
- **pages:** Created posts index page ([21e2df2](https://github.com/TenkoSpirit/genshin.zenless.club/commit/21e2df240e3663266c210ba5dc86a89fae4fadde))
- **pages:** Created a directory for subroutes of posts ([c07287f](https://github.com/TenkoSpirit/genshin.zenless.club/commit/c07287f42330fc2ba55e97b9af8ddf3d6eded9f8))
- **pages:** A way to edit a post (WIP) ([bdc980a](https://github.com/TenkoSpirit/genshin.zenless.club/commit/bdc980aeb50c4a03361ed2a95665a9ccc861919c))
- **pages:** On `/posts` added explicit typing to server side props generator, added search input field, fixed minor css issues ([42af15a](https://github.com/TenkoSpirit/genshin.zenless.club/commit/42af15ad96549a87ad71cfae148de5b7ac3581d3))
- **pages:** On `/posts/[slug]` updated the looks of the article and separated title from the article card itself, changed some breakpoints for better mobile UX ([33388f5](https://github.com/TenkoSpirit/genshin.zenless.club/commit/33388f595d90ea57f0699e1ebee33d5b9b44da87))
- **pages:** Edit page of a post is now finished and more flexible ([5763d67](https://github.com/TenkoSpirit/genshin.zenless.club/commit/5763d67e00ddb703f5337d23803b4cd23ed2247a))
- **pages, css:** Guide view page now supports dark mode ([8b0f468](https://github.com/TenkoSpirit/genshin.zenless.club/commit/8b0f468388a6dc519c2b5060ec3410c180e452dc))
- **prisma:** Created models for posts ([19da494](https://github.com/TenkoSpirit/genshin.zenless.club/commit/19da4944580b5a1ebf91c38f0543995e12eb7bcc))
- **prisma:** Posts should have a language code ([3f41279](https://github.com/TenkoSpirit/genshin.zenless.club/commit/3f41279ee1ac2e65008435538b5bad121cabf617))
- **prisma:** `PostContent` now must be unique according to each existing `Post` ([78d6ec0](https://github.com/TenkoSpirit/genshin.zenless.club/commit/78d6ec0da986f5a522ed603483118260b8ca26a0))
- **prisma:** Enabled full text search ([a6f7190](https://github.com/TenkoSpirit/genshin.zenless.club/commit/a6f71904057c00e015c4a732a6ae6bf53980b379))
- **prisma:** Added editor to `Post` model ([e747ab9](https://github.com/TenkoSpirit/genshin.zenless.club/commit/e747ab93eae8fc34e71b50016380078b0459af15))
- **schemas:** Moved posts creation and edit zod schema to a separate file ([122c0b5](https://github.com/TenkoSpirit/genshin.zenless.club/commit/122c0b5ef11218aa909f9d8bd7c1c6cac219aa76))
- **server, utils:** Added role checking functions ([0429344](https://github.com/TenkoSpirit/genshin.zenless.club/commit/04293441069c262b3931e424bbf9bcfacdb93a1d))
- **tailwind:** Enable dark mode ([ed9d4e1](https://github.com/TenkoSpirit/genshin.zenless.club/commit/ed9d4e1b54432fe3f79f8c223a18dccc7d1a4e2a))
- **tailwind:** Purple is now a primary color ([799f052](https://github.com/TenkoSpirit/genshin.zenless.club/commit/799f052cbe2538017d14cbfec07d001fa3edc93d))
- **types:** Added property types on `next-auth`'s session and user ([a74d827](https://github.com/TenkoSpirit/genshin.zenless.club/commit/a74d82784afca1f64cbb100eb1a6c2f723d193e7))
- **types:** Created generic helper type `Nil` ([69f4d8c](https://github.com/TenkoSpirit/genshin.zenless.club/commit/69f4d8c6c022edcf21547c4a78c4a297babf2fad))
- **types:** Created custom `ZenlessJsonResponse` in order to unify json responses across local API ([89ceffe](https://github.com/TenkoSpirit/genshin.zenless.club/commit/89ceffecc39b4ff463be4acb0a8004f668e229b0))
- **utils:** Created safe and unsafe markdown parsers ([d823960](https://github.com/TenkoSpirit/genshin.zenless.club/commit/d823960056aec2bae35c2d3f864e60a7af5e781d))
- **utils:** Created a check function to see if user has any of the provided roles ([b86b13a](https://github.com/TenkoSpirit/genshin.zenless.club/commit/b86b13a2ffdd83c58bc33b2c6264046a71514290))
- **utils:** Updated `userHasAnyRole` so it can accept nullish values ([8bc3065](https://github.com/TenkoSpirit/genshin.zenless.club/commit/8bc3065297fe3a1b5d0121e7f0cc3f8265f0d79b))
- **workflows:** Disable docker builder for now ([613cb43](https://github.com/TenkoSpirit/genshin.zenless.club/commit/613cb4382d47c047c0e05c2211073a7f713e0196))
- **No category:** Added discord authentication with `next-auth` ([1673c6b](https://github.com/TenkoSpirit/genshin.zenless.club/commit/1673c6b97821e95e4d1900296a8aa1edbb9d75cb))

### Miscellaneous Tasks

- **deps:** Upgrades ([05b351a](https://github.com/TenkoSpirit/genshin.zenless.club/commit/05b351a33546a013f88286024065269ea19172a6))
- **deps:** Upgraded deps and added tiny-invariant ([813381a](https://github.com/TenkoSpirit/genshin.zenless.club/commit/813381ab32ce3e7382c3a95d680d0a42d62e959b))
- **No category:** Updated next config and enable swc minification ([6c8bea8](https://github.com/TenkoSpirit/genshin.zenless.club/commit/6c8bea8317a64fc1671ae70b84ad857e6c55a4ee))
- **No category:** Converted next config to ES module ([21dd221](https://github.com/TenkoSpirit/genshin.zenless.club/commit/21dd221490796e9508a1c6e3ef3f3fee2c9bec0e))

### Refactor

- **api:** Use schema from predefined schemas ([9e0be05](https://github.com/TenkoSpirit/genshin.zenless.club/commit/9e0be053ad807c1de8ac25a339ac2a40311a89d3))
- **hooks:** Renamed from camel case to something different hehe ([b43f1a4](https://github.com/TenkoSpirit/genshin.zenless.club/commit/b43f1a4fbc816fa854bfbcaaebf659b885ddb1a4))
- **pages:** Removed redundant import in 404 page ([b4cc04c](https://github.com/TenkoSpirit/genshin.zenless.club/commit/b4cc04cc0630b80dea91f598b9cae5ec38f8c85a))
- **pages:** Some optimization to server side props of posts index page and fixed styles on mobile ([b8cac2b](https://github.com/TenkoSpirit/genshin.zenless.club/commit/b8cac2b8ef9e235e682076f647421eb08b5aafb5))
- **No category:** Renamed lib to utils ([4d30ce5](https://github.com/TenkoSpirit/genshin.zenless.club/commit/4d30ce519b86c089c43f4c1a2a82993129242266))



## (v1.5.2) - 2022-09-08

### Bug Fixes

- **components:** Guide card was causing hydration mismatches ([d8f8602](https://github.com/TenkoSpirit/genshin.zenless.club/commit/d8f86029c7346a451cd41963e370efd19f987f5c))

### Features

- **README:** Updated roles and added GetMads to team section ([aa8e4ea](https://github.com/TenkoSpirit/genshin.zenless.club/commit/aa8e4ea48e45ef4fbf69517800148a10882eca6b))
- **_app:** Removed redundant dayjs things, since we're using ISO formats now ([b118631](https://github.com/TenkoSpirit/genshin.zenless.club/commit/b118631a130f0405baead3fc10bc4bfae4447c04))
- **atoms:** Use JS built-in `Date`s to calculate resin replenishment instead of 3rd party lib ([41542b4](https://github.com/TenkoSpirit/genshin.zenless.club/commit/41542b4c7111158c01f514e723b8c4186519db0d))
- **components:** Updated guide card, now has read button and doesn't display authors and publish dates ([04d30e1](https://github.com/TenkoSpirit/genshin.zenless.club/commit/04d30e14e1dab4110f2a2c24306f9322cf612be0))
- **components:** Guide card read button now takes full width and doesn't have an icon ([4040911](https://github.com/TenkoSpirit/genshin.zenless.club/commit/4040911a972b75884173d46151c89d63b43b02f4))
- **components:** Birthdays today is now translated and informs users if there are no birthdays on the day ([ae1a279](https://github.com/TenkoSpirit/genshin.zenless.club/commit/ae1a279715d7105f051a589ca692e3349aae06b1))
- **components:** Footer now takes full space ([42b5c7f](https://github.com/TenkoSpirit/genshin.zenless.club/commit/42b5c7f5504365dd82fac7f7a33d01990bd9da44))
- **components:** Using JS `Date`s instead of dayjs to detrmine current day in `BirthdaysToday` ([ac18bf2](https://github.com/TenkoSpirit/genshin.zenless.club/commit/ac18bf2ad7bcaf8e1ca1777f6d9d7a75f78da33c))
- **hooks:** Added a hook to get currently active locale ([1f11c76](https://github.com/TenkoSpirit/genshin.zenless.club/commit/1f11c76fe3cdef611a1dccd464928941ba5b4bbc))
- **i18n:** Translation strings added ([1ec65b8](https://github.com/TenkoSpirit/genshin.zenless.club/commit/1ec65b84e6a8f9fa64e0236578f68381cbb4f24b))
- **i18n:** Even more strings added ([b7bd03d](https://github.com/TenkoSpirit/genshin.zenless.club/commit/b7bd03d2752bed0d07b1029541195a381dec183f))
- **pages:** Guide articles now have footers containing authors and publish date ([dbaaf9d](https://github.com/TenkoSpirit/genshin.zenless.club/commit/dbaaf9d740dd088d16e4db868c8d427fd02ef1fc))
- **pages:** Switched fynamic no SSR import of birthdays card to regular import ([025dc63](https://github.com/TenkoSpirit/genshin.zenless.club/commit/025dc63f77b70abc943e2d142ed26f1318e268c2))
- **pages:** Instead of using dayjs for date formatting using JS built-in formatter based on Intl API ([9ffa758](https://github.com/TenkoSpirit/genshin.zenless.club/commit/9ffa758b8ad46bb7f43501d2dd3f068fcb682b9f))
- **pages:** Format resin replenishment time with JS built-in Intl formatter ([4a854b4](https://github.com/TenkoSpirit/genshin.zenless.club/commit/4a854b45ba3685a7c9a199a6670c9145adff1913))

### Miscellaneous Tasks

- **deps:** Upgraded dependencies ([8cce34c](https://github.com/TenkoSpirit/genshin.zenless.club/commit/8cce34cae90079c1d3ace04aeeb98afc560ca2a9))
- **deps:** Bumped dependencies versions ([33c2f8b](https://github.com/TenkoSpirit/genshin.zenless.club/commit/33c2f8bcae92ec3ce340dff8a827fb2a0e30dfd3))
- **deps:** Removed dayjs ([d6642a5](https://github.com/TenkoSpirit/genshin.zenless.club/commit/d6642a5650e3f8e675519baafb3d0bd438347360))

### Refactor

- **_app:** Removed dayjs imports ([7380303](https://github.com/TenkoSpirit/genshin.zenless.club/commit/73803033061bf9b500bc5735d8c1ac2bda84c87f))



## (v1.5.1) - 2022-08-26

### Bug Fixes

- **No category:** Dark mode worked for website title for some reason ([54a0e84](https://github.com/TenkoSpirit/genshin.zenless.club/commit/54a0e842f636ecfb0030670721906c703f0fbf72))



## (v1.5.0) - 2022-08-26

### Bug Fixes

- **pages:** Autofocus wasn't that great of idea since on mobile it's very annoying ([49b810e](https://github.com/TenkoSpirit/genshin.zenless.club/commit/49b810e107086254371908b51ffcf398d0a9e416))

### Features

- **app:** Big design refresh ([18308dc](https://github.com/TenkoSpirit/genshin.zenless.club/commit/18308dc6422facaa65f5c978b50ade0237a31a25))
- **components:** Display full domain name as title ([3110052](https://github.com/TenkoSpirit/genshin.zenless.club/commit/3110052153bdd8fea002dad354d5ceff735d1de3))
- **components:** Shadows were causing performance issues so switched guide cards styles to something simpler ([8e9fc7e](https://github.com/TenkoSpirit/genshin.zenless.club/commit/8e9fc7e2264554eb3c7142c1ed6acb6a6c9a61ea))
- **i18n, pages:** Added translations to guide types ([dae36d9](https://github.com/TenkoSpirit/genshin.zenless.club/commit/dae36d9448fe69c7411134af3a5901e68e8ff950))
- **pages:** Query params search is no more, only input field is allowed ([40e6460](https://github.com/TenkoSpirit/genshin.zenless.club/commit/40e6460c8f85ef6cb9f021dc61511d1426bb401b))
- **pages:** Removed redundant top margin from guide cards container ([253442f](https://github.com/TenkoSpirit/genshin.zenless.club/commit/253442f77216ea3051221010c05ac5678f6e00b8))
- **pages:** Guides search input field is now controlled and also ahs autofocus ([0fb73bf](https://github.com/TenkoSpirit/genshin.zenless.club/commit/0fb73bf9202b08c3022756c5cae5f28fdbc03de6))
- **tailwind:** Remove custom font and use blue as primary colour ([8338e01](https://github.com/TenkoSpirit/genshin.zenless.club/commit/8338e015e7f2a0652af49d6e9dab5844a1746640))

### Miscellaneous Tasks

- **deps:** Upgraded dependencies ([d369798](https://github.com/TenkoSpirit/genshin.zenless.club/commit/d36979870ec49df75bbb93eb3b4e7a73fc68e1d0))

### Refactor

- **pages, components:** Heroicons had major changes that required code updates ([9e56d9b](https://github.com/TenkoSpirit/genshin.zenless.club/commit/9e56d9b579abcd89fd14cf4f3c5d4bfd96109a4e))



## (v1.4.2) - 2022-08-24

### Bug Fixes

- **data:** Amber is a 4* not 5* ([e4be714](https://github.com/TenkoSpirit/genshin.zenless.club/commit/e4be714b04535e402528a148c24944086710b401))
- **data:** Added Noelle to all characters and included assets ([dfeb5c6](https://github.com/TenkoSpirit/genshin.zenless.club/commit/dfeb5c624ee3bb522e69cf7719ac1680a0e0a78e))
- **guides:** Typo in "stats" in Russian Ayaka guide ([5e70ef8](https://github.com/TenkoSpirit/genshin.zenless.club/commit/5e70ef8437f99352df95cd2707b419ec8e36fa9c))
- **i18n:** Typo in Russian `yae_miko` name translation ([b50a104](https://github.com/TenkoSpirit/genshin.zenless.club/commit/b50a10441debca84501718f55b2f3f61fe236249))
- **i18n:** Typo in Russian Keqing translation ([64373cc](https://github.com/TenkoSpirit/genshin.zenless.club/commit/64373cce65ffb64032c89544d04efbb06b64a66b))
- **i18n:** Missing Noelle name translation ([28cff03](https://github.com/TenkoSpirit/genshin.zenless.club/commit/28cff0320ffdec7a4633571314a944a75c7d3ac5))

### Features

- **data:** Added dendro and made story an optional data sicne it's going to be in locales soon ([7cc56b0](https://github.com/TenkoSpirit/genshin.zenless.club/commit/7cc56b03ce1280f5c162a3d52d819268c840986c))
- **data:** Added Tighnari ([61adaa8](https://github.com/TenkoSpirit/genshin.zenless.club/commit/61adaa880b635d86976cefee4229e631a54b6501))
- **data:** Added Collei ([9886510](https://github.com/TenkoSpirit/genshin.zenless.club/commit/98865107caa6c824efb84d652bf2ef15be11d1eb))
- **pages:** Preserve whitespaces on descriptions ([5a45033](https://github.com/TenkoSpirit/genshin.zenless.club/commit/5a4503324c3e2b1e11777de4172ed06d95a2b58d))
- **pages:** Made rarity filters buttons smaller ([a04e456](https://github.com/TenkoSpirit/genshin.zenless.club/commit/a04e456de1fea06de1d6042d2d380f6d541c0302))
- **pages, atoms:** Added characters rarity filtering ([ec7dee7](https://github.com/TenkoSpirit/genshin.zenless.club/commit/ec7dee73d439dae548356823fe2bb4227c2d2e27))

### Miscellaneous Tasks

- **deps:** Upgraded some packages ([99bbcbb](https://github.com/TenkoSpirit/genshin.zenless.club/commit/99bbcbb92ee74c032b281547d2fc14827888ec68))



## (v1.4.1) - 2022-08-09

### Bug Fixes

- **components:** Dark colors on guide cards were missing ([5b29ce4](https://github.com/TenkoSpirit/genshin.zenless.club/commit/5b29ce4d031a3e4f37aa1f54f5a6e66854cd0dce))
- **css:** Semibold font style should be applied only to summary not all details tag ([15b0d5d](https://github.com/TenkoSpirit/genshin.zenless.club/commit/15b0d5d05dcbada36ed5900c7fdc31c2460c45e0))
- **guides, css:** Iframes were causing overflows ([1061857](https://github.com/TenkoSpirit/genshin.zenless.club/commit/10618571c5eb6d3c183ac62ef19c45dc7ede762a))

### Features

- **app:** Switched from `next-translate` to `next-i18next` ([93e4e36](https://github.com/TenkoSpirit/genshin.zenless.club/commit/93e4e36a9abf9ee8bae586ae6bc3e29e7299826f))
- **components:** Authors on guide cards will be always at the bottom ([964c90c](https://github.com/TenkoSpirit/genshin.zenless.club/commit/964c90c2e7e03e3c00b38b5c20cc8beac5033eb2))
- **components:** Added hyphens to description text ([eebb2b1](https://github.com/TenkoSpirit/genshin.zenless.club/commit/eebb2b1c730bc6b4142903f4e84217d2c1c6b2ca))
- **css:** Added styles for details tag that is parsed from markdown ([d2de6e3](https://github.com/TenkoSpirit/genshin.zenless.club/commit/d2de6e3457e845c5b287df16c70f64c4ff478bdc))
- **css:** Added dark styles for details tag ([aec44c5](https://github.com/TenkoSpirit/genshin.zenless.club/commit/aec44c5b731c74c1f8663b3c4831585a09b64ef5))
- **css:** Added custom styling to table ([29a64ee](https://github.com/TenkoSpirit/genshin.zenless.club/commit/29a64eeac0544d68b0d32497a452da5d300fc5fa))
- **css:** Adjusted styles of lists in markdown content ([26cfa4a](https://github.com/TenkoSpirit/genshin.zenless.club/commit/26cfa4a53692a6ad0a2fb3b3cb81a192801d4b72))
- **css:** Added spacing between iframes ([fee97ed](https://github.com/TenkoSpirit/genshin.zenless.club/commit/fee97ed8a463dd7f633f3f4c8ee432c4d64ecc1c))
- **guides:** Added Kamisato Ayaka guide in Russian ([c99ac1a](https://github.com/TenkoSpirit/genshin.zenless.club/commit/c99ac1a15b5083b80cb82c6de955efe5bb658d3d))
- **guides:** Updated publish timestamp on Ayaka's guide ([959e9d1](https://github.com/TenkoSpirit/genshin.zenless.club/commit/959e9d11dfe675ca5d7bad0910f795bab40c71db))
- **guides:** Added temp Ayaka guide file for English, so the project compiles ([e3ba853](https://github.com/TenkoSpirit/genshin.zenless.club/commit/e3ba853b041427d1286de228fb9a5b2634d3c4a0))
- **i18n:** Added translation strings for home page ([91c77a0](https://github.com/TenkoSpirit/genshin.zenless.club/commit/91c77a055a77e983d7dd4f0b1e18ea61c4211fdb))
- **i18n:** Added translation strings for character names ([535bad4](https://github.com/TenkoSpirit/genshin.zenless.club/commit/535bad4845a7d620020dab71f5e26d4b67e85c17))
- **lib:** Allow html in markdown ([e888c68](https://github.com/TenkoSpirit/genshin.zenless.club/commit/e888c6844d1dec4932feda13eb3164ccc5a9e487))
- **lib:** Updated markdown parser ([803b4d1](https://github.com/TenkoSpirit/genshin.zenless.club/commit/803b4d1bb297066ec08c3da65464d3db8f48fa6b))
- **pages:** Apply recently create styles for markdown ([07857b7](https://github.com/TenkoSpirit/genshin.zenless.club/commit/07857b76896e90e8572208fcc69264c2ec48b5cd))
- **pages:** Use guide's meta title as an actual page title ([a6afac7](https://github.com/TenkoSpirit/genshin.zenless.club/commit/a6afac704d7b9945aba550a5609e5001cfcc4ae3))
- **pages:** Use `article` HTML tag for the guide content and `thead` doesnt have a border anymore ([cc6dfc8](https://github.com/TenkoSpirit/genshin.zenless.club/commit/cc6dfc80bad4d9755d2bcace0a079feb3c5d7551))
- **pages, components:** Added latest guide promotion and adjusted styles ([c938824](https://github.com/TenkoSpirit/genshin.zenless.club/commit/c9388248fb9ec98512a468d10da34e5aae7673af))
- **pages, components:** Implemented translations for character names ([82a23db](https://github.com/TenkoSpirit/genshin.zenless.club/commit/82a23dbd91473f601e5805d1b2391940505199e2))
- **pages, guides:** Prevent showing guides that don't exist in current user's context and published list of guides now support languages ([b96b874](https://github.com/TenkoSpirit/genshin.zenless.club/commit/b96b874b6ee54658b2b25db1fa32fc07fa7e025f))
- **tailwind:** Added a special utility class that adds automatic hyphens to text ([501bdef](https://github.com/TenkoSpirit/genshin.zenless.club/commit/501bdef77601d338990a641262b4d0897b733327))

### Miscellaneous Tasks

- **deps:** Upgraded dependencies ([8093eae](https://github.com/TenkoSpirit/genshin.zenless.club/commit/8093eae2a2cc74152e6b7b56af6a738d0b7fce83))



## (v1.4.0) - 2022-08-01

### Bug Fixes

- **components:** Bg color should be important on calculator input ([40326b8](https://github.com/TenkoSpirit/genshin.zenless.club/commit/40326b8d2aa318d8e3cf9e39e55573a289d4a8a3))

### Features

- **components:** Updated guide card look ([350d3b6](https://github.com/TenkoSpirit/genshin.zenless.club/commit/350d3b6bbe6367e844e380571df4361d7a666fb5))
- **components:** Lighter active color on mobile ([46fafd4](https://github.com/TenkoSpirit/genshin.zenless.club/commit/46fafd48b5c9c206a81122f4abe68a7df24657ac))
- **components:** Updated navigation looks ([913de67](https://github.com/TenkoSpirit/genshin.zenless.club/commit/913de676aa3a5fb0b64c9f6718abadbf94fa43ea))
- **guides:** Author is required meta tag ([dfa8931](https://github.com/TenkoSpirit/genshin.zenless.club/commit/dfa8931cc4b4d7e7b9fd1525b8709517934c080b))
- **pages:** Updated guides index page ([3cf55e2](https://github.com/TenkoSpirit/genshin.zenless.club/commit/3cf55e236a469c5c97b86774f14c3197639eee9b))
- **pages:** Updated settings looks ([776cb8b](https://github.com/TenkoSpirit/genshin.zenless.club/commit/776cb8bbf8ed4ce618018cc0e5d19d4857a36ae4))



## (v1.3.0) - 2022-07-31

### Bug Fixes

- **components:** Closes #18 ([38ca837](https://github.com/TenkoSpirit/genshin.zenless.club/commit/38ca837116373273075e872a378924833cd29212))
- **settings:** Firefox complains about missing SameSite :/ ([bccf330](https://github.com/TenkoSpirit/genshin.zenless.club/commit/bccf330326ff27884896f9adb7ae6353852f6fd1))

### Features

- **_app:** Instead of setting dayjs locale globally we should set it on demand, that way it'll be easier and will prevent some weird framework perls ([10c7966](https://github.com/TenkoSpirit/genshin.zenless.club/commit/10c7966acf9e4016530dbe583950af7380ba06aa))
- **app:** General appearance updated ([01c516b](https://github.com/TenkoSpirit/genshin.zenless.club/commit/01c516be8c6b9a8943ae8f983112f596c93472a3))
- **atoms:** Set init guide search value to `all` ([f36059f](https://github.com/TenkoSpirit/genshin.zenless.club/commit/f36059f20b0ece09d438ebc496ed3ed3ead11532))
- **components:** Support unix timestamps for guide cards ([01a842a](https://github.com/TenkoSpirit/genshin.zenless.club/commit/01a842a973345c011a4f15c6f99b07b260a4a7fe))
- **components:** Display guides publish date in some sort of an ISO format instead of depending on external packages for dayjs ([9305e72](https://github.com/TenkoSpirit/genshin.zenless.club/commit/9305e72e214890d1e3601abf25caffaebeabc934))
- **components:** Use smaller text in birthdays card ([0a1a9b2](https://github.com/TenkoSpirit/genshin.zenless.club/commit/0a1a9b29651a3a1490ef333206a9101117ff713f))
- **guides:** Removed Ayaka test guide page and added titles to Raiden guides ([4e564a8](https://github.com/TenkoSpirit/genshin.zenless.club/commit/4e564a8dbbf4c684279afd1c532a00b0af578056))
- **guides:** Added published date as unix timestamp to frontmatter ([6e834c9](https://github.com/TenkoSpirit/genshin.zenless.club/commit/6e834c9bbc062ace9d190fb0d5a61556e87ef300))
- **guides:** Added title to required meta tags for guides ([dd752d6](https://github.com/TenkoSpirit/genshin.zenless.club/commit/dd752d66340162c1f8da268476e2d841f4843ff6))
- **guides:** Updated titles of existing guides ([188e791](https://github.com/TenkoSpirit/genshin.zenless.club/commit/188e791eb5183604c4178d5dec0c543b648cf4cd))
- **i18n:** Added contents as a translatable string ([be64ec4](https://github.com/TenkoSpirit/genshin.zenless.club/commit/be64ec4e0c478f820c84beadc1c69b5a839dead5))
- **pages:** Instead of getting all heading elements, get only h1 and h2 for heading ([1d30a95](https://github.com/TenkoSpirit/genshin.zenless.club/commit/1d30a9564909b99f798c94cdb6ea07b899727918))
- **pages:** Sort available guides by `publishedAt` value ([8a3defb](https://github.com/TenkoSpirit/genshin.zenless.club/commit/8a3defb1b4f62386629b0962d5497a02368da4f7))
- **pages:** Removed SameSite from the NEXT_LOCALE cookie on settings page since it's basically useless here (maybe) ([8566c0a](https://github.com/TenkoSpirit/genshin.zenless.club/commit/8566c0a5349a1b8588d5522d7da1a887131a79a9))
- **pages:** Use guide title for card titles ([6aeaf79](https://github.com/TenkoSpirit/genshin.zenless.club/commit/6aeaf7900f54a5b96f0d2b136b54af115dd8a299))
- **pages:** Use i18n string for contents title on guides id page ([d00ec9e](https://github.com/TenkoSpirit/genshin.zenless.club/commit/d00ec9e9d3755ec3b5994481a6caf63da5226547))
- **pages:** Settings now should look somewhat similar to the redesign ([25251b4](https://github.com/TenkoSpirit/genshin.zenless.club/commit/25251b4408f57cd4836c970c81b2e2680b48eb4f))
- **tailwind:** Added `active` variant ([d94a2f7](https://github.com/TenkoSpirit/genshin.zenless.club/commit/d94a2f76c67fea4477ccbf4eac60dc81700a257e))

### Refactor

- **components:** Tracking client side is not required anymore for guide cards ([2f7cffc](https://github.com/TenkoSpirit/genshin.zenless.club/commit/2f7cffc4ad0ed303271413bb7c7789c313d7e4a2))
- **components:** Removed redundant import statement ([a8fa3b2](https://github.com/TenkoSpirit/genshin.zenless.club/commit/a8fa3b2c1c939709e3b348e029d53967e2a3d234))



## (v1.2.1) - 2022-07-28

### Features

- **app:** Change layout again because right side menu is kinda bad looking ([895575c](https://github.com/TenkoSpirit/genshin.zenless.club/commit/895575c297d8ea60598976e0e6d4f4cc4d43c535))



## (v1.2.0) - 2022-07-28

### Features

- **app:** Updated layout, navigation now is on the right and added max width ([a837314](https://github.com/TenkoSpirit/genshin.zenless.club/commit/a8373146f961e53e0b4962b411678ee9b81a9ca3))



## (v1.1.3) - 2022-07-28

### Bug Fixes

- **guides:** Fixed typos and removed redundant lines from Raiden guide in Russian ([e0d7e77](https://github.com/TenkoSpirit/genshin.zenless.club/commit/e0d7e77f6c3fb4ad53777b51afd9cc3c50abd768))

### Features

- **guides:** Created Raiden Shogun in Russian ([83e2869](https://github.com/TenkoSpirit/genshin.zenless.club/commit/83e28695984d07b71cc081654a892d6ef0a63607))
- **guides:** Created a file for Raiden guide in English ([e02646f](https://github.com/TenkoSpirit/genshin.zenless.club/commit/e02646f01c420f58e7595552e1e6208d630187e6))
- **guides:** Added Raiden to list of published guides ([977aae0](https://github.com/TenkoSpirit/genshin.zenless.club/commit/977aae086734f0ce4da40afa09a67af9f8e231ba))
- **pages:** Guides view markdown styles were replaced with tailwind typography classes ([ef3177e](https://github.com/TenkoSpirit/genshin.zenless.club/commit/ef3177ef0da45cb1a70faf9a15987636672ae8a7))
- **styles:** Added some styling to markdown tables ([6be9598](https://github.com/TenkoSpirit/genshin.zenless.club/commit/6be9598b7685f833ca90bc09c597f796d459b302))
- **No category:** Created a redeployment script for docker ([82f97c2](https://github.com/TenkoSpirit/genshin.zenless.club/commit/82f97c29c5216a0af30fecd6146472b22c0fc2dc))

### Fox

- **guides:** Lang was missing in meta tags of Raiden guide in Russian ([256d4b9](https://github.com/TenkoSpirit/genshin.zenless.club/commit/256d4b9232f37dc0993b06c62f4e0834d1dcb540))



## (v1.1.2) - 2022-07-27

### Bug Fixes

- **components:** Incorrect css styles for sticky side navigation also only first letter of each heading is uppercase now ([1800916](https://github.com/TenkoSpirit/genshin.zenless.club/commit/18009165c9b43d410a0161c541096534264e35b6))
- **guides:** Incorrect wording for elemental skill in Russian version of Ganyu guide ([59906c0](https://github.com/TenkoSpirit/genshin.zenless.club/commit/59906c0f12d72da88cb810788084c1fc0dee6c93))
- **guides:** Corrected typos and added KQM url to the acknowledgements section ([c80ce3f](https://github.com/TenkoSpirit/genshin.zenless.club/commit/c80ce3f7f3e5c2df21908877e889b69ff6a49adc))
- **pages:** W-full on sr-only input was causing a horizontal scrollbar to appear on Chrome ([599090f](https://github.com/TenkoSpirit/genshin.zenless.club/commit/599090f3883f50174fd8c40299933f080c4d08d3))

### Features

- **Docker:** The website can now be used with Docker ([223070e](https://github.com/TenkoSpirit/genshin.zenless.club/commit/223070e80326afaa7a6e3cedb9ad2bb79ad8e1f0))
- **README:** Added more information ([56e58da](https://github.com/TenkoSpirit/genshin.zenless.club/commit/56e58da461e4366817cb717799e3facf736da1d6))
- **README:** Added conventions info ([e53657d](https://github.com/TenkoSpirit/genshin.zenless.club/commit/e53657d6d5ae918d9d88f3184a597229a3a455c2))
- **actions:** Use official Docker actions instead of some third party ([d8fe9dd](https://github.com/TenkoSpirit/genshin.zenless.club/commit/d8fe9dd9f7daceceb2a532b0cf997b3af24ac432))
- **components:** Birthdays now support multiple birthdays per day ([16161c1](https://github.com/TenkoSpirit/genshin.zenless.club/commit/16161c1e6b454c8e14203290ec81c623ea41a9dc))
- **data:** Added Kuki Shinobu ([0845a41](https://github.com/TenkoSpirit/genshin.zenless.club/commit/0845a414b9bc650f3f851fd10c4487b137516a52))
- **guides:** Created guide for Ganyu in Russian ([5ef299d](https://github.com/TenkoSpirit/genshin.zenless.club/commit/5ef299d40e707ff8bdf49d9a8df37e24adf62c1f))
- **guides:** English version for Ganyu guide ([cf6fa48](https://github.com/TenkoSpirit/genshin.zenless.club/commit/cf6fa486a2f9def8818b3a79c9444b920ee6ad66))
- **guides:** Some styling changes to Ganyu guide and added title to frontmatter ([537bbe6](https://github.com/TenkoSpirit/genshin.zenless.club/commit/537bbe6de83d28bef449b7f3636bba040a1ffecb))
- **guides:** Removed test Ayaka guide and added Ganyu guide to published list ([6253e35](https://github.com/TenkoSpirit/genshin.zenless.club/commit/6253e3533de4acd73ffd88ca08239e67df203cf8))
- **pages:** Created deferred search value which is used for filtering ([1d8bf3d](https://github.com/TenkoSpirit/genshin.zenless.club/commit/1d8bf3d922c964aefca0e3e4f85c1a09b782b337))
- **pages:** Shrink guide width to improve readability ([3c4ba4c](https://github.com/TenkoSpirit/genshin.zenless.club/commit/3c4ba4c77cb4c7eba76f31b481597d87d8f8b53b))

### Miscellaneous Tasks

- **deps:** Bumped dependencies versions ([d26e3bc](https://github.com/TenkoSpirit/genshin.zenless.club/commit/d26e3bc1a2ae366a10a87750cbf120c95eb8fd58))

### Refactor

- **data:** Renamed files containing zod schemas to end with .schema.ts ([d61226b](https://github.com/TenkoSpirit/genshin.zenless.club/commit/d61226b0b6d74674e47465aae2fff598f08aa5f9))

### Styling

- **pages, components:** Fixed eslint errors ([495982d](https://github.com/TenkoSpirit/genshin.zenless.club/commit/495982db6446f5e114a51586a4f739a2b20ae0e5))
- **pages, components:** Fix eslint ([ddedd3c](https://github.com/TenkoSpirit/genshin.zenless.club/commit/ddedd3cd0704e7c3f6b23463266055b75ed9def8))



## (v1.1.1) - 2022-07-26

### Refactor

- **components:** Removed redundant code from Navigation ([da2c068](https://github.com/TenkoSpirit/genshin.zenless.club/commit/da2c0681d0b9308b14a6d4930d9bc7e3d82e10f0))



## (v1.1.0) - 2022-07-26

### Features

- **README:** Better looking team table ([72ac379](https://github.com/TenkoSpirit/genshin.zenless.club/commit/72ac3792b3c1b9edb2465ca49642fc72ecc57bb8))
- **components:** Added settings page to navigation ([57037c2](https://github.com/TenkoSpirit/genshin.zenless.club/commit/57037c2ad54014bcff8e0ce425196c563fea9778))
- **i18n:** Added translation strings for settings page ([6fbaf96](https://github.com/TenkoSpirit/genshin.zenless.club/commit/6fbaf965eaa6732cac5bbb0b08415906911693bf))
- **pages:** Created a settings page ([d83449d](https://github.com/TenkoSpirit/genshin.zenless.club/commit/d83449d40f81eccf15893e58116e4ef9ed3f61dd))

### Miscellaneous Tasks

- **deps:** Added needed packages ([f191055](https://github.com/TenkoSpirit/genshin.zenless.club/commit/f191055740f0bf4c539b5d2a1e5eb2b3b1fbe819))



## (v1.0.8) - 2022-07-25

### Features

- **README:** Pikachupsik added to the team on the README file ([cbeeb79](https://github.com/TenkoSpirit/genshin.zenless.club/commit/cbeeb791a2ec582532c32d7a5eda3505f85ec010))
- **README:** Updated ([e17266e](https://github.com/TenkoSpirit/genshin.zenless.club/commit/e17266eeb5339f00c1c8e581852fa226a0dcbb3c))
- **guides:** Created zod schemas for validation purposes ([10b6374](https://github.com/TenkoSpirit/genshin.zenless.club/commit/10b6374d16280f710a034c38d8b330290ba19fe0))
- **guides:** Submodule is not needed anymore, we are parsing markdown directly in nextjs ([e0ea0b2](https://github.com/TenkoSpirit/genshin.zenless.club/commit/e0ea0b263da2a09c8ad75823c3e2ed8f0969ee57))
- **guides:** Added a list of published guides ([aba2468](https://github.com/TenkoSpirit/genshin.zenless.club/commit/aba24684796295f6926e6851f5c4eb6483c4d5dd))
- **guides:** Made lang meta required ([da23664](https://github.com/TenkoSpirit/genshin.zenless.club/commit/da2366465a1552e385bc8a1067943924dde9007f))
- **lib:** Added a bunch of markdown parsing functions ([c3202dd](https://github.com/TenkoSpirit/genshin.zenless.club/commit/c3202ddaeb1eebfb5b625f6814e3fd7d1246a56f))
- **pages:** Updated guides index and guides view pages using recently moved markdown parser ([f72f37e](https://github.com/TenkoSpirit/genshin.zenless.club/commit/f72f37e727f21ffd42006077d866a77da586fd77))

### Miscellaneous Tasks

- **deps:** Added markdown parsing related dependencies ([fc03674](https://github.com/TenkoSpirit/genshin.zenless.club/commit/fc036748bf282c61ee446cc54a1b439dce3a3a3f))
- **deps:** Version bumps ([f6f7bba](https://github.com/TenkoSpirit/genshin.zenless.club/commit/f6f7bbaf49674a5b6c20f1b40b00b936e0a63837))



## (v1.0.7) - 2022-07-25

### Bug Fixes

- **app:** Fix dayjs locale imports and made it depend on lang from next-translate ([f07ec61](https://github.com/TenkoSpirit/genshin.zenless.club/commit/f07ec61581e3922d6f83508f4089e91ba7c2b41a))
- **atoms:** Apply toFixed on crit value result ([27c35a5](https://github.com/TenkoSpirit/genshin.zenless.club/commit/27c35a58187eac4c2a1307cb940c5f31303f981d))

### Features

- **atoms:** Added derived atoms with results for calculators ([a11f179](https://github.com/TenkoSpirit/genshin.zenless.club/commit/a11f1792c0d172d6151f1ff8f38bd2899ff122f9))
- **atoms:** Actually better use .toFixed when needed ([220979e](https://github.com/TenkoSpirit/genshin.zenless.club/commit/220979ecc1a4c7af82b2de4086653be426d4570d))
- **components, Calculators:** Turned title into a flex container ([00ab60f](https://github.com/TenkoSpirit/genshin.zenless.club/commit/00ab60faeab90a7a83961db632aa7c9d12752b61))
- **components, calculators:** Changed default styles for title and details ([eb40bf8](https://github.com/TenkoSpirit/genshin.zenless.club/commit/eb40bf83c9f11a7e24a9cf427cb320c6f302f0f9))
- **i18n:** Added more translation strigns for calculators ([21ea648](https://github.com/TenkoSpirit/genshin.zenless.club/commit/21ea648549608f8841bf7e706873b40c9f68d7fd))
- **pages:** Separated each calculator in subcomponents and used derived atoms instead of react state ([bc271ef](https://github.com/TenkoSpirit/genshin.zenless.club/commit/bc271ef66af028f7dcd37bfb958e68fd82668348))
- **pages:** Updated calculators with i18n translations and changed some styles ([465ff3e](https://github.com/TenkoSpirit/genshin.zenless.club/commit/465ff3eb24a28625ff6efb50a5f16ee8627ac67a))
- **pages:** Crit value is now colored accordingg to infographics ([c0a4d9d](https://github.com/TenkoSpirit/genshin.zenless.club/commit/c0a4d9d8950da55fdd5d1d2ba8343d59e802ad5a))



## (v1.0.6) - 2022-07-20

### Bug Fixes

- **i18n:** Removed redundant word from ru.footer.copyright ([ab8216e](https://github.com/TenkoSpirit/genshin.zenless.club/commit/ab8216ea33ac57c0056ecdfa80f8edbaf469988b))
- **i18n, Navigation:** Missing translation on mobile ([89a8cb7](https://github.com/TenkoSpirit/genshin.zenless.club/commit/89a8cb7ffd3582ba0c09f0bac04efe634b989102))
- **No category:** Weird hydration error that is happening on home page could be caused by birthdays ([c8a0e43](https://github.com/TenkoSpirit/genshin.zenless.club/commit/c8a0e43d67aace8f3adaca46b7d6b1c51c261488))

### Features

- **components:** Created `ExternalLink` as an alias for `a` but with some default values ([18fa9b9](https://github.com/TenkoSpirit/genshin.zenless.club/commit/18fa9b9e2d81886a2de99fd15861bf5c709b704c))
- **components:** Removed shadow from input fields ([6cb1e27](https://github.com/TenkoSpirit/genshin.zenless.club/commit/6cb1e27b1d0779b696e269bd3fedd97643c8e48b))
- **data:** Added Shikanoin Heizou ([4726cb1](https://github.com/TenkoSpirit/genshin.zenless.club/commit/4726cb163eedfc761a67fd46384bf034d1075dfa))
- **i18n:** Absolutely awful i18n implementation ([3e27227](https://github.com/TenkoSpirit/genshin.zenless.club/commit/3e272278fbaa647fd2cc2a2bf1e6d5476618e1fb))
- **i18n:** Implemented i18n with next-translate ([e456350](https://github.com/TenkoSpirit/genshin.zenless.club/commit/e4563507d6e04c672f3b10f7a91a3687a1d6ff4e))
- **i18n:** Added some basic translation strings ([ab40940](https://github.com/TenkoSpirit/genshin.zenless.club/commit/ab40940176721f3762c50870d2b8c942cae24f9c))
- **i18n:** Added plural forms for some common strings ([8abece1](https://github.com/TenkoSpirit/genshin.zenless.club/commit/8abece1fe328ff4600ad8d96c21af246c100aef3))
- **i18n:** Added translation strings for meta data ([ceb58b2](https://github.com/TenkoSpirit/genshin.zenless.club/commit/ceb58b26c0e262e913a06d561baa4486b87f69f8))
- **i18n, pages:** Implemented meta translation strings ([5684622](https://github.com/TenkoSpirit/genshin.zenless.club/commit/568462262ca89139baf7f7cb20284c8921cf6fae))
- **i18n, pages:** Implemented localized input placeholders ([fc9e1ec](https://github.com/TenkoSpirit/genshin.zenless.club/commit/fc9e1ecf5d41143a9e0c156c46a63a8ebe93834d))
- **i18n, pages:** Added translations to 404 page ([5f78862](https://github.com/TenkoSpirit/genshin.zenless.club/commit/5f788620e3eac7a10008ea45ec3030f62a064655))
- **sitemap:** Added automatic sitemap generation ([88912db](https://github.com/TenkoSpirit/genshin.zenless.club/commit/88912dbe427e4867abe7f9ce1e8d9e771aeb6729))

### Miscellaneous Tasks

- **deps:** Version bumps and zod moved from dev deps ([1a9e78c](https://github.com/TenkoSpirit/genshin.zenless.club/commit/1a9e78c6f1f53b84d0b662be583301096967dc28))
- **eslint:** Allow template literals ([5b01126](https://github.com/TenkoSpirit/genshin.zenless.club/commit/5b011267c0fb6eb9a15820ae1ed9c3db534019c1))
- **tailwind:** Removed redundant entry in content ([44c7b67](https://github.com/TenkoSpirit/genshin.zenless.club/commit/44c7b67573a7108b394e5cbb05d5e9f4765c18c8))

### Refactor

- **c8a0e43d67aace8f3adaca46b7d6b1c51c261488:** The issue was indeed caused by this component, should probably use Next's dynamic import with disabled ssr instead of wrapping with custom `ClientOnly` ([e21b4f1](https://github.com/TenkoSpirit/genshin.zenless.club/commit/e21b4f180ff21d74a8074e49a4e46055268495ef))
- **components:** Switched `a`s with `ExternalLink`s in Footer ([c79394b](https://github.com/TenkoSpirit/genshin.zenless.club/commit/c79394befbedf0c5d078a04f6e3100092437364a))

### Revert

- **i18n:** Absolutely awful i18n implementation ([5c0c3d1](https://github.com/TenkoSpirit/genshin.zenless.club/commit/5c0c3d1f533701196a6355b6c303b9473a2756d8))



## (v1.0.5) - 2022-07-12

### Bug Fixes

- **Navigation:** Mobile navbar shouldn't be rounded ([2bcb727](https://github.com/TenkoSpirit/genshin.zenless.club/commit/2bcb72723d20ab2213f5727b1fa46668af2a9947))

### Features

- **components, Input:** Updated focused styles and added form-input from tailwind/forms ([82bb13c](https://github.com/TenkoSpirit/genshin.zenless.club/commit/82bb13ca361a91565288318ef25402e77a2b9163))
- **pages, guides:** Added an option to show all types of guides ([3b9c564](https://github.com/TenkoSpirit/genshin.zenless.club/commit/3b9c564dd601a004ef1396655a84b87f40aabaa6))
- **tailwind:** Use Noto Sans as sans font ([a7305fc](https://github.com/TenkoSpirit/genshin.zenless.club/commit/a7305fc5f2c8ab40aa6ec74d65ee3e78d5c4fecc))

### Miscellaneous Tasks

- **deps:** Removed react-use ([83c7563](https://github.com/TenkoSpirit/genshin.zenless.club/commit/83c7563bffa176506b60079f98eb1be25c66da8a))
- **deps:** Removed tw-elements ([5c9245e](https://github.com/TenkoSpirit/genshin.zenless.club/commit/5c9245e142a66973e911332f50fe478ad5f6faad))
- **deps:** Removed cypress ([089e30a](https://github.com/TenkoSpirit/genshin.zenless.club/commit/089e30a0cd7338c9963ccee3fa49a67c99446c62))

### Refactor

- **deps, pages:** Added exact lodash pacakges that are needed isntead of using whole lodash lib ([bf42a20](https://github.com/TenkoSpirit/genshin.zenless.club/commit/bf42a203e5ce6075588dd6de882f1d1cb90461f2))
- **pages:** `useEffectOnce` can be easily replaced in `_app.tsx` ([1819abf](https://github.com/TenkoSpirit/genshin.zenless.club/commit/1819abf689482a41daaa463f8bc675d18a234077))
- **tailwind:** Tw-elements was removed ([d89385e](https://github.com/TenkoSpirit/genshin.zenless.club/commit/d89385ec94520fde3cf0c3c95d5c3fcb981ad800))



## (v1.0.4) - 2022-07-11

### Bug Fixes

- **BirthdaysToday:** Updated colors and other styles ([3992f9d](https://github.com/TenkoSpirit/genshin.zenless.club/commit/3992f9db97e0b97aac182c588da1dba827974c27))
- **Navigation:** Should have updated text-slate to text-dark ([fbae6ef](https://github.com/TenkoSpirit/genshin.zenless.club/commit/fbae6efd15db75ec41fd0a563f65a7a209bc581d))
- **tailwind:** Forms plugin should be addign it's classes explicitly ([c1abab9](https://github.com/TenkoSpirit/genshin.zenless.club/commit/c1abab96c92f1411ad8c44b926ae220e04ab5cbf))

### Features

- **CharacterCard:** Explicitly set fotn size and colors ([3370315](https://github.com/TenkoSpirit/genshin.zenless.club/commit/3370315befbc83ed869f6b9d9c1523246fc0cb14))
- **ContentsTable:** Used cards base class and explicitly set text colors ([836963c](https://github.com/TenkoSpirit/genshin.zenless.club/commit/836963c2931c4adc7ce4281d49a8bfc599f75f3b))
- **GuideCard:** More explicit styles ([d032861](https://github.com/TenkoSpirit/genshin.zenless.club/commit/d032861e575a3d452d703f529e0ac95de664532a))
- **Navigation:** Use darker text color on dark color scheme ([ab8723a](https://github.com/TenkoSpirit/genshin.zenless.club/commit/ab8723a5682062c381602b48364b11672f647c72))
- **app:** Updated dark colors and other styles across available components ([a8af529](https://github.com/TenkoSpirit/genshin.zenless.club/commit/a8af529a47e902e527f21dbc4b0f73bb3fff1b8b))
- **calculator, components:** Use more explicit styles ([cc274cb](https://github.com/TenkoSpirit/genshin.zenless.club/commit/cc274cbd4100b785261a1deeb927102f30b66775))
- **characters, pages:** Fix text colors on dark color scheme ([d77b905](https://github.com/TenkoSpirit/genshin.zenless.club/commit/d77b905f1f33c6ac28dbdcca645d2e4569f59ec8))
- **characters, pages:** Removed top margin from input and removed redundant text ([f872ca4](https://github.com/TenkoSpirit/genshin.zenless.club/commit/f872ca470b126c917350b1e4a694ee47939e9dbf))
- **markdown, styles:** Brighter text on dark color scheme ([e459efe](https://github.com/TenkoSpirit/genshin.zenless.club/commit/e459efe924b5f508dae91e4514121362d9ecbcd6))
- **markdown, styles:** Bring back darker texts ([d303c7c](https://github.com/TenkoSpirit/genshin.zenless.club/commit/d303c7c48506cb7a142f6b56ba59fb4b422b02de))
- **tailwind:** Updated color scheme and added one more shade of neutral ([ebed497](https://github.com/TenkoSpirit/genshin.zenless.club/commit/ebed497c6baafe6f8e08ceb30f95e18c5003b756))

### Refactor

- **atoms, _app:** Hydrating all atoms in `_app` is unnecessary ([5a4c6fe](https://github.com/TenkoSpirit/genshin.zenless.club/commit/5a4c6febcf83407b17896536d4c2b3a64a95f285))
- **styles, cards:** Udpated cards base and removed redundant classes ([84a8386](https://github.com/TenkoSpirit/genshin.zenless.club/commit/84a8386e8e291f168e5b65af9bc4693e70f225f1))

### Build

- **tailwind:** Changed primary to indigo ([5c9da4d](https://github.com/TenkoSpirit/genshin.zenless.club/commit/5c9da4d31cb2d6eb7bb9d74d7f5350f6ef3d9adb))



## (v1.0.3) - 2022-07-10

### Bug Fixes

- **naviagtion:** Theme switch flickers on navigations between pages ([8b7456b](https://github.com/TenkoSpirit/genshin.zenless.club/commit/8b7456b81f5408eaed724631c4f99453fc3e0465))



## (v1.0.2) - 2022-07-10

### Bug Fixes

- **components:** Removed bottom margin from input field ([d7d8156](https://github.com/TenkoSpirit/genshin.zenless.club/commit/d7d8156b9248c551bbc57b4286c0cb3028664bb6))
- **components:** Styles of CalculatorInput ([fcb708a](https://github.com/TenkoSpirit/genshin.zenless.club/commit/fcb708a5e2487df44d6d2de67ad4e4a38f74c744))
- **jotai:** I have completely misunderstood the purpose of `initialValues` prop on `Provider`, in my case I should use the `useHydrateAtoms` hook instead ([41ff68e](https://github.com/TenkoSpirit/genshin.zenless.club/commit/41ff68e1fa947f8ff1cb5ce7c0ec1f936651f30c))
- **tailwind:** Moved type import ([174d0df](https://github.com/TenkoSpirit/genshin.zenless.club/commit/174d0dfca6b03d7a51cbb4c2b3e9cb8008cc79ad))

### Features

- **atoms:** Character search atom created ([14a0840](https://github.com/TenkoSpirit/genshin.zenless.club/commit/14a084008128de7f7f390d10a3a9314890e7921b))
- **atoms:** Created the array of initial values for jotai atoms ([7649c28](https://github.com/TenkoSpirit/genshin.zenless.club/commit/7649c28f939f37b562dc72164de87cf14df02360))
- **atoms:** Added atoms for guides list page ([53cb8d9](https://github.com/TenkoSpirit/genshin.zenless.club/commit/53cb8d94cbf25f155f9249f6aa7891f0615bc6ba))
- **pages:** Updated the 404 page ([a0da894](https://github.com/TenkoSpirit/genshin.zenless.club/commit/a0da89457d9634428b111346234073c3f1ee8cb8))
- **pages:** Aded support for different guide types and improved query mutations ([3969ee9](https://github.com/TenkoSpirit/genshin.zenless.club/commit/3969ee9308b0e0e0b37a432430e7af3b2646b0f0))
- **components:** Added `className` to CharacterCard ([3f1005b](https://github.com/TenkoSpirit/genshin.zenless.club/commit/3f1005b81222b85d34b4bfd5c6b05e9a28c7c4ab))

### Miscellaneous Tasks

- **eslint:** Ignore precompiled guides ([58f3bc4](https://github.com/TenkoSpirit/genshin.zenless.club/commit/58f3bc45129cb17a6b2defd761ab1616914e3c67))
- **eslint:** Update quotes rule to use double ([513940a](https://github.com/TenkoSpirit/genshin.zenless.club/commit/513940a0cb96d83116e662338a0977cf56c1145a))
- **eslint:** Update import order for style files ([b56a675](https://github.com/TenkoSpirit/genshin.zenless.club/commit/b56a67580daa1dd833d542da084d9638c76c8007))

### Refactor

- **Layout:** Use title without template in OpenGraph and twitter meta tags ([2d42571](https://github.com/TenkoSpirit/genshin.zenless.club/commit/2d425718f69e3a74394a8f6c4c9cdb5abb7fcf78))
- **app:** Moved `Navigation` and `Footer` components into `Layout` from the custom app ([75b52df](https://github.com/TenkoSpirit/genshin.zenless.club/commit/75b52df3e0917e3cb6491a301c77051514f6f386))
- **hooks:** Removed `useHydrateAllAtoms` since we have `initialValues` array now ([03e6a83](https://github.com/TenkoSpirit/genshin.zenless.club/commit/03e6a837acd030530e00fe4379f9179f706c3e7a))
- **pages:** Using jotai atom to store user search input on characters list page ([a737add](https://github.com/TenkoSpirit/genshin.zenless.club/commit/a737addc93897a0e54dc3c2c54d3cd42af49907e))
- **pages:** Updated guides by using atoms to keep state in sync with router ([1c13502](https://github.com/TenkoSpirit/genshin.zenless.club/commit/1c13502e9ed6a89b123d31c32dbced77d4a4253c))

### Styling

- **app:** Used eslint fix on all project files ([eb48681](https://github.com/TenkoSpirit/genshin.zenless.club/commit/eb486817ce241a2aaa7757f0e0ed79abe7035e08))
- **pages:** Fix import order in the `_app.tsx` ([2a399f8](https://github.com/TenkoSpirit/genshin.zenless.club/commit/2a399f8f9d670ae7f3c90fbe1bf98e1570660a7e))
- **scripts:** Used eslint fix on webp generator script ([709379a](https://github.com/TenkoSpirit/genshin.zenless.club/commit/709379a0d64550f6db9b94af96bc8ec582e7d365))

### Build

- **nvmrc:** Created config for nvm ([7a05324](https://github.com/TenkoSpirit/genshin.zenless.club/commit/7a05324a46ea1384168a1ce676c3be033e868cd2))
- **tailwind:** Added some plugins ([2db356e](https://github.com/TenkoSpirit/genshin.zenless.club/commit/2db356e8c593ba97b3a2aa4e3aadcf1172cb31ed))



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