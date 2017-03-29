const i = require('util').inspect

const id = x => x
const compose = g => f => x => f(g(x))



function Just(val) {
    return {
        map: (f) => Just(f(val)),
        inspect: () => `Just(${i(val)})`,
        toString: () => `Just(${i(val)})`,
        bind: (f) => f(val),
        flatMap: this.bind,
        chain: this.bind,
    }
}

function Nothing() {

    return {
        map: () => Nothing(),
        bind: () => Nothing(),
        flatMap: this.bind,
        chain: this.bind,
        inspect: () => 'Nothing()',
        toString: () => 'Nothing()',
    }

}

function Maybe(value) {
  return null == value ? Nothing() : Just(value)
}


console.log(
    'Maybe mapping:', 

Maybe('123abc')
    .map(s => 'Hello ' + s)
    .map(s => s + ' world!')
    .map(s => s.split(' '))
    .map(arr => [arr[0]].concat(arr[arr.length - 1]))
    .map(arr => arr.join(' '))
    //.fold(id)
    
)


console.log(
    'ID law holds (Just): %s === %s',
    Maybe(10),
    Maybe(10).map(id)
)

console.log(
    'Composition holds (Just): %s === %s',
    Maybe(10).map(
        compose(x => x * 10)(x => x - 2)
    ),
    Maybe(10).map(x => x * 10).map(x => x - 2)
)





console.log(
    'ID law holds (Nothing): %s === %s',
    Maybe(),
    Maybe().map(id)
)

console.log(
    'Composition holds (Nothing): %s === %s',
    Maybe().map(
        compose(x => x * 10)(x => x - 2)
    ),
    Maybe().map(x => x * 10).map(x => x - 2)
)

function safeHead(arr) {
    return Maybe(arr[0])
}

function safeProp(arr) {
    return Maybe(arr[0])
}

console.log(
    safeHead([1, 2, 3])
        .map(x => x + 1)
        .map(x => x * 2)
)