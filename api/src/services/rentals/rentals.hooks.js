const { authenticate } = require("@feathersjs/authentication").hooks;

const populate = require("feathers-populate-hook");
const isOwner = require("../../hooks/isOwner");

const linkUserToItem = require("../../hooks/link-user-to-item");

const getRatingAndReviewCount = require("../../hooks/get-rating-and-review-count");


module.exports = {
  before: {
    all: [populate.compatibility()],
    find: [],
    get: [],
    create: [authenticate("jwt"), linkUserToItem()],
    update: [authenticate("jwt"), isOwner(), linkUserToItem()],
    patch: [authenticate("jwt"), isOwner(), linkUserToItem()],
    remove: [authenticate("jwt")],
  },

  after: {
    all: [
      populate({
        user: {
          service: "users",
          f_key: "_id",
          one: true,
          query: {
            $select: ["_id", "firstName", "lastName", "email"],
          },
        },
      }),
    ],
    find: [getRatingAndReviewCount()],
    get: [getRatingAndReviewCount()],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
