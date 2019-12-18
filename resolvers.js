import Memento from './models/memento';
import User from './models/user'

export const resolvers = {
    Query: {
        async allMemento() {
            return await Memento.find();
        },
        async getMemento(root, {_id}) {
            return await Memento.findById(_id)
        },

        async getUser(root, {_id}) {
            return await User.findById(_id)
        }
    },
    Mutation: {
        async createUser(root, {input}) {
            return await User.create(input);
        },
        async createMemento(root, {input}) {
            return await Memento.create(input);
        },

        async editMood(root, {_id,mood}) {
            var memento =  await Memento.findById(_id);

            memento.mood = mood;
            return await memento.save();
        },

        async editName(root, {id, name}) {
            var user = await User.findById(id)
            user.name = name;

            return await user.save();
        }
    }
}