const i = require('util').inspect

// id :: a -> a
const id = x => x

// compose :: (b -> c) -> (a -> b) -> (a -> c)
const compose = f => g => x => f(g(x))

// map :: ?? -> ??
const map = f => fx => fx.map(f)



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

const Nothing = Object.freeze( (function _Nothing() {

    return {
        map: () => Nothing,
        bind: () => Nothing,
        flatMap: this.bind,
        chain: this.bind,
        inspect: () => 'Nothing',
        toString: () => 'Nothing',
    }

})() )

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
    Just(10),
    map(id)(Just(10))
)

console.log(
    'Composition holds (Just): %s === %s',
    map(
        compose(x => x * 10)(x => x - 2)
    )(Just(10)),
    compose(map(x => x * 10))(map(x => x - 2)) (Just(10))
)


console.log(
    'ID law holds (Nothing): %s === %s',
    Nothing,
    map(id)(Nothing)
)

console.log(
    'Composition holds (Nothing): %s === %s',
    
        map(compose(x => x * 10)(x => x - 2))(Nothing),
        
        compose(map(x => x * 10))(map(x => x - 2))(Nothing)
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