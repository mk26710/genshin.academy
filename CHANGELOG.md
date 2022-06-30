# 2022-06-30

 - Added table of contents to guide pages
 - Added Tartaglia assets and character data
 - Fixed character cards using png icons isntead of webp

# 2022-06-29

 - Added Genshin element icons on top left on character cards
 - Added birthdays to main page
 - Changed active sidebar rounded border to consistent rounded class
 - Fixed long titles styling not being applied
 - Fixed wrong birth date of Yae Miko


# 2022-06-28

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

# 2022-06-27
 
 - Switched back to NextJS (yes, I've switched frameworks multiple times in  just a few days)
 - `webp` converted files are now a part of the repo
 - Internal changes

# 2022-06-26
 
 - Added Fischl character data
 - Switched back to Nuxt
 - Created custom composable shorthand for meta data

# 2022-06-25

 - Added Yoimiya character data
 - Added Keqing character data
 - Added Kaedehara Kazuha character data
 - Added Sangonomiya Kokomi character data
 - Added Rosaria character data
 - Added Amber character data
 - Parsing character with zod on their exports
 - More complex search via array reducers (grouped and sorted inside of groups)

# 2022-06-24
 
 - Switch to NextJS
 - Internal changes to scripts
 - Added `accentColor` to `Character`
 - Added IDs to cards
 
# 2022-06-23

 - Switch to Nuxt v3 (RC)
 - Included meta tags with useHead()
 - Created a NextJS branch

# 2022-06-20

 - Created custom image component
 - Search input is now debounced
 - Fixed naming of views

# 2022-06-18

 - Added Raiden Shogun character data
 - Added Eula's constellations
 - Internal changes to data
 - Router redirects to /404 on catch all path

№ 2022-06-17

 - Added Raiden Shogun assets
 - Added zod
 - Added state persistance plugin for pinia
 - Created a new store for guides
 - Updated character type with zod so it can be validated

# 2022-06-15

 - Routes now are named
 - Automatic conversion of static images to `webp` format
 - Internal changes related to rerendering with params change
 - Characters view now shows some basic data
 - Added progress bar

# 2022-06-12

 - Created calculator components
 - Added a crit value calculator
 - Extended dayjs with local formats
 - Added automatic scrolls for hashes (`https://genshin.zenless.club/guides#yae_miko` would scroll to Yae Miko's card automatically)
 - Guides page data filter now uses search params as initial value
 - Extended dayjs with more locales
 - Updated color scheme (yes, once again)
 - Minor styling changes

# 2022-06-11

 - Added Ganyu character data
 - Added Eula character data (without constellations)

# 2022-06-10

 - Added Yelan character data
 - Added Kamisato Ayato character data
 - Added Qiqi character data
 - Added Shenhe character data
 - Populated Ayaka's constealltion data
 - Sorting characters data array by default
 - Fixed character card link

# 2022-06-09

- Styles for parsed guides data
- Router is now using nested routes

# 2022-06-08

 - Updated color scheme
 - Created a git submodule to synchronize data with [gvp-guides](https://github.com/BinaryKitsune/gvp-guides)

# 2022-06-05
 
 - Created a parser for characters guides data which could be used for actually more than that with Rust
 - Moved data parser to a different repo [gvp-guides](https://github.com/BinaryKitsune/gvp-guides) 

# 2022-06-04

 - Guides home view now hides filtered content instead of destroying the nodes (conditional class instead of conditional rendering)
 - a11y fix for character card component
 - Minor styling changes to cards
 - Kamiasto Ayaka data was added
 - Internal changes to characters data storage

# 2022-06-03

 - Internal changes

# 2022-06-02

 - Static images are now not being affected by Vite
 - Created Genshin Impact special types
 - (WIP) Created character card component
 - Guide display page displays the data to users now
 - Yae Miko charater data 

# 2022-05-30

 - Added dark theme colors to previously created components

# 2022-05-29

 - Implemented colors scheme changer
 - Extended tailwind with more colors

# 2022-05-28

 - Added a view to display guides content

# 2022-05-26

Changin colors scheme!

# 2022-05-17

Guide cards component was somewhat finished.


# 2022-04-25

This is where it all begins! The initial project.
