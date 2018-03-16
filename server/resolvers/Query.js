module.exports = {
    results: function (parent, args, ctx, info) {
        return ctx.Results.find().project(ctx.exclude).toArray()
    },
    result: function (parent, args, ctx, info) {
        return ctx.Results.findOne({ id: args.id }, ctx.exclude)
    },
    regions: function (parent, args, ctx, info) {
        return ctx.Regions.find().project(ctx.exclude).toArray()
    },
    region: function (parent, args, ctx, info) {
        return ctx.Regions.findOne({ id: args.id }, ctx.exclude)
    },
    players: function (parent, args, ctx, info) {
        return ctx.Players.find().project(ctx.exclude).toArray()
    },
    player: function (parent, args, ctx, info) {
        return ctx.Players.findOne({ id: args.id }, ctx.exclude)
    },
    games: function (parent, args, ctx, info) {
        return ctx.Games.find().project(ctx.exclude).toArray()
    },
    game: function (parent, args, ctx, info) {
        return ctx.Games.findOne({ id: args.id }, ctx.exclude)
    },
}