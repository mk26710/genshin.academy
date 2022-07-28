# Changelog


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