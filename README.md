# Recitus #

A library used to recite things.

Based on [SuperMemo 2](https://www.supermemo.com/english/ol/sm2.htm) algorithm.

## Build ##

It is published through `npm` now.

If you want to build it yourself, use `gulp`:

    npm install

    gulp build

## API ##

The library uses ES2015 module standards, so (if you are using legacy js) `.default` is required in `require`:

    const Recitus = require('./lib/recitus').default;
    var recitus = new Recitus('path/to/vocab', 'path/to/bank');

### Vocabulary File ###

Vocabulary files should be provided in json as an array of objects. Each word have two fields: `q` and `a`, indicating question(such as a word) and answer(such as its meaning).

A simple one:

    [
        { "q": "1 + 1 = ?", "a": "2" },
        { "q": "apple", "a": "a kind of fruit" },
        ...
    ]

### Evaluation of Familiarity ###

SuperMemo 2 use an integer ranging from 0-5 to check how much you memorize a word, check the list:

- 5: perfect response
- 4: correct response after a hesitation
- 3: correct response recalled with serious difficulty
- 2: incorrect response; where the correct one seemed easy to recall
- 1: incorrect response; the correct one remembered
- 0:  complete blackout

The feedback is given by the user.

### new Recitus(vocabPath, bankPath) ###

Create a main instance.

__vocabPath:__ path to the vocabulary path.

__bankPath:__ path to store your reciting progress.

__Notice:__ it's a sync method. If __bankPath__ doesn't exist, a initial one will be created automatically.

### Recitus#start(delta) ###

Start today's recite, all words should be reviewed and __delta__ new words (or less if the whole vocabulary are learned) will be stored in the wordlist.

__delta:__ the number of extra new words to be added to the wordlist.

### Recitus#pick() ###

Pick a word at random from the wordlist.

__returns:__ an object with properties `q` and `a`, representing the word.

__Notice:__ can only be called after #start is called.

### Recitus#update(q) ###

Update a word in the wordlist through the user's feedback.

__q:__ the user's feedback in 0-5, which is explained above.

__Notice:__ only one word is picked each time, so #update must be called after #pick.

### Recitus#empty() ###

Check if all the words today are reviewed.

__returns:__ true or false.

### Recitus#stop() ###

Stop the recite and save the progress.

__Notice:__ it's a sync method.

## Author ##

Tiny

## License ##

MIT
