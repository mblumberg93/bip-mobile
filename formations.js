export const STANDARD = {
    value: 0,
    name: "Standard",
    size: 10,
    cups: [
        { row: 0, column: 0, active: true },
        { row: 0, column: 2, active: true},
        { row: 0, column: 4, active: true },
        { row: 0, column: 6, active: true },
        { row: 2, column: 1, active: true },
        { row: 2, column: 3, active: true },
        { row: 2, column: 5, active: true },
        { row: 4, column: 2, active: true },
        { row: 4, column: 4, active: true },
        { row: 6, column: 3, active: true }
    ]
}

export const DESPERATION = {
    value: 1,
    name: "Desperation Honeycomb",
    size: 7,
    cups: [
        { row: 0, column: 2, active: true },
        { row: 0, column: 4, active: true},
        { row: 2, column: 1, active: true },
        { row: 2, column: 3, active: true },
        { row: 2, column: 5, active: true },
        { row: 4, column: 2, active: true },
        { row: 4, column: 4, active: true }
    ]
}

export const THREETWOONE = {
    value: 2,
    name: "Three Two One",
    size: 6,
    cups: [
        { row: 0, column: 1, active: true },
        { row: 0, column: 3, active: true},
        { row: 0, column: 5, active: true },
        { row: 2, column: 2, active: true },
        { row: 2, column: 4, active: true },
        { row: 4, column: 3, active: true }
    ]
}

export const THREETHREESTRAIGHT = {
    value: 3,
    name: "Three Three Straight Line",
    size: 6,
    cups: [
        { row: 0, column: 2, active: true },
        { row: 1, column: 4, active: true},
        { row: 2, column: 2, active: true },
        { row: 3, column: 4, active: true },
        { row: 4, column: 2, active: true },
        { row: 5, column: 4, active: true }
    ]
}

export const LARGEPLAYBUTTON = {
    value: 4,
    name: "Large Play Button",
    size: 6,
    cups: [
        { row: 0, column: 1, active: true },
        { row: 1, column: 3, active: true},
        { row: 2, column: 1, active: true },
        { row: 2, column: 5, active: true },
        { row: 3, column: 3, active: true },
        { row: 4, column: 1, active: true }
    ]
}

export const THREETWOSTRAIGHT = {
    value: 5,
    name: "Three Two Straight Line",
    size: 5,
    cups: [
        { row: 0, column: 2, active: true },
        { row: 1, column: 4, active: true},
        { row: 2, column: 2, active: true },
        { row: 3, column: 4, active: true },
        { row: 4, column: 2, active: true }
    ]
}

export const DOGBONE = {
    value: 6,
    name: "Dog Bone",
    size: 5,
    cups: [
        { row: 0, column: 2, active: true },
        { row: 0, column: 4, active: true},
        { row: 2, column: 3, active: true },
        { row: 4, column: 2, active: true },
        { row: 4, column: 4, active: true }
    ]
}

export const DIAMOND = {
    value: 7,
    name: "Diamond",
    size: 4,
    cups: [
        { row: 0, column: 3, active: true },
        { row: 2, column: 2, active: true},
        { row: 2, column: 4, active: true },
        { row: 4, column: 3, active: true }
    ]
}

export const TWOTWOSTRAIGHT = {
    value: 8,
    name: "Two Two Straight Line",
    size: 4,
    cups: [
        { row: 0, column: 2, active: true },
        { row: 1, column: 4, active: true},
        { row: 2, column: 2, active: true },
        { row: 3, column: 4, active: true }
    ]
}

export const TINYTRIANGLE = {
    value: 9,
    name: "Tiny Triange",
    size: 3,
    cups: [
        { row: 0, column: 2, active: true },
        { row: 0, column: 4, active: true},
        { row: 2, column: 3, active: true }
    ]
}

export const BELLYBUTTON = {
    value: 10,
    name: "Belly Button (Small Play Button)",
    size: 3,
    cups: [
        { row: 0, column: 2, active: true },
        { row: 1, column: 4, active: true},
        { row: 2, column: 2, active: true }
    ]
}

export const STOPLIGHT = {
    value: 11,
    name: "Stoplight",
    size: 3,
    cups: [
        { row: 0, column: 3, active: true },
        { row: 2, column: 3, active: true},
        { row: 4, column: 3, active: true }
    ]
}

export const GENTLEMENS = {
    value: 12,
    name: "Gentlemens",
    size: 2,
    cups: [
        { row: 0, column: 3, active: true },
        { row: 2, column: 3, active: true}
    ]
}

export const SINGLECUP = {
    value: 13,
    name: "Single Cup",
    size: 1,
    cups: [
        { row: 0, column: 3, active: true }
    ]
}

export const FORMATIONS = [
    STANDARD,
    DESPERATION,
    THREETWOONE,
    THREETHREESTRAIGHT,
    LARGEPLAYBUTTON,
    THREETWOSTRAIGHT,
    DOGBONE,
    DIAMOND,
    TWOTWOSTRAIGHT,
    TINYTRIANGLE,
    BELLYBUTTON,
    STOPLIGHT,
    GENTLEMENS,
    SINGLECUP
];