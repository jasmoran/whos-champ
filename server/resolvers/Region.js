module.exports = {
    game: function (parent, args, ctx, info) {
        return ctx.Games.findOne({ id: parent.game }, ctx.exclude)
    },
    results: function (parent, args, ctx, info) {
        return ctx.Results.find({ regions: { $in: [parent.id] } }).project(ctx.exclude).toArray()
    }
}