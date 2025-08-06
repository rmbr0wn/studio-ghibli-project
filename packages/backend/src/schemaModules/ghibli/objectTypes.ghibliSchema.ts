import { objectType } from 'nexus';

export const HelloWorld = objectType({
  name: 'HelloWorld',
  definition(t) {
    t.string('message');
  },
});
