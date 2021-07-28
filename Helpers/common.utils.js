
exports.multipleColumnSet = (object) => {
    if (typeof object !== 'object') {
        throw new Error('Invalid input');
    }

    const keys = Object.keys(object);
    const values = Object.values(object);

    let columnSet = keys.map(key => `${key} = ?`).join(', ');
    let updateColumnSet = keys.map((key,i) => `${key} = '${values[i]}'`).join(', ');

    return {
        keys,
        columnSet,
        updateColumnSet,
        values
    }
}

