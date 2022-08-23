describe('Primitive Values', () => {
  it('should test jest assertions', () => {
    const number = 0;
    expect(number).toBeFalsy();
  })
})

describe('Objects', () => {
  it('should test jest assertions with objects', () => {
    const person = { name: 'Jose', age: 21};
    const anotherPerson = { ...person };
    expect(person).toEqual(anotherPerson);
    expect(person).toHaveProperty('age');
    expect(person).toHaveProperty('age', 21);
    expect(person.name).toBe('Jose');
  })
})