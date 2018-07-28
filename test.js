const parse = require('./');

const css = `
  /* Comments ain't no thang! */
  #id {
    width: 100%;
    color: rgb(0, 0,15);
  }
  
  #id {
    height: 100%;
  }
  #id .class {
    height: 100%;
    border: 1px solid #ff0000;
  }
  
  /* A comment before a child class */
  #id .class .child-class {
    margin-top: 24px;
  }
  
  /* A comment before a sub class */
  #id .class.sub-class {
    color: #ff0000;
  }
`;

test('parses css', () => {
  const actual = parse(css);
  const expected = 'foo1';
  expect(actual).toBe(expected);
});