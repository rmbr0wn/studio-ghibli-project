import { objectType } from 'nexus';

export const HelloWorld = objectType({
  name: 'HelloWorld',
  definition(t) {
    t.string('message');
  },
});

export const Film = objectType({
  name: 'Film',
  definition(t) {
    t.string('title');
    t.string('description');
    t.string('director');
    t.string('release_date');
    t.string('running_time');
    t.string('rt_score');
    t.string('movie_banner');
    t.string('image');
  },
});
