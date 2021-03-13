const db = require('../models/models');
const {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLBoolean } = require('graphql');

const User = new GraphQLObjectType({
    name: 'User',
    fields: () => {
        return {
            id: {
                type: GraphQLString,
                resolve(user) {
                    return user.id;
                }
            },
            name: {
                type: GraphQLString,
                resolve(user) {
                    return user.name;
                }
            },
            age: {
                type: GraphQLInt,
                resolve(user) {
                    return user.age;
                }
            },
            email: {
                type: GraphQLString,
                resolve(user) {
                    return user.email;
                }
            }
        }
    },
});

const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'root query',
    fields: () => {
        return {
            users: {
                type: new GraphQLList(User),
                args: {
                    id: {
                        type: GraphQLString
                    },
                    name: {
                        type: GraphQLString
                    },
                    age: {
                        type: GraphQLInt
                    },
                    email: {
                        type: GraphQLString
                    }
                },
                resolve(root, args) {
                    return db.models.user.findAll({ where: args });
                }
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'mutation',
    fields: () => {
        return {
            addUser: {
                type: User,
                args: {
                    name: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    age: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    email: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                },
                resolve(_, args) {
                    return db.models.user.create({
                        name: args.name,
                        age: args.age,
                        email: args.email
                    });
                }
            },
            removeUser: {
                type: GraphQLBoolean,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(_, args) {
                    return db.models.user.destroy({
                        where: {
                            id: args.id
                        }
                    });
                }
            },
            modifyUser: {
                type: GraphQLBoolean,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    name: {
                        type: GraphQLString
                    },
                    age: {
                        type: GraphQLInt
                    },
                    email: {
                        type: GraphQLString
                    },
                },
                async resolve(_, args) {
                    let temp = await db.models.user.update(
                        args,
                        {
                            where: {
                                id: args.id
                            }
                    });
                    return temp[0] > 0;
                }
            }
        }
    }
});

const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});

module.exports = Schema