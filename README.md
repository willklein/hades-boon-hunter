# Hades Boon Hunter

This is a fun side-project to help with playing Hades. In this game, there are resources unlocked by acquiring various boons at least once.

This app is a run-through aid to track what boons have been chosen, and to show which duo boons and legendary boons are potentially available based on those choices.

## Objectives

I'm not trying to write good code right now, just to put out as many features as possible, as quickly as possible. I will probably pivot to writing some tests and refactoring at some point though.

Styling is currently minimal. Types are incomplete but there are a few helpful ones. I'm exploring some tools I haven't used much previously: Chakra UI, Vite, pnpm.

## Feature List

Current boon tracking
- [x] shows a list of current boons
- [x] organized by god
- [ ] show which boons unlock duo boons
- [ ] show which boons unlock legendary boons

Choosing new boons
- [x] shows a list of gods
- [x] selecting a god shows their boons
- [x] only remaining boons are available
- [ ] indicate which gods have priority based on current boon progress

Duo boon tracking
- [x] add data
- [x] show a list of duo boons
- [x] highlights a boon requirement if it has been chosen
- [ ] highlight a duo boon if one or more requirements are met

Legendary boon tracking
- [ ] add data
- [ ] show a list of legendary boons
- [ ] highlight a boon requirement if it has been chosen
- [ ] highlight a legendary boon if one or more requirements are met

Persistence
- [ ] track what boons have been unlocked across run throughs
- [ ] track against prophecies
