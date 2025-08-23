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
    // Required fields from the task requirements
    t.nonNull.string('id');
    t.nonNull.string('title');
    t.nonNull.string('description');
    t.nonNull.string('director');
    t.nonNull.string('release_date');
    t.nonNull.string('running_time');
    t.nonNull.string('rt_score');
    t.nonNull.string('movie_banner');
    t.nonNull.string('image');
  },
});
