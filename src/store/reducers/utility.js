export const updateObject = (oldState, updatedObject) => {
    return {
        ...oldState,
        ...updatedObject,
    };
};